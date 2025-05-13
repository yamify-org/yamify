import { workspaceRepository } from "@/server/repository/workspace.repository";
import { workspaceService } from "@/server/service/workspace.service";

export const workspaceModule = {
  repository: workspaceRepository,
  service: workspaceService
};