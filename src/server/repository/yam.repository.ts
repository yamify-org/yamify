import prisma from "@/libs/prsima";

export const yamRepository = {
  listByWorkspace: (workspaceId: string) =>
    prisma.yam.findMany({ where: { workspaceId } }),
  create: (data: { name: string; workspaceId: string; namespace: string; kubeconfig: string }) =>
    prisma.yam.create({ data }),
  delete: (id: string) => prisma.yam.delete({ where: { id } }),
};