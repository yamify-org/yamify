import type { Workspace } from "@prisma/client"

export type SelectWorkspace = Pick<Workspace, 'id' | 'name' >;