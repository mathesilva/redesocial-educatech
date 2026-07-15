import { apiRequest, buildQueryString } from "./client";
import type {
  CreateMissionAnswerRequest,
  CreateMissionRequest,
  MissionDto,
  PaginatedResponse,
} from "../types/api";

export const missionsApi = {
  list: () =>
    apiRequest<PaginatedResponse<MissionDto>>(
      `/api/missoes${buildQueryString({ pagina: 1, limite: 100 })}`,
    ),
  create: (body: CreateMissionRequest) =>
    apiRequest<MissionDto>("/api/missoes", {
      method: "POST",
      body,
    }),
  answer: (missionId: string, body: CreateMissionAnswerRequest) =>
    apiRequest(`/api/missoes/${missionId}/respostas`, {
      method: "POST",
      body,
    }),
};
