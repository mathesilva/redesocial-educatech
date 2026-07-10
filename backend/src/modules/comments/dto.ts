import type { PerfilUsuario } from "@prisma/client";
import { z } from "zod";

import { criarComentarioSchema, publicacaoComentariosParamsSchema } from "./schemas.js";

export type CriarComentarioDto = z.infer<typeof criarComentarioSchema>;
export type PublicacaoComentariosParamsDto = z.infer<typeof publicacaoComentariosParamsSchema>;

export interface UsuarioComentarioDto {
  id: string;
  nomeCompleto: string;
  email: string;
  perfil: PerfilUsuario;
}

export interface CriarComentarioRepositoryDto {
  conteudo: string;
  usuarioId: string;
  publicacaoId: string;
}

export interface AutorComentarioRespostaDto {
  id: string;
  nomeCompleto: string;
  perfil: PerfilUsuario;
}

export interface ComentarioRespostaDto {
  id: string;
  conteudo: string;
  autor: AutorComentarioRespostaDto;
  dataCriacao: Date;
}

export type CommentsDto = CriarComentarioDto;
