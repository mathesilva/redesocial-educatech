export interface UsuarioDashboardDto {
  id: string;
}

export interface IndicadoresProfessorDto {
  totalAlunos: number;
  totalPublicacoes: number;
  totalMissoes: number;
  missoesAtivas: number;
  publicacoesPendentes: number;
}

export interface RankingProfessorDto {
  posicao: number;
  nomeCompleto: string;
  pontuacao: number;
  nivel: number;
}

export interface MissaoProfessorDashboardDto {
  id: string;
  titulo: string;
  prazo: Date;
  respostasRecebidas: number;
  respostasAvaliadas: number;
  respostasPendentes: number;
}

export interface DashboardProfessorDto {
  indicadores: IndicadoresProfessorDto;
  ranking: RankingProfessorDto[];
  missoes: MissaoProfessorDashboardDto[];
}

export type DashboardDto = DashboardProfessorDto;
