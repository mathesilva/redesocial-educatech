export type ApiRole = "ALUNO" | "PROFESSOR";
export type ApiPostStatus = "PENDENTE" | "APROVADA" | "REPROVADA";
export type ApiMissionDifficulty = "FACIL" | "MEDIA" | "DIFICIL";
export type ApiNotificationType =
  | "CURTIDA"
  | "COMENTARIO"
  | "MISSAO"
  | "PUBLICACAO_APROVADA"
  | "PUBLICACAO_REPROVADA"
  | "AVALIACAO";

export interface ApiSuccess<T> {
  sucesso: true;
  mensagem: string;
  dados: T;
}

export interface ApiErrorResponse {
  sucesso: false;
  mensagem: string;
  erros?: unknown[];
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface AuthUserDto {
  id: string;
  nomeCompleto: string;
  email: string;
  perfil: ApiRole;
}

export interface LoginResponseDto {
  accessToken: string;
  usuario: AuthUserDto;
}

export interface RegisterUserRequest {
  nomeCompleto: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  perfil: ApiRole;
  escola: string;
  turma?: string | null;
  disciplinaId?: string | null;
}

export interface UserResponseDto extends AuthUserDto {
  fotoPerfil: string | null;
  escola: string;
  turma: string | null;
  disciplinaId: string | null;
  pontuacao: number;
  nivel: number;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface ProfileResponseDto {
  usuario: {
    id: string;
    nomeCompleto: string;
    email: string;
    fotoPerfil: string | null;
    escola: string;
    turma: string | null;
  };
  gamificacao: {
    pontuacao: number;
    nivel: number;
    posicaoRankingGeral: number;
  };
  estatisticas: {
    quantidadePublicacoes: number;
    quantidadeComentarios: number;
    quantidadeCurtidasRecebidas: number;
    quantidadeMissoesRespondidas: number;
    quantidadeMissoesAvaliadas: number;
    mediaNotas: number | null;
  };
  publicacoes: Array<{
    id: string;
    titulo: string;
    descricao: string;
    imagemUrl: string | null;
    status: ApiPostStatus;
    quantidadeComentarios: number;
    quantidadeCurtidas: number;
    dataCriacao: string;
  }>;
}

export interface PaginatedResponse<T> {
  itens: T[];
  paginacao: {
    pagina: number;
    limite: number;
    total: number;
    totalPaginas: number;
  };
}

export interface DisciplineDto {
  id: string;
  nome: string;
  descricao: string | null;
}

export interface CreatePostRequest {
  titulo: string;
  descricao: string;
  imagemUrl?: string;
  disciplinaId: string;
}

export interface PostDto {
  id: string;
  titulo: string;
  descricao: string;
  imagemUrl: string | null;
  status: ApiPostStatus;
  autor: {
    id: string;
    nomeCompleto: string;
    perfil: ApiRole;
  };
  disciplina: DisciplineDto;
  dataCriacao: string;
}

export interface CommentDto {
  id: string;
  conteudo: string;
  autor: {
    id: string;
    nomeCompleto: string;
    perfil: ApiRole;
  };
  dataCriacao: string;
}

export interface ReactionSummaryDto {
  quantidadeCurtidas: number;
  usuarioCurtiu: boolean;
}

export interface CreateMissionRequest {
  titulo: string;
  descricao: string;
  criteriosAvaliacao?: string;
  prazo: string;
  pontuacao: number;
  dificuldade: ApiMissionDifficulty;
  disciplinaId: string;
}

export interface MissionDto {
  id: string;
  titulo: string;
  descricao: string;
  criteriosAvaliacao: string | null;
  prazo: string;
  pontuacao: number;
  dificuldade: ApiMissionDifficulty;
  professor: {
    id: string;
    nomeCompleto: string;
    perfil: ApiRole;
  };
  disciplina: DisciplineDto;
  dataCriacao: string;
}

export interface CreateMissionAnswerRequest {
  resposta: string;
  imagemUrl?: string;
}

export interface NotificationDto {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: ApiNotificationType;
  lida: boolean;
  dataCriacao: string;
}
