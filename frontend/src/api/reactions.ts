import { apiRequest } from "./client";
import type { ReactionSummaryDto } from "../types/api";

export const reactionsApi = {
  summary: (postId: string) =>
    apiRequest<ReactionSummaryDto>(`/api/publicacoes/${postId}/reacoes`),
  toggle: (postId: string) =>
    apiRequest<ReactionSummaryDto>(`/api/publicacoes/${postId}/reacoes`, {
      method: "POST",
    }),
};
