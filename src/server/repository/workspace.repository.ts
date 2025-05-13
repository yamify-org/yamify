import prisma from "@/libs/prsima";

export const workspaceRepository = {
  listByUser: (userId: string) => prisma.workspace.findMany({ where: { ownerId: userId } }),
  create: (data: { name: string; ownerId: string }) => prisma.workspace.create({ data }),
  delete: (id: string) => prisma.workspace.delete({ where: { id } }),
};