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
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
}

export interface ExerciseQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
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

// Teacher Dashboard stats and submissions
export interface MissionSubmission {
  id: string;
  studentName: string;
  studentAvatar: string;
  missionTitle: string;
  score: string; // e.g., "5/5"
  submittedAt: string;
  xpAwarded: number;
  status: 'Aprovado' | 'Pendente';
}
