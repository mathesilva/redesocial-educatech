import type { PerfilUsuario } from "@prisma/client";
import { z } from "zod";

import { publicacaoReacoesParamsSchema } from "./schemas.js";

export type PublicacaoReacoesParamsDto = z.infer<typeof publicacaoReacoesParamsSchema>;

export interface UsuarioReacaoDto {
  id: string;
  nomeCompleto: string;
  email: string;
  perfil: PerfilUsuario;
}

export interface ToggleReacaoRespostaDto {
  quantidadeCurtidas: number;
  usuarioCurtiu: boolean;
}

export type ReactionsDto = PublicacaoReacoesParamsDto;
