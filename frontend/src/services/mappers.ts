import type {
  CommentDto,
  MissionDto,
  MyMissionDto,
  NotificationDto,
  PostDto,
  ProfileResponseDto,
  PublicProfileResponseDto,
  RankingResponseDto,
  UserSearchResultDto,
} from "../types/api";
import type {
  Mission,
  MyMission,
  NotificationItem,
  Post,
  PostComment,
  PublicProfile,
  PublicProfileSummary,
  RankingEntry,
  UserProfile,
  UserRole,
} from "../types";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

export const mapRole = (role: "ALUNO" | "PROFESSOR"): UserRole =>
  role === "PROFESSOR" ? "teacher" : "student";

export const mapApiRole = (role: UserRole) => (role === "teacher" ? "PROFESSOR" : "ALUNO");

export const mapProfileToUser = (
  profile: ProfileResponseDto,
  role: UserRole,
  fallbackEmail: string,
): UserProfile => ({
  id: profile.usuario.id,
  name: profile.usuario.nomeCompleto,
  email: profile.usuario.email || fallbackEmail,
  avatar: profile.usuario.fotoPerfil || DEFAULT_AVATAR,
  role,
  level: profile.gamificacao.nivel,
  xp: profile.gamificacao.pontuacao,
  xpNextLevel: Math.max((profile.gamificacao.nivel + 1) * 500, 500),
  points: profile.gamificacao.pontuacao,
  bio:
    role === "teacher"
      ? `Professor(a) da ${profile.usuario.escola}.`
      : `Estudante da ${profile.usuario.escola}.`,
  schoolClass:
    role === "teacher"
      ? "Professor(a)"
      : profile.usuario.turma || "Turma nao informada",
  badges: [],
  completedMissionsCount: profile.estatisticas.quantidadeMissoesAvaliadas,
});

export const mapComment = (comment: CommentDto): PostComment => ({
  id: comment.id,
  authorId: comment.autor.id,
  authorName: comment.autor.nomeCompleto,
  authorAvatar: DEFAULT_AVATAR,
  authorRole: mapRole(comment.autor.perfil),
  content: comment.conteudo,
  createdAt: comment.dataCriacao,
});

export const mapPost = (
  post: PostDto,
  comments: PostComment[] = [],
  likesCount = 0,
  likedByMe = false,
): Post => ({
  id: post.id,
  author: {
    id: post.autor.id,
    name: post.autor.nomeCompleto,
    avatar: DEFAULT_AVATAR,
    role: mapRole(post.autor.perfil),
    schoolClass: post.disciplina.nome,
  },
  title: post.titulo,
  content: post.descricao,
  subject: post.disciplina.nome,
  likesCount,
  likedByMe,
  comments,
  createdAt: post.dataCriacao,
  status: post.status,
  attachments: post.imagemUrl
    ? [{ name: "Imagem da publicacao", size: "URL", type: "image" }]
    : [],
});

export const mapDifficulty = (difficulty: MissionDto["dificuldade"]): Mission["difficulty"] => {
  const labels = {
    FACIL: "Fácil",
    MEDIA: "Médio",
    DIFICIL: "Difícil",
  } as const;

  return labels[difficulty];
};

export const mapApiDifficulty = (difficulty: Mission["difficulty"]) => {
  const values = {
    Fácil: "FACIL",
    Médio: "MEDIA",
    Difícil: "DIFICIL",
  } as const;

  return values[difficulty];
};

export const mapMission = (mission: MissionDto): Mission => ({
  id: mission.id,
  title: mission.titulo,
  description: mission.descricao,
  subject: mission.disciplina.nome,
  xpReward: mission.pontuacao,
  pointsReward: mission.pontuacao,
  difficulty: mapDifficulty(mission.dificuldade),
  status: "Disponível",
  instructions: mission.criteriosAvaliacao || mission.descricao,
  questions: [
    {
      id: `${mission.id}-answer`,
      question: mission.criteriosAvaliacao || mission.descricao,
      options: ["Enviar resposta textual", "Revisar instrucoes"],
      correctOptionIndex: 0,
    },
  ],
});

export const mapMyMission = (mission: MyMissionDto): MyMission => ({
  id: mission.id,
  title: mission.titulo,
  subject: mission.disciplina.nome,
  description: mission.descricao,
  difficulty: mapDifficulty(mission.dificuldade),
  xpReward: mission.pontuacao,
  pointsReward: mission.pontuacao,
  createdAt: mission.dataCriacao,
  deadline: mission.prazo,
  active: mission.ativa,
  startedCount: mission.quantidadeIniciados,
  receivedCount: mission.quantidadeRespostasRecebidas,
  completedCount: mission.quantidadeConcluidas,
});

export const mapRanking = (
  ranking: RankingResponseDto[],
  currentUserId: string,
): RankingEntry[] =>
  ranking.map((item) => ({
    id: item.aluno.id,
    name: item.aluno.nomeCompleto,
    avatar: DEFAULT_AVATAR,
    role: "student",
    xp: item.pontuacao,
    level: item.nivel,
    rank: item.posicao,
    isMe: item.aluno.id === currentUserId,
  }));

export const mapUserSearchResult = (dto: UserSearchResultDto): PublicProfileSummary => ({
  id: dto.id,
  name: dto.nomeCompleto,
  avatar: dto.fotoPerfil || DEFAULT_AVATAR,
  role: mapRole(dto.perfil),
  schoolClass: dto.turma,
  subject: dto.disciplina?.nome ?? null,
  xp: dto.pontuacao,
  level: dto.nivel,
});

export const mapPublicProfile = (dto: PublicProfileResponseDto): PublicProfile => ({
  id: dto.usuario.id,
  name: dto.usuario.nomeCompleto,
  avatar: dto.usuario.fotoPerfil || DEFAULT_AVATAR,
  role: mapRole(dto.usuario.perfil),
  schoolClass: dto.usuario.turma,
  subject: dto.usuario.disciplina?.nome ?? null,
  xp: dto.gamificacao.pontuacao,
  level: dto.gamificacao.nivel,
  posicaoRanking: dto.gamificacao.posicaoRankingGeral,
  joinedAt: dto.usuario.dataCriacao,
  completedMissionsCount: dto.estatisticas.quantidadeMissoesAvaliadas,
  postsCount: dto.estatisticas.quantidadePublicacoes,
  posts: dto.publicacoes.map((post) => ({
    id: post.id,
    title: post.titulo,
    content: post.descricao,
    imageUrl: post.imagemUrl,
    likesCount: post.quantidadeCurtidas,
    commentsCount: post.quantidadeComentarios,
    createdAt: post.dataCriacao,
  })),
});

export const mapNotification = (notification: NotificationDto): NotificationItem => {
  const typeMap = {
    CURTIDA: "like",
    COMENTARIO: "comment",
    MISSAO: "mission",
    PUBLICACAO_APROVADA: "system",
    PUBLICACAO_REPROVADA: "system",
    AVALIACAO: "badge",
  } as const;

  return {
    id: notification.id,
    title: notification.titulo,
    content: notification.mensagem,
    type: typeMap[notification.tipo],
    createdAt: notification.dataCriacao,
    read: notification.lida,
  };
};
