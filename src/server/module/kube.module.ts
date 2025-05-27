import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { execa } from 'execa';
import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
// kc.loadFromFile(process.env.KUBECONFIG_PATH || '');
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const networkingV1Api = kc.makeApiClient(k8s.NetworkingV1Api);

export const kube = {
  createNamespace: async (name: string) => {
    const namespace = await k8sApi.createNamespace({ body: { metadata: { name } } });
    // create an ingress for the namespace

    return {
      namespace,
    };
  },  

  createNamespaceIngress: async (name: string) => {
    const response = await networkingV1Api.createNamespacedIngress({
      namespace: name,
      body: {
        metadata: {
          name: 'ingress',
          annotations: {
            'kubernetes.io/ingress.class': 'nginx',
            'nginx.ingress.kubernetes.io/backend-protocol': 'HTTPS',
            'nginx.ingress.kubernetes.io/ssl-passthrough': 'true',
            'nginx.ingress.kubernetes.io/ssl-redirect': 'true',
            'external-dns.alpha.kubernetes.io/hostname': `${name}.aiscaler.ai`,
            'cert-manager.io/cluster-issuer': 'letsencrypt-prod',
          },
        },
        spec: {
          ingressClassName: 'nginx',
          tls: [
            {
              hosts: [`${name}.aiscaler.ai`],
              secretName: `${name}-tls-cert`,
            },
          ],
          rules: [
            {
              host: `${name}.aiscaler.ai`,  // team-a.aiscaler.ai
              http: {
                paths: [
                  {
                    path: '/',
                    pathType: 'ImplementationSpecific',
                    backend: {
                      service: {
                        name: name,
                        port: {
                          number: 443,
                        },
                      },
                    },
                  },
                ],
              }
            }
          ]
        }
      }
    });

    console.log({response})
  },
  deleteNamespace: async (name: string) => {
    await k8sApi.deleteNamespace({name});
  },
  createVCluster: async (name: string, namespace: string) => {
    const values = 
    `
controlPlane:
  ingress:
    enabled: false
  proxy:
    extraSANs:
      - ${name}.aiscaler.ai
sync:
  toHost:
    ingresses:
      enabled: true
  fromHost:
    ingressClasses:
      enabled: true
`;

    const tmpValuesPath = join(tmpdir(), `vcluster-values-${name}.yaml`);

    await fs.writeFile(tmpValuesPath, values);

    try {
      // Create the vCluster
      await execa('vcluster', [
        'create',
        name,
        '-n',
        namespace,
        '--connect=false',
        '-f',
        tmpValuesPath,
      ]);
    } finally {
      await fs.unlink(tmpValuesPath);
    }
  },
  retrieveKubeconfig: async (clusterName: string, namespace: string): Promise<string> => {
    const { stdout } = await execa('vcluster', [
      'connect',
      clusterName,
      '-n',
      namespace,
      '--print',
      `--server=https://${clusterName}.aiscaler.ai`,
    ]);

    return stdout;
  },
  deleteVCluster: async (name: string, namespace: string) => {
    await execa('vcluster', ['delete', name, '-n', namespace]);
  },
  waitForVCluster: async (kubeconfigPath: string, maxRetries = 10, delayMs = 5000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await execa('kubectl', ['--kubeconfig', kubeconfigPath, 'get', 'ns']);
      console.log('✅ vCluster is ready');
      return;
    } catch (err) {
      if( err instanceof Error ) {
      console.error(`❌ vCluster not ready yet: ${err}`);
      }
      console.log(`⏳ Waiting for vCluster to be ready... (${attempt}/${maxRetries})`);
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }

  throw new Error('❌ Timed out waiting for vCluster to become ready.');
},
  deployCodeServer: async (
  vclusterKubeconfig: string,
  appName: string, // This should be unique across all apps
  namespace: string
): Promise<string> => {
  const host = `${appName}.aiscaler.ai`;

  const kubeconfigPath = join(tmpdir(), `kubeconfig-${appName}.yaml`);
  const valuesPath = join(tmpdir(), `values-${appName}.yaml`);
  await fs.writeFile(kubeconfigPath, vclusterKubeconfig);

  const values = `
image:
  repository: ghcr.io/linuxserver/code-server
  pullPolicy: IfNotPresent
  tag: "latest"

secret:
  PASSWORD: "changeme"

env:
  TZ: "UTC"
  PUID: "1000"
  PGID: "1000"

service:
  port:
    port: 8443

ingress:
  enabled: true
  ingressClassName: "nginx"
  annotations:
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
    kubernetes.io/ingress.class: nginx
    external-dns.alpha.kubernetes.io/hostname: ${host}
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
  hosts:
    - host: "${host}"
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: ${appName}-tls-cert
      hosts:
        - ${host}

persistence:
  config:
    enabled: true
    emptyDir: false
    mountPath: /config
    accessMode: ReadWriteOnce
    size: 10Gi
`;

  await fs.writeFile(valuesPath, values);

  try {
    // Wait until vCluster API is reachable
    await kube.waitForVCluster(kubeconfigPath);

    // Create namespace inside vCluster (if needed)
    await execa('kubectl', [
      '--kubeconfig', kubeconfigPath,
      'create', 'namespace', namespace,
    ]).catch((err) => {
      if (!err.stderr?.includes('AlreadyExists')) throw err;
    });

    // Install code-server via Helm inside the vCluster
    await execa('helm', [
      'install',
      'codeserver',
      'nicholaswilde/code-server',
      '--namespace', namespace,
      '-f', valuesPath,
      '--kubeconfig', kubeconfigPath,
      '--debug',
    ]);

    // Wait for pod to be ready (timeout in 120s)
    await execa('kubectl', [
      '--kubeconfig', kubeconfigPath,
      'wait',
      '--namespace', namespace,
      '--for=condition=Ready',
      'pod',
      '-l=app.kubernetes.io/name=code-server',
      '--timeout=120s',
    ]);
  } finally {
    await fs.unlink(kubeconfigPath);
    await fs.unlink(valuesPath);
  }

  return `https://${host}`;
},

  // Modified to work with app deployments inside vClusters
  deployWordpress: async (
    vclusterKubeconfig: string,
    appName: string, // This should be unique across all apps
    namespace: string
  ): Promise<{url: string, user: string, password: string}> => {
    const host = `${appName}.aiscaler.ai`;

    const kubeconfigPath = join(tmpdir(), `kubeconfig-${appName}.yaml`);
    const valuesPath = join(tmpdir(), `values-${appName}.yaml`);
    await fs.writeFile(kubeconfigPath, vclusterKubeconfig);

    const values = `
wordpressUsername: user
wordpressPassword: "password"

ingress:
  enabled: true
  pathType: ImplementationSpecific
  ingressClassName: nginx
  hostname: ${host}
  path: /
  annotations:
    external-dns.alpha.kubernetes.io/hostname: ${host}
    cert-manager.io/cluster-issuer: letsencrypt-prod
  tls: true
  extraTls:
    - hosts:
        - ${host}
      secretName: ${appName}-tls-cert
`;

    await fs.writeFile(valuesPath, values);

    try {
      // Wait until vCluster API is reachable
      await kube.waitForVCluster(kubeconfigPath);

      // Create namespace inside vCluster
      await execa('kubectl', [
        '--kubeconfig', kubeconfigPath,
        'create', 'namespace', namespace,
      ]).catch((err) => {
        if (!err.stderr?.includes('AlreadyExists')) throw err;
      });

      // Install WordPress inside the vCluster
      await execa('helm', [
        'install',
        'wordpress',
        'oci://registry-1.docker.io/bitnamicharts/wordpress',
        '--namespace', namespace,
        '-f', valuesPath,
        '--kubeconfig', kubeconfigPath,
        '--debug',
      ]);

      // Wait for pod to be ready
      await execa('kubectl', [
        '--kubeconfig', kubeconfigPath,
        'wait',
        '--namespace', namespace,
        '--for=condition=Ready',
        'pod',
        '-l=app.kubernetes.io/name=wordpress',
        '--timeout=120s',
      ]);

    } finally {
      await fs.unlink(kubeconfigPath);
      await fs.unlink(valuesPath);
    }

    return {
      url: `https://${host}`,
      user: 'user',
      password: 'password',
    };
  },
};