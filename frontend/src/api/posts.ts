import { apiRequest, buildQueryString } from "./client";
import type { CreatePostRequest, PaginatedResponse, PostDto } from "../types/api";

export const postsApi = {
  list: () =>
    apiRequest<PaginatedResponse<PostDto>>(
      `/api/publicacoes${buildQueryString({ pagina: 1, limite: 100 })}`,
    ),
  getById: (id: string) => apiRequest<PostDto>(`/api/publicacoes/${id}`),
  create: (body: CreatePostRequest) =>
    apiRequest<PostDto>("/api/publicacoes", {
      method: "POST",
      body,
    }),
  remove: (id: string) =>
    apiRequest<null>(`/api/publicacoes/${id}`, {
      method: "DELETE",
    }),
};
