import prisma from "@/libs/prisma";

export const projectRepository = {
  listByWorkspace: (workspaceId: string) =>
    prisma.project.findMany({ 
      where: { workspaceId },
      include: {
        yam: {
          select: {
            name: true,
            namespace: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),

  listByYam: (yamId: string) =>
    prisma.project.findMany({ 
      where: { yamId },
      orderBy: { createdAt: 'desc' }
    }),

  create: (data: {
    name: string;
    type: string;
    namespace: string;
    chart?: string;
    valuesYaml?: string;
    workspaceId: string;
    yamId: string;
    url?: string;
    username?: string;
    password?: string;
    status?: string;
  }) =>
    prisma.project.create({ 
      data: {
        ...data,
        status: data.status || 'pending'
      },
      include: {
        yam: {
          select: {
            name: true,
            namespace: true,
            kubeConfig: true
          }
        }
      }
    }),
  update: (id: string, data: Partial<{
    name: string;
    type: string;
    namespace: string;
    chart: string;
    valuesYaml: string;
    url: string;
    username: string;
    password: string;
    status: string;
  }>) =>
    prisma.project.update({ 
      where: { id }, 
      data,
      include: {
        yam: {
          select: {
            name: true,
            namespace: true
          }
        }
      }
    }),

  delete: (id: string) =>
    prisma.project.delete({ where: { id } }),

  findById: (id: string) =>
    prisma.project.findUnique({ 
      where: { id },
      include: {
        yam: {
          select: {
            name: true,
            namespace: true,
            kubeConfig: true
          }
        }
      }
    }),

  findByName: (name: string, yamId: string) =>
    prisma.project.findUnique({
      where: {
        name_yamId: {
          name,
          yamId
        }
      }
    }),

  // Get all projects with a specific status
  listByStatus: (status: string) =>
    prisma.project.findMany({
      where: { status },
      include: {
        yam: {
          select: {
            name: true,
            namespace: true,
            kubeConfig: true
          }
        }
      }
    }),

  // Get projects by type (e.g., all WordPress instances)
  listByType: (type: string, workspaceId?: string) =>
    prisma.project.findMany({
      where: {
        type,
        ...(workspaceId && { workspaceId })
      },
      include: {
        yam: {
          select: {
            name: true,
            namespace: true
          }
        }
      }
    }),

  // Update only status (useful for deployment tracking)
  updateStatus: (id: string, status: string) =>
    prisma.project.update({
      where: { id },
      data: { status }
    }),

  // Update deployment info (URL, credentials)
  updateDeploymentInfo: (id: string, data: {
    url?: string;
    username?: string;
    password?: string;
  }) =>
    prisma.project.update({
      where: { id },
      data
    }),

  // Get project count by workspace
  countByWorkspace: (workspaceId: string) =>
    prisma.project.count({
      where: { workspaceId }
    }),

  // Get project count by yam
  countByYam: (yamId: string) =>
    prisma.project.count({
      where: { yamId }
    }),

  // Get projects with their yam details (useful for management operations)
  listWithYamDetails: (workspaceId: string) =>
    prisma.project.findMany({
      where: { workspaceId },
      include: {
        yam: true
      },
      orderBy: { createdAt: 'desc' }
    }),

  // Bulk update status (useful for maintenance operations)
  bulkUpdateStatus: (projectIds: string[], status: string) =>
    prisma.project.updateMany({
      where: {
        id: {
          in: projectIds
        }
      },
      data: { status }
    }),

  // Get failed deployments for retry
  listFailedDeployments: (workspaceId?: string) =>
    prisma.project.findMany({
      where: {
        status: 'failed',
        ...(workspaceId && { workspaceId })
      },
      include: {
        yam: {
          select: {
            name: true,
            namespace: true,
            kubeConfig: true
          }
        }
      }
    }),
};

