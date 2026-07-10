import type { PerfilUsuario } from "@prisma/client";
import { z } from "zod";

import { loginSchema } from "./schemas.js";

export type LoginDto = z.infer<typeof loginSchema>;

export interface AuthTokenPayloadDto {
  sub: string;
  perfil: PerfilUsuario;
}

export type AssinarAccessTokenDto = (
  payload: AuthTokenPayloadDto,
  opcoes: { expiresIn: string },
) => Promise<string>;

export interface UsuarioLoginRespostaDto {
  id: string;
  nomeCompleto: string;
  email: string;
  perfil: PerfilUsuario;
}

export interface LoginRespostaDto {
  accessToken: string;
  usuario: UsuarioLoginRespostaDto;
}

export type UsuarioAutenticadoDto = UsuarioLoginRespostaDto;

export type AuthDto = LoginDto;
