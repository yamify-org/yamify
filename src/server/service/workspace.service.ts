import { workspaceRepository } from '../repository/workspace.repository';
import { kube } from '../module/kube.module';
export const workspaceService = {
  list: (userId: string) => workspaceRepository.listByUser(userId),
  create: async ({ name, ownerId }: { name: string; ownerId: string }) => {
    const ws = await workspaceRepository.create({ name, ownerId });
    await kube.createNamespace(ws.id);
    return ws;
  },
  remove: async (id: string) => {
    await kube.deleteVCluster(id, id);
    await kube.deleteNamespace(id);
    return workspaceRepository.delete(id);
  },
};