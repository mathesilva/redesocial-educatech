import type { PerfilUsuario } from "@prisma/client";
import { z } from "zod";

import { cadastrarUsuarioSchema } from "./schemas.js";

export type CadastrarUsuarioDto = z.infer<typeof cadastrarUsuarioSchema>;

export interface CriarUsuarioDto {
  nomeCompleto: string;
  email: string;
  senha: string;
  perfil: PerfilUsuario;
  escola: string;
  turma?: string | null;
  disciplinaId?: string | null;
}

export interface UsuarioRespostaDto {
  id: string;
  nomeCompleto: string;
  email: string;
  fotoPerfil: string | null;
  perfil: PerfilUsuario;
  escola: string;
  turma: string | null;
  disciplinaId: string | null;
  pontuacao: number;
  nivel: number;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export type UsersDto = CadastrarUsuarioDto;
