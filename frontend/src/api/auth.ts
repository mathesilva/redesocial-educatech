import { apiRequest } from "./client";
import type { AuthUserDto, LoginRequest, LoginResponseDto } from "../types/api";

export const authApi = {
  login: (body: LoginRequest) =>
    apiRequest<LoginResponseDto>("/api/autenticacao/login", {
      method: "POST",
      body,
      authenticated: false,
    }),
  me: () => apiRequest<AuthUserDto>("/api/autenticacao/me"),
};
