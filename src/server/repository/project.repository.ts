import prisma from "@/libs/prisma";

export const projectRepository = {
  listByWorkspace: (workspaceId: string) =>
    prisma.project.findMany({ where: { workspaceId } }),

  listByYam: (yamId: string) =>
    prisma.project.findMany({ where: { yamId } }),

  create: (data: {
    name: string;
    type: string;
    namespace: string;
    chart: string;
    valuesYaml: string;
    workspaceId: string;
    yamId: string;
  }) =>
    prisma.project.create({ data }),

  delete: (id: string) =>
    prisma.project.delete({ where: { id } }),
};
