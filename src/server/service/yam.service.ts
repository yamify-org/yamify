import { yamRepository } from '../repository/yam.repository';
import { kube } from '../module/kube.module';

export const yamService = {
  list: (workspaceId: string) => yamRepository.listByWorkspace(workspaceId),

  createAndStoreVCluster: async (clusterName: string, namespace: string, workspaceId: string) => {
    await kube.createVCluster(clusterName, namespace);
    const kubeconfig = await kube.retrieveKubeconfig(clusterName, namespace);

    await yamRepository.create({
        name: clusterName,
        namespace,
        kubeconfig,
        workspaceId,
    });
  },

  remove: async ({ id, name, workspaceId }: { id: string; name: string; workspaceId: string }) => {
    await kube.deleteVCluster(name, workspaceId);
    return yamRepository.delete(id);
  },
};