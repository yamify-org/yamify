import { execa } from 'execa';
import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromFile(process.env.KUBECONFIG_PATH || '');
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const networkingV1Api = kc.makeApiClient(k8s.NetworkingV1Api);

export const kube = {
  createNamespace: async (name: string) => {
    await k8sApi.createNamespace({ body: { metadata: { name } } });
    // create an ingress for the namespace
    await networkingV1Api.createNamespacedIngress({
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
  },  
  deleteNamespace: async (name: string) => {
    await k8sApi.deleteNamespace({name});
  },
  createVCluster: async (name: string, namespace: string) => {
    const values = `controlPlane:
  proxy:
    extraSANs:
    - ${name}.aiscaler.ai`;
    await execa('vcluster', ['create', name, '-n', namespace, '--connect=false', '-f', '-'], { input: values });
  },
  deleteVCluster: async (name: string, namespace: string) => {
    await execa('vcluster', ['delete', name, '-n', namespace]);
  },
  deployCodeServer: async (name: string, namespace: string) => {
    const { stdout } = await execa('vcluster', ['connect', name, '-n', namespace, '--print', `--server=https://${name}.aiscaler.ai`]);
    await execa('helm', ['repo', 'add', 'coder', 'https://helm.coder.com']);
    await execa('helm', ['repo', 'update']);
    await execa('helm', [
      'install', name, 'coder/code-server',
      '--kubeconfig', '/tmp/kubeconfig',
      '--namespace', 'default',
      '--set', 'service.type=ClusterIP'
    ]);
  }
};