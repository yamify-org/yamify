import type { Workspace, Yam } from "@prisma/client"

export type SelectWorkspace = Pick<Workspace, 'id' | 'name' >;

export type SelectYam = Pick<Yam, 'id' | 'name' | 'domain' | 'createdAt' | 'namespace' | 'workspaceId' | 'kubeConfig'>;