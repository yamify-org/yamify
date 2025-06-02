import { yamRepository } from "@/server/repository/yam.repository";
import { yamService } from "@/server/service/yam.service";

export const yamModule = {
  repository: yamRepository,
  service: yamService
};