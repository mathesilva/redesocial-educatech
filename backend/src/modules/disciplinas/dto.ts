import { z } from "zod";

import {
  buscarDisciplinaPorIdSchema,
  cadastrarDisciplinaSchema,
  listarDisciplinasSchema,
} from "./schemas.js";

export type CadastrarDisciplinaDto = z.infer<typeof cadastrarDisciplinaSchema>;
export type ListarDisciplinasDto = z.infer<typeof listarDisciplinasSchema>;
export type BuscarDisciplinaPorIdDto = z.infer<typeof buscarDisciplinaPorIdSchema>;

export interface CriarDisciplinaDto {
  nome: string;
  descricao?: string | null;
}

export interface DisciplinaRespostaDto {
  id: string;
  nome: string;
  descricao: string | null;
}

export interface PaginacaoDto {
  pagina: number;
  limite: number;
  total: number;
  totalPaginas: number;
}

export interface ListarDisciplinasRespostaDto {
  itens: DisciplinaRespostaDto[];
  paginacao: PaginacaoDto;
}

export type DisciplinasDto = CadastrarDisciplinaDto;
