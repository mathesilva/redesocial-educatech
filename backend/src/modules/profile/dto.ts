import type { StatusPublicacao } from "@prisma/client";

export interface UsuarioPerfilDto {
  id: string;
  nomeCompleto: string;
  email: string;
  fotoPerfil: string | null;
  escola: string;
  turma: string | null;
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

export interface UsuarioAutenticadoPerfilDto {
  id: string;
}

export type ProfileDto = PerfilRespostaDto;
