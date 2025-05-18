import prisma from "@/libs/prsima";

export const deploymentRepository = {
  listByWorkspace: (workspaceId: string) =>
    prisma.deployment.findMany({ where: { workspaceId } }),

  listByYam: (yamId: string) =>
    prisma.deployment.findMany({ where: { yamId } }),

  create: (data: {
    name: string;
    type: string;
    namespace: string;
    chart: string;
    valuesYaml: string;
    workspaceId: string;
    yamId?: string;
  }) =>
    prisma.deployment.create({ data }),

  delete: (id: string) =>
    prisma.deployment.delete({ where: { id } }),
};
