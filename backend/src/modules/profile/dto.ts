import type { PerfilUsuario, StatusPublicacao } from "@prisma/client";
import type { z } from "zod";

import type { buscarPerfilPublicoParamsSchema } from "./schemas.js";

export type BuscarPerfilPublicoParamsDto = z.infer<typeof buscarPerfilPublicoParamsSchema>;

export interface UsuarioPerfilDto {
  id: string;
  nomeCompleto: string;
  email: string;
  fotoPerfil: string | null;
  escola: string;
  turma: string | null;
}

export interface DisciplinaPerfilPublicoDto {
  id: string;
  nome: string;
}

export interface UsuarioPerfilPublicoDto {
  id: string;
  nomeCompleto: string;
  fotoPerfil: string | null;
  perfil: PerfilUsuario;
  turma: string | null;
  disciplina: DisciplinaPerfilPublicoDto | null;
  dataCriacao: Date;
}

export interface GamificacaoPerfilDto {
  pontuacao: number;
  nivel: number;
  posicaoRankingGeral: number;
}

export interface EstatisticasPerfilDto {
  quantidadePublicacoes: number;
  quantidadeComentarios: number;
  quantidadeCurtidasRecebidas: number;
  quantidadeMissoesRespondidas: number;
  quantidadeMissoesAvaliadas: number;
  mediaNotas: number | null;
}

export interface PublicacaoPerfilDto {
  id: string;
  titulo: string;
  descricao: string;
  imagemUrl: string | null;
  status: StatusPublicacao;
  quantidadeComentarios: number;
  quantidadeCurtidas: number;
  dataCriacao: Date;
}

export interface PerfilRespostaDto {
  usuario: UsuarioPerfilDto;
  gamificacao: GamificacaoPerfilDto;
  estatisticas: EstatisticasPerfilDto;
  publicacoes: PublicacaoPerfilDto[];
}

export interface PerfilPublicoRespostaDto {
  usuario: UsuarioPerfilPublicoDto;
  gamificacao: GamificacaoPerfilDto;
  estatisticas: EstatisticasPerfilDto;
  publicacoes: PublicacaoPerfilDto[];
}

export interface UsuarioAutenticadoPerfilDto {
  id: string;
}

export type ProfileDto = PerfilRespostaDto;
