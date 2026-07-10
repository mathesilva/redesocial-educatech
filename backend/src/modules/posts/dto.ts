import type { PerfilUsuario, StatusPublicacao } from "@prisma/client";
import { z } from "zod";

import {
  buscarPublicacaoPorIdSchema,
  criarPublicacaoSchema,
  listarPublicacoesSchema,
} from "./schemas.js";

export type CriarPublicacaoDto = z.infer<typeof criarPublicacaoSchema>;
export type ListarPublicacoesDto = z.infer<typeof listarPublicacoesSchema>;
export type BuscarPublicacaoPorIdDto = z.infer<typeof buscarPublicacaoPorIdSchema>;

export interface UsuarioPublicacaoDto {
  id: string;
  nomeCompleto: string;
  email: string;
  perfil: PerfilUsuario;
}

export interface CriarPublicacaoRepositoryDto {
  titulo: string;
  descricao: string;
  imagemUrl?: string | null;
  status: StatusPublicacao;
  usuarioId: string;
  disciplinaId: string;
}

export interface AutorPublicacaoRespostaDto {
  id: string;
  nomeCompleto: string;
  perfil: PerfilUsuario;
}

export interface DisciplinaPublicacaoRespostaDto {
  id: string;
  nome: string;
}

export interface PublicacaoRespostaDto {
  id: string;
  titulo: string;
  descricao: string;
  imagemUrl: string | null;
  status: StatusPublicacao;
  autor: AutorPublicacaoRespostaDto;
  disciplina: DisciplinaPublicacaoRespostaDto;
  dataCriacao: Date;
}

export interface PaginacaoDto {
  pagina: number;
  limite: number;
  total: number;
  totalPaginas: number;
}

export interface ListarPublicacoesRespostaDto {
  itens: PublicacaoRespostaDto[];
  paginacao: PaginacaoDto;
}

export type PostsDto = CriarPublicacaoDto;
