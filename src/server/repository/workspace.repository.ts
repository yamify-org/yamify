import prisma from "@/libs/prisma";

export const workspaceRepository = {
  listByUser: (userId: string) => prisma.workspace.findMany({ where: { user: { clerkId: userId } } }),
  create: (data: { name: string; userId: string }) => prisma.workspace.create({ 
    data: { 
      name: data.name,
      user: { connect: { clerkId: data.userId } }
    } 
  }),
  delete: (id: string) => prisma.workspace.delete({ where: { id } }),
};