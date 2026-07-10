import type { DificuldadeMissao, PerfilUsuario } from "@prisma/client";
import { z } from "zod";

import { buscarMissaoPorIdSchema, criarMissaoSchema, listarMissoesSchema } from "./schemas.js";

export type CriarMissaoDto = z.infer<typeof criarMissaoSchema>;
export type ListarMissoesDto = z.infer<typeof listarMissoesSchema>;
export type BuscarMissaoPorIdDto = z.infer<typeof buscarMissaoPorIdSchema>;

export interface UsuarioMissaoDto {
  id: string;
  nomeCompleto: string;
  email: string;
  perfil: PerfilUsuario;
}

export interface CriarMissaoRepositoryDto {
  titulo: string;
  descricao: string;
  criteriosAvaliacao?: string | null;
  prazo: Date;
  pontuacao: number;
  dificuldade: DificuldadeMissao;
  professorId: string;
  disciplinaId: string;
}

export interface ProfessorMissaoRespostaDto {
  id: string;
  nomeCompleto: string;
  perfil: PerfilUsuario;
}

export interface DisciplinaMissaoRespostaDto {
  id: string;
  nome: string;
}

export interface MissaoRespostaDto {
  id: string;
  titulo: string;
  descricao: string;
  criteriosAvaliacao: string | null;
  prazo: Date;
  pontuacao: number;
  dificuldade: DificuldadeMissao;
  professor: ProfessorMissaoRespostaDto;
  disciplina: DisciplinaMissaoRespostaDto;
  dataCriacao: Date;
}

export interface PaginacaoDto {
  pagina: number;
  limite: number;
  total: number;
  totalPaginas: number;
}

export interface ListarMissoesRespostaDto {
  itens: MissaoRespostaDto[];
  paginacao: PaginacaoDto;
}

export type MissionsDto = CriarMissaoDto;
