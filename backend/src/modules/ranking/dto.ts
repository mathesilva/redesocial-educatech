import { z } from "zod";

import { listarRankingSchema } from "./schemas.js";

export type ListarRankingDto = z.infer<typeof listarRankingSchema>;

export interface AlunoRankingDto {
  id: string;
  nomeCompleto: string;
  email: string;
}

export interface ItemRankingDto {
  posicao: number;
  aluno: AlunoRankingDto;
  pontuacao: number;
  nivel: number;
}

export type RankingDto = ListarRankingDto;
