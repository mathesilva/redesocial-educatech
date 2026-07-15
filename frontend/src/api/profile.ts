import { apiRequest } from "./client";
import type { ProfileResponseDto } from "../types/api";

export const profileApi = {
  get: () => apiRequest<ProfileResponseDto>("/api/perfil"),
};
