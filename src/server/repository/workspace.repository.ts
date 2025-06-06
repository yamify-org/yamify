import prisma from "@/libs/prisma";

export const workspaceRepository = {
  listByUser: (userId: string) => prisma.workspace.findMany({ where: { userId } }),
  create: (data: { name: string; userId: string }) => prisma.workspace.create({ data }),
  delete: (id: string) => prisma.workspace.delete({ where: { id } }),
};