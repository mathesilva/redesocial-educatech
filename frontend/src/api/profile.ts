import { apiRequest } from "./client";
import type { ProfileResponseDto, PublicProfileResponseDto } from "../types/api";

export const profileApi = {
  get: () => apiRequest<ProfileResponseDto>("/api/perfil"),
  getPublic: (id: string) => apiRequest<PublicProfileResponseDto>(`/api/perfil/${id}`),
};
