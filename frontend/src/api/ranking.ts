import { apiRequest } from "./client";
import type { RankingResponseDto } from "../types/api";

export const rankingApi = {
  list: () => apiRequest<RankingResponseDto[]>("/api/ranking"),
};
