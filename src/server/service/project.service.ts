import { projectRepository } from '../repository/project.repository';
import { kube } from '../module/kube.module';
import prisma from '@/libs/prisma';

export const projectService = {
  list: async (opts: { yamId: string }) => {
    return projectRepository.listByYam(opts.yamId);
  },

  // create: async (params: {
  //   name: string;
  //   type: string;
  //   namespace: string;
  //   chart?: string;
  //   valuesYaml?: string;
  //   workspaceId: string;
  //   yamId: string;
  // }) => {
  //   // Create project record with pending status
  //   const record = await projectRepository.create({
  //     ...params,
  //     status: 'pending'
  //   });

  //   try {
  //     // Get the parent Yam (vCluster) kubeconfig
  //     const yam = await prisma.yam.findUnique({ 
  //       where: { id: params.yamId } 
  //     });
      
  //     if (!yam || !yam.kubeConfig) {
  //       throw new Error('Parent vCluster kubeconfig not found');
  //     }

  //     // Update status to deploying
  //     await projectRepository.update(record.id, { status: 'deploying' });

  //     let deploymentResult;

  //     // Deploy the app inside the vCluster
  //     switch (params.type) {
  //       case 'wordpress':
  //         deploymentResult = await projectService.deployWordpressInVCluster(record, yam.kubeConfig, yam.namespace);
  //         break;
  //       case 'code-server':
  //         deploymentResult = await projectService.deployCodeServerInVCluster(record, yam.kubeConfig, yam.namespace);
  //         break;
  //       case 'n8n':
  //         deploymentResult = await projectService.deployN8nInVCluster(record, yam.kubeConfig, yam.namespace);
  //         break;
  //       default:
  //         throw new Error(`Unsupported app type: ${params.type}`);
  //     }

  //     // Update project with deployment results
  //     const updatedRecord = await projectRepository.update(record.id, {
  //       status: 'ready',
  //       ...deploymentResult
  //     });

  //     return updatedRecord;
  //   } catch (error) {
  //     await projectRepository.delete(record.id);
  //     throw error;
  //   }
  // },
  create: async (params: {
  name: string;
  type: string;
  namespace: string;
  chart?: string;
  valuesYaml?: string;
  workspaceId: string;
  yamId: string;
}) => {
  const record = await projectRepository.create({
    ...params,
    status: 'pending'
  });

  try {
    const yam = await prisma.yam.findUnique({
      where: { id: params.yamId }
    });

    if (!yam || !yam.kubeConfig) {
      throw new Error('Parent vCluster kubeconfig not found');
    }

    await projectRepository.update(record.id, { status: 'deploying' });

    let deploymentResult;

    try {
      switch (params.type) {
        case 'wordpress':
          deploymentResult = await projectService.deployWordpressInVCluster(
            record,
            yam.kubeConfig,
            yam.namespace
          );
          break;
        case 'code-server':
          deploymentResult = await projectService.deployCodeServerInVCluster(
            record,
            yam.kubeConfig,
            yam.namespace
          );
          break;
        case 'n8n':
          deploymentResult = await projectService.deployN8nInVCluster(
            record,
            yam.kubeConfig,
            yam.namespace
          );
          break;
        default:
          throw new Error(`Unsupported app type: ${params.type}`);
      }
    } catch (deploymentError) {
      console.error(
        `Deployment failed for project ${record.id} of type ${params.type}:`,
        deploymentError
      );
      // Optionally update status before deletion
      await projectRepository.update(record.id, { status: 'failed' });
      throw new Error(
        `Failed to deploy ${params.type}: ${deploymentError.message}`
      );
    }

    const updatedRecord = await projectRepository.update(record.id, {
      status: 'ready',
      ...deploymentResult
    });

    return updatedRecord;
  } catch (error) {
    console.error(`Project creation failed:`, error);

    try {
      await projectRepository.delete(record.id);
    } catch (cleanupError) {
      console.error(
        `Failed to delete project record ${record.id} during cleanup:`,
        cleanupError
      );
    }

    throw error;
  }
},

  deployWordpressInVCluster: async (project: { name: string; yamId: string; namespace: string }, vclusterKubeconfig: string, yamName: string) => {
    // Use the existing kube.deployWordpress but with the vCluster's kubeconfig
    console.log({ project, vclusterKubeconfig, yamName });
    const result = await kube.deployWordpress(
      vclusterKubeconfig,
      yamName, // Ensure unique subdomain
      project.namespace
    );

    return {
      url: result.url,
      username: result.user,
      password: result.password
    };
  },
  deployCodeServerInVCluster: async (project: { name: string; yamId: string; namespace: string }, vclusterKubeconfig: string, yamName: string) => {
    const url = await kube.deployCodeServer(
      vclusterKubeconfig,
      yamName, // Ensure unique subdomain
      project.namespace
    );

    return {
      url,
      username: 'user',
      password: 'changeme'
    };
  },
  deployN8nInVCluster: async (project: { name: string; yamId: string; namespace: string }, vclusterKubeconfig: string, yamName: string) => {
    const url = await kube.deployN8n(
      vclusterKubeconfig,
      yamName, // Ensure unique subdomain
      project.namespace
    );

    return {
      url: typeof url === 'string' ? url : url.url
    };
  },
  deployCustomHelmInVCluster: async (project: { id: string; name: string; namespace: string; chart: string; valuesYaml: string }, vclusterKubeconfig: string) => {
    if (!project.chart || !project.valuesYaml) {
      throw new Error('Chart and valuesYaml are required for custom Helm deployments');
    }

    const { promises: fs } = await import('fs');
    const { tmpdir } = await import('os');
    const { join } = await import('path');
    const { execa } = await import('execa');

    const kubeconfigPath = join(tmpdir(), `kubeconfig-${project.id}.yaml`);
    const valuesPath = join(tmpdir(), `values-${project.id}.yaml`);

    try {
      await fs.writeFile(kubeconfigPath, vclusterKubeconfig);
      await fs.writeFile(valuesPath, project.valuesYaml);

      // Create namespace in vCluster
      await execa('kubectl', [
        '--kubeconfig', kubeconfigPath,
        'create', 'namespace', project.namespace
      ]).catch((err) => {
        if (!err.stderr?.includes('AlreadyExists')) throw err;
      });

      // Add Helm repo if it's a repo URL
      if (project.chart.startsWith('http')) {
        await execa('helm', ['repo', 'add', project.name, project.chart]);
        await execa('helm', ['repo', 'update']);
      }

      // Install via Helm in the vCluster
      await execa('helm', [
        'install',
        project.name,
        project.chart,
        '--namespace', project.namespace,
        '--kubeconfig', kubeconfigPath,
        '-f', valuesPath
      ]);

      return {};
    } finally {
      await fs.unlink(kubeconfigPath).catch(() => {});
      await fs.unlink(valuesPath).catch(() => {});
    }
  },
  remove: async (opts: { id: string }) => {
    const project = await projectRepository.findById(opts.id);
    if (!project) {
      throw new Error('Project not found');
    }

    // Get the parent vCluster kubeconfig
    const yam = await prisma.yam.findUnique({ 
      where: { id: project.yamId } 
    });

    if (!yam?.kubeConfig) {
      console.warn('Parent vCluster kubeconfig not found, skipping cleanup');
      return projectRepository.delete(opts.id);
    }

    try {
      await projectService.cleanupAppInVCluster(project, yam.kubeConfig);
    } catch (error) {
      console.error('Error during app cleanup:', error);
      // Continue with database deletion even if cleanup fails
    }

    return projectRepository.delete(opts.id);
  },
  cleanupAppInVCluster: async (project: { id: string; name: string; type: string; namespace: string }, vclusterKubeconfig: string) => {
    const { promises: fs } = await import('fs');
    const { tmpdir } = await import('os');
    const { join } = await import('path');
    const { execa } = await import('execa');

    const kubeconfigPath = join(tmpdir(), `kubeconfig-${project.id}.yaml`);

    try {
      await fs.writeFile(kubeconfigPath, vclusterKubeconfig);

      // Determine the release name based on project type
      let releaseName = project.name;
      if (project.type === 'wordpress') {
        releaseName = 'wordpress';
      } else if (project.type === 'code-server') {
        releaseName = 'codeserver';
      }

      // Uninstall the Helm release from the vCluster
      await execa('helm', [
        'uninstall',
        releaseName,
        '--namespace', project.namespace,
        '--kubeconfig', kubeconfigPath
      ]);

    } finally {
      await fs.unlink(kubeconfigPath).catch(() => {});
    }
  },
  // Get app status by checking pods in vCluster
  getStatus: async (projectId: string) => {
    const project = await projectRepository.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const yam = await prisma.yam.findUnique({ 
      where: { id: project.yamId } 
    });

    if (!yam?.kubeConfig) {
      return { status: 'unknown' };
    }

    // Check pod status in the vCluster
    // Implementation would check kubectl get pods status
    return { status: project.status };
  }
};