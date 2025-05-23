import prisma from "@/libs/prisma";

export const yamRepository = {
  listByWorkspace: (workspaceId: string) =>
    prisma.yam.findMany({ where: { workspaceId } }),
  create: (data: { name: string; workspaceId: string; namespace: string; kubeConfig: string }) =>
    prisma.yam.create({ data }),
  addDomain: (id: string, domain: string) =>
    prisma.yam.update({
      where: { id },
      data: {
        domain,
      },
    }),     
  delete: (id: string) => prisma.yam.delete({ where: { id } }),
};