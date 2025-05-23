import { workspaceRepository } from '../repository/workspace.repository';
import { kube } from '../module/kube.module';
export const workspaceService = {
  list: (userId: string) => workspaceRepository.listByUser(userId),
  create: async ({ name, userId }: { name: string; userId: string }) => {
    try {
      console.log({name})
      const response = await kube.createNamespace(name);
      console.log({response})
    } catch (e) {
      console.log(e);
      throw new Error('Failed to create namespace');
    }

    console.log('Namespace created');
    const ws = await workspaceRepository.create({ name, userId });
    
    return ws;
  },
  remove: async (id: string) => {
    await kube.deleteNamespace(id);
    return workspaceRepository.delete(id);
  },
};