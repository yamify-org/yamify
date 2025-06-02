import { projectRepository } from "@/server/repository/project.repository";
import { projectService } from "@/server/service/project.service";

export const projectModule = {
  repository: projectRepository,
  service: projectService
};