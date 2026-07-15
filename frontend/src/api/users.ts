import { apiRequest } from "./client";
import type { RegisterUserRequest, UserResponseDto } from "../types/api";

export const usersApi = {
  register: (body: RegisterUserRequest) =>
    apiRequest<UserResponseDto>("/api/usuarios", {
      method: "POST",
      body,
      authenticated: false,
    }),
};
