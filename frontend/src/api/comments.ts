import { apiRequest } from "./client";
import type { CommentDto } from "../types/api";

export const commentsApi = {
  listByPost: (postId: string) =>
    apiRequest<CommentDto[]>(`/api/publicacoes/${postId}/comentarios`),
  create: (postId: string, conteudo: string) =>
    apiRequest<CommentDto>(`/api/publicacoes/${postId}/comentarios`, {
      method: "POST",
      body: { conteudo },
    }),
};
