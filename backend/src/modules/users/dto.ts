import type { PerfilUsuario } from "@prisma/client";
import { z } from "zod";

import { buscarUsuariosSchema, cadastrarUsuarioSchema } from "./schemas.js";

export type CadastrarUsuarioDto = z.infer<typeof cadastrarUsuarioSchema>;
export type BuscarUsuariosDto = z.infer<typeof buscarUsuariosSchema>;

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

export interface DisciplinaBuscaDto {
  id: string;
  nome: string;
}

export interface UsuarioBuscaDto {
  id: string;
  nomeCompleto: string;
  fotoPerfil: string | null;
  perfil: PerfilUsuario;
  turma: string | null;
  disciplina: DisciplinaBuscaDto | null;
  pontuacao: number;
  nivel: number;
}

export interface PaginacaoDto {
  pagina: number;
  limite: number;
  total: number;
  totalPaginas: number;
}

export interface BuscarUsuariosRespostaDto {
  itens: UsuarioBuscaDto[];
  paginacao: PaginacaoDto;
}

export type UsersDto = CadastrarUsuarioDto;
