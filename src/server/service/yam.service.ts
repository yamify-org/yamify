import { yamRepository } from '../repository/yam.repository';
import { kube } from '../module/kube.module';

export const yamService = {
  list: (workspaceId: string) => yamRepository.listByWorkspace(workspaceId),

  create: async ({ name, workspaceId }: { name: string; workspaceId: string }) => {
    // Build YAML spec
    const specYaml = `controlPlane:
  proxy:
    extraSANs:
    - ${name}.yourdomain.com`;
    // Persist spec
    const codeServerUrl = `https://${name}.yourdomain.com`;
    const created = await yamRepository.create({ name, workspaceId, codeServerUrl, specYaml });

    // Deploy
    await kube.createVCluster(name, workspaceId);
    await kube.deployCodeServer(name, workspaceId);
    return created;
  },

  remove: async ({ id, name, workspaceId }: { id: string; name: string; workspaceId: string }) => {
    await kube.deleteVCluster(name, workspaceId);
    return yamRepository.delete(id);
  },
};