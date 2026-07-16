import { apiRequest, buildQueryString } from "./client";
import type {
  PaginatedResponse,
  RegisterUserRequest,
  UserResponseDto,
  UserSearchResultDto,
} from "../types/api";

export const usersApi = {
  register: (body: RegisterUserRequest) =>
    apiRequest<UserResponseDto>("/api/usuarios", {
      method: "POST",
      body,
      authenticated: false,
    }),
  search: (termo: string, limite = 50) =>
    apiRequest<PaginatedResponse<UserSearchResultDto>>(
      `/api/usuarios${buildQueryString({ busca: termo, pagina: 1, limite })}`,
    ),
};
