/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'student' | 'teacher';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  level: number;
  xp: number;
  xpNextLevel: number;
  points: number;
  bio: string;
  schoolClass: string;
  badges: Badge[];
  completedMissionsCount: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind class
  unlockedAt?: string;
}

export interface PostComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: UserRole;
    schoolClass: string;
  };
  title: string;
  content: string;
  subject: string; // e.g. "Matemática", "Biologia", etc.
  likesCount: number;
  likedByMe: boolean;
  comments: PostComment[];
  createdAt: string;
  status?: 'PENDENTE' | 'APROVADA' | 'REPROVADA';
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
}

export interface Discipline {
  id: string;
  nome: string;
  descricao: string | null;
}

export interface ExerciseQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
}

export interface MissionAnswerState {
  resposta: string | null;
  status: 'INICIADA' | 'ENVIADA' | 'AVALIADA';
  nota: number | null;
  feedbackProfessor: string | null;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  subject: string;
  xpReward: number;
  pointsReward: number;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  status: 'Disponível' | 'Em Andamento' | 'Concluída';
  questions: ExerciseQuestion[];
  instructions: string;
  unlockedBadge?: Badge;
  myAnswer?: MissionAnswerState | null;
}

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: 'system' | 'like' | 'comment' | 'mission' | 'badge';
  createdAt: string;
  read: boolean;
}

export interface RankingEntry {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  xp: number;
  level: number;
  rank: number;
  isMe?: boolean;
}

export interface PublicProfileSummary {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  schoolClass: string | null;
  subject: string | null;
  xp: number;
  level: number;
}

export interface PublicProfilePost {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export interface PublicProfile extends PublicProfileSummary {
  posicaoRanking: number;
  joinedAt: string;
  completedMissionsCount: number;
  postsCount: number;
  posts: PublicProfilePost[];
}

// Teacher Dashboard stats and submissions
export interface MissionSubmission {
  id: string;
  missionId?: string;
  studentName: string;
  studentAvatar: string;
  missionTitle: string;
  subject: string;
  turma: string | null;
  answer: string;
  score: string; // e.g., "5/5"
  submittedAt: string;
  xpAwarded: number;
  status: 'Aprovado' | 'Reprovado' | 'Pendente';
}

export interface MyMission {
  id: string;
  title: string;
  subject: string;
  description: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  xpReward: number;
  pointsReward: number;
  createdAt: string;
  deadline: string;
  active: boolean;
  startedCount: number;
  receivedCount: number;
  completedCount: number;
}
