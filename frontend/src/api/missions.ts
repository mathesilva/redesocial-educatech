import { apiRequest, buildQueryString } from "./client";
import type {
  CreateMissionAnswerRequest,
  CreateMissionRequest,
  EvaluateMissionAnswerRequest,
  MissionAnswerDto,
  MissionAnswerForTeacherDto,
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
    apiRequest<MissionAnswerDto>(`/api/missoes/${missionId}/respostas`, {
      method: "POST",
      body,
    }),
  myAnswer: (missionId: string) =>
    apiRequest<MissionAnswerDto>(`/api/missoes/${missionId}/respostas/minha`),
  listAnswers: (missionId: string) =>
    apiRequest<MissionAnswerForTeacherDto[]>(`/api/missoes/${missionId}/respostas`),
  evaluateAnswer: (
    missionId: string,
    answerId: string,
    body: EvaluateMissionAnswerRequest,
  ) =>
    apiRequest<MissionAnswerDto>(
      `/api/missoes/${missionId}/respostas/${answerId}/avaliacao`,
      {
        method: "PATCH",
        body,
      },
    ),
};
