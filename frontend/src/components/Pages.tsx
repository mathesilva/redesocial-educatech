/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  ThumbsUp,
  MessageSquare,
  Plus,
  ArrowLeft,
  Download,
  Brain,
  Award,
  BookOpen,
  Clock,
  Trophy,
  Users,
  CheckCircle,
  Activity,
  FileText,
  Trash2,
  Check,
  Play,
  Bell,
  User as UserIcon,
  HelpCircle,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Send,
  AlertCircle,
} from "lucide-react";
import {
  Button,
  Input,
  Select,
  Card,
  Badge,
  Tag,
  UploadZone,
  Avatar,
  Alert,
  BadgeIconResolver,
  Pagination,
} from "./DesignSystem";
import {
  UserProfile,
  Post,
  Mission,
  NotificationItem,
  RankingEntry,
  MissionSubmission,
  Discipline,
} from "../types";

// =========================================================
// TYPES FOR PAGES ACTIONS
// =========================================================
interface ScreenProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  missions: Mission[];
  setMissions: React.Dispatch<React.SetStateAction<Mission[]>>;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  ranking: RankingEntry[];
  setRanking: React.Dispatch<React.SetStateAction<RankingEntry[]>>;
  submissions: MissionSubmission[];
  setSubmissions: React.Dispatch<React.SetStateAction<MissionSubmission[]>>;

  navigate: (screen: string, extraId?: string) => void;
  selectedPostId?: string | null;
  selectedMissionId?: string | null;
  triggerToast: (msg: string) => void;
  disciplines: Discipline[];
  isLoading: boolean;
  errorMessage: string;
  onLogin: (email: string, senha: string) => Promise<void>;
  onRegister: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserProfile["role"];
    school: string;
    schoolClass: string;
    disciplineId?: string | null;
  }) => Promise<void>;
  onCreatePost: (data: {
    title: string;
    content: string;
    subject: string;
  }) => Promise<void>;
  onToggleReaction: (postId: string) => Promise<void>;
  onCreateComment: (postId: string, content: string) => Promise<void>;
  onCreateMission: (data: {
    title: string;
    description: string;
    subject: string;
    difficulty: Mission["difficulty"];
  }) => Promise<void>;
  onSubmitMissionAnswer: (mission: Mission, answer: string) => Promise<void>;
  onApproveMissionSubmission: (submission: MissionSubmission) => Promise<void>;
  onMarkNotificationAsRead: (id: string) => Promise<void>;
}

type MissionFilterStatus = "All" | "Disponível" | "Em Andamento" | "Concluída";
type MissionDifficultyLabel = "Fácil" | "Médio" | "Difícil";

// =========================================================
// 1. LOGIN SCREEN
// =========================================================
export const LoginScreen: React.FC<ScreenProps> = ({
  navigate,
  onLogin,
  isLoading,
  errorMessage,
}) => {
  const [email, setEmail] = useState("thiago.alencar@escola.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("E-mail inválido. Por favor, digite um e-mail válido.");
      return;
    }
    if (password.length < 4) {
      setError("A senha deve ter pelo menos 4 caracteres.");
      return;
    }
    setError("");

    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao autenticar.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6 px-4">
      <Card className="max-w-md w-full p-8 space-y-6 shadow-xl border border-slate-100 rounded-3xl">
        {/* Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-primary text-white shadow-md shadow-blue-200">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-brand-text-main tracking-tight">
            Rede Social Educatech
          </h2>
          <p className="text-sm text-brand-text-sub">
            Conectando saberes, gamificando o futuro.
          </p>
        </div>

        {(error || errorMessage) && (
          <Alert type="error" title="Erro de Acesso" description={error || errorMessage} />
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            id="login-email"
            label="E-mail"
            placeholder="Ex: thiago.alencar@escola.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="login-password"
            label="Senha"
            placeholder="Digite sua senha de acesso"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between text-xs text-brand-text-sub">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-brand-primary focus:ring-blue-100 w-4 h-4"
                defaultChecked
              />
              Lembrar meu acesso
            </label>
            <a
              href="#forgot"
              className="text-brand-primary hover:underline font-semibold"
              onClick={(e) => e.preventDefault()}
            >
              Esqueceu a senha?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar na Plataforma"}
          </Button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-100 w-full" />
          <span className="bg-white px-3 text-[11px] text-brand-text-sub absolute uppercase tracking-wider font-semibold">
            ou cadastre-se
          </span>
        </div>

        <Button
          variant="outline"
          className="w-full text-brand-text-main py-2.5"
          onClick={() => navigate("cadastro")}
        >
          Criar Nova Conta de Estudante
        </Button>
      </Card>
    </div>
  );
};

// =========================================================
// 2. CADASTRO SCREEN
// =========================================================
export const CadastroScreen: React.FC<ScreenProps> = ({
  navigate,
  triggerToast,
  onRegister,
  disciplines,
  isLoading,
  errorMessage,
}) => {
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [school, setSchool] = useState("");
  const [schoolClass, setSchoolClass] = useState("2º Ano A - Matutino");
  const [disciplineId, setDisciplineId] = useState("");
  const [formError, setFormError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword || !school) {
      triggerToast("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("A confirmação de senha deve ser igual à senha.");
      return;
    }

    if (role === "teacher" && !disciplineId) {
      setFormError("Selecione uma disciplina para cadastrar professor.");
      return;
    }

    setFormError("");

    try {
      await onRegister({
        name,
        email,
        password,
        confirmPassword,
        role,
        school,
        schoolClass,
        disciplineId,
      });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Erro ao cadastrar.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6 px-4">
      <Card className="max-w-md w-full p-8 space-y-6 shadow-xl border border-slate-100 rounded-3xl">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-brand-text-main tracking-tight">
            Crie sua Conta
          </h2>
          <p className="text-sm text-brand-text-sub">
            Faça parte da nossa comunidade de aprendizado.
          </p>
        </div>

        {(formError || errorMessage) && (
          <Alert type="error" title="Erro no Cadastro" description={formError || errorMessage} />
        )}

        {/* Role Selector */}
        <div className="flex p-1 bg-slate-50 border border-slate-100 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              role === "student"
                ? "bg-brand-primary text-white shadow-xs"
                : "text-brand-text-sub hover:text-brand-text-main"
            }`}
          >
            Sou Estudante
          </button>
          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              role === "teacher"
                ? "bg-brand-secondary text-brand-text-main shadow-xs"
                : "text-brand-text-sub hover:text-brand-text-main"
            }`}
          >
            Sou Professor
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            id="register-name"
            label="Nome Completo"
            placeholder="Ex: Beatriz Silveira"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            id="register-email"
            label="E-mail Institucional"
            placeholder="Ex: seu-nome@escola.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="register-password"
            label="Senha"
            placeholder="No mínimo 8 caracteres"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            id="register-confirm-password"
            label="Confirmar Senha"
            placeholder="Repita a senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Input
            id="register-school"
            label="Escola"
            placeholder="Ex: Escola Estadual Educatech"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
          />

          {role === "student" && (
            <Select
              id="register-class"
              label="Turma / Classe"
              value={schoolClass}
              onChange={(e) => setSchoolClass(e.target.value)}
              options={[
                { value: "1º Ano A - Matutino", label: "1º Ano A - Matutino" },
                { value: "2º Ano A - Matutino", label: "2º Ano A - Matutino" },
                {
                  value: "2º Ano B - Vespertino",
                  label: "2º Ano B - Vespertino",
                },
                { value: "3º Ano A - Matutino", label: "3º Ano A - Matutino" },
              ]}
            />
          )}

          {role === "teacher" && (
            <Select
              id="register-discipline"
              label="Disciplina"
              value={disciplineId}
              onChange={(e) => setDisciplineId(e.target.value)}
              options={[
                { value: "", label: "Selecione uma disciplina" },
                ...disciplines.map((discipline) => ({
                  value: discipline.id,
                  label: discipline.nome,
                })),
              ]}
            />
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Cadastrando..." : "Cadastrar e Começar"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-xs text-brand-text-sub">
            Já tem uma conta?{" "}
            <button
              onClick={() => navigate("login")}
              className="text-brand-primary hover:underline font-bold"
            >
              Fazer Login
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};

// =========================================================
// 3. FEED DE PUBLICAÇÕES (FEED)
// =========================================================
export const FeedScreen: React.FC<ScreenProps> = ({
  posts,
  user,
  navigate,
  triggerToast,
  missions,
  onToggleReaction,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Todas");

  const subjects = [
    "Todas",
    "Matemática",
    "Física",
    "Química",
    "Ciências",
    "História",
    "Redação",
  ];

  const handleLike = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening post details
    try {
      await onToggleReaction(postId);
      triggerToast("Interação registrada!");
    } catch (error) {
      triggerToast(error instanceof Error ? error.message : "Erro ao registrar curtida.");
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSubject =
      selectedSubject === "Todas" || post.subject === selectedSubject;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // Calculate XP Progress bar percentage
  const progressPercent = Math.min(
    100,
    Math.round((user.xp / user.xpNextLevel) * 100),
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Middle Column: Post Feed (Col-span 8) */}
      <div className="col-span-1 lg:col-span-8 space-y-6">
        {/* Search & Subjects Nav */}
        <div className="bg-white p-4 border border-slate-100 rounded-2xl shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-brand-text-sub absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Buscar resumos, dúvidas ou posts de professores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm font-sans pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-brand-primary transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {subjects.map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all select-none cursor-pointer ${
                  selectedSubject === subj
                    ? "bg-brand-primary text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-brand-text-sub hover:text-brand-text-main"
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        {user.role === "student" && (
          <div
            onClick={() => navigate("criar-publicacao")}
            className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md/5 transition-all p-4 cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Avatar src={user.avatar} alt={user.name} role={user.role} />
              <span className="text-sm font-medium text-brand-text-sub group-hover:text-brand-text-main transition-colors">
                Compartilhe um resumo ou poste uma dúvida...
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Post List */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card
                key={post.id}
                onClick={() => navigate("detalhes-publicacao", post.id)}
                className="hover:border-slate-200 transition-colors p-6"
              >
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={post.author.avatar}
                      alt={post.author.name}
                      role={post.author.role}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-brand-text-main">
                          {post.author.name}
                        </span>
                        <Badge
                          variant={
                            post.author.role === "teacher"
                              ? "secondary"
                              : "primary"
                          }
                        >
                          {post.author.role === "teacher" ? "Prof." : "Aluno"}
                        </Badge>
                      </div>
                      <span className="text-xs text-brand-text-sub">
                        {post.author.schoolClass}
                      </span>
                    </div>
                  </div>
                  <Tag subject={post.subject} />
                </div>

                {/* Content */}
                <div className="space-y-2 mb-4">
                  <h3 className="text-base font-bold text-brand-text-main hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-brand-text-sub leading-relaxed line-clamp-3 whitespace-pre-wrap">
                    {post.content}
                  </p>
                </div>

                {/* Attachments */}
                {post.attachments && post.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.attachments.map((file, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs"
                      >
                        <FileText className="w-4 h-4 text-brand-primary shrink-0" />
                        <span className="font-semibold text-brand-text-main truncate max-w-[150px]">
                          {file.name}
                        </span>
                        <span className="text-brand-text-sub">
                          ({file.size})
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions Footer */}
                <div className="flex items-center gap-6 text-xs font-semibold text-brand-text-sub border-t border-slate-50 pt-4">
                  <button
                    onClick={(e) => handleLike(post.id, e)}
                    className={`flex items-center gap-2 transition-colors cursor-pointer ${
                      post.likedByMe
                        ? "text-brand-primary"
                        : "hover:text-brand-text-main"
                    }`}
                  >
                    <ThumbsUp
                      className={`w-4 h-4 ${post.likedByMe ? "fill-blue-50" : ""}`}
                    />
                    <span>{post.likesCount} curtidas</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments.length} comentários</span>
                  </div>

                  <span className="ml-auto font-normal text-[11px] text-brand-text-sub">
                    {new Date(post.createdAt).toLocaleDateString("pt-BR")} às{" "}
                    {new Date(post.createdAt).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 space-y-2">
              <Search className="w-8 h-8 text-brand-text-sub mx-auto opacity-50" />
              <h4 className="text-sm font-bold text-brand-text-main">
                Nenhuma postagem encontrada
              </h4>
              <p className="text-xs text-brand-text-sub">
                Experimente buscar por outros termos ou mudar a disciplina
                filtrada.
              </p>
            </div>
          )}
        </div>

        <Pagination />
      </div>

      {/* Right Column: Mini Widgets (Col-span 4) */}
      <div className="col-span-1 lg:col-span-4 space-y-6">
        {/* User Progress Widget */}
        {user.role === "student" && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Avatar
                src={user.avatar}
                alt={user.name}
                level={user.level}
                role="student"
              />
              <div>
                <h4 className="text-sm font-bold text-brand-text-main">
                  {user.name}
                </h4>
                <p className="text-xs text-brand-text-sub">
                  {user.schoolClass}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-brand-text-sub">Progresso de Nível</span>
                <span className="text-brand-primary">
                  {user.xp} / {user.xpNextLevel} XP
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-primary rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Coin balance */}
            <div className="pt-2 border-t border-slate-50">
              <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-xl text-center">
                <span className="text-[10px] uppercase font-bold text-amber-700 block tracking-wider">
                  Moedas
                </span>
                <span className="text-lg font-bold text-amber-600 block mt-0.5">
                  {user.points} 🪙
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => navigate("perfil")}
            >
              Ver Perfil Completo
            </Button>
          </Card>
        )}

        {/* Active Missions Widget */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <h4 className="text-sm font-bold text-brand-text-main flex items-center gap-2">
              <Brain className="w-4 h-4 text-brand-primary" /> Missões Ativas
            </h4>
            <button
              onClick={() => navigate("missoes")}
              className="text-xs text-brand-primary hover:underline font-semibold"
            >
              Ver todas
            </button>
          </div>

          <div className="space-y-3">
            {missions
              .filter(
                (m) => m.status === "Em Andamento" || m.status === "Disponível",
              )
              .slice(0, 2)
              .map((mission) => (
                <div
                  key={mission.id}
                  onClick={() => navigate("detalhes-missao", mission.id)}
                  className="p-3 border border-slate-100 rounded-xl hover:border-slate-200 cursor-pointer bg-slate-50/50 hover:bg-white transition-all space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text-sub">
                      {mission.subject}
                    </span>
                    <Badge
                      variant={
                        mission.difficulty === "Fácil"
                          ? "success"
                          : mission.difficulty === "Médio"
                            ? "primary"
                            : "danger"
                      }
                    >
                      {mission.difficulty}
                    </Badge>
                  </div>
                  <h5 className="text-xs font-bold text-brand-text-main line-clamp-1">
                    {mission.title}
                  </h5>
                  <p className="text-[10px] text-brand-text-sub line-clamp-2">
                    {mission.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px] font-semibold text-brand-primary">
                    <span>+{mission.xpReward} XP</span>
                    <span className="text-amber-600">
                      +{mission.pointsReward} Moedas
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// =========================================================
// 4. CRIAR PUBLICAÇÃO (CREATE POST)
// =========================================================
export const CriarPublicacaoScreen: React.FC<ScreenProps> = ({
  user,
  navigate,
  triggerToast,
  onCreatePost,
  disciplines,
  isLoading,
}) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [fileAttached, setFileAttached] = useState<{
    name: string;
    size: string;
  } | null>(null);

  const subjects = disciplines.map((discipline) => discipline.nome);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.role !== "student") {
      triggerToast("Somente alunos podem criar publicações.");
      navigate("feed");
      return;
    }

    if (!title || !content) {
      triggerToast("Preencha o título e o conteúdo da postagem.");
      return;
    }

    try {
      await onCreatePost({
        title,
        content,
        subject: subject || subjects[0],
      });
    } catch (error) {
      triggerToast(error instanceof Error ? error.message : "Erro ao criar publicacao.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-brand-text-sub">
        <button
          onClick={() => navigate("feed")}
          className="hover:text-brand-text-main"
        >
          Início
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-text-main">Criar Publicação</span>
      </div>

      <Card className="p-8 space-y-6">
        <div className="border-b border-slate-50 pb-4">
          <h2 className="text-xl font-bold text-brand-text-main">
            Criar Nova Publicação
          </h2>
          <p className="text-xs text-brand-text-sub mt-1">
            Compartilhe um resumo de aula, liste pontos cruciais ou pergunte uma
            dúvida aos colegas de classe.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="post-title"
            label="Título da Publicação"
            placeholder="Ex: Resumo de Química: Funções Oxigenadas e Hidrocarbonetos"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Select
            id="post-subject"
            label="Selecione a Disciplina correspondente"
            value={subject || subjects[0] || ""}
            onChange={(e) => setSubject(e.target.value)}
            options={subjects.map((item) => ({ value: item, label: item }))}
          />

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="post-content"
              className="text-sm font-medium text-brand-text-main"
            >
              Conteúdo / Descrição
            </label>
            <textarea
              id="post-content"
              rows={6}
              placeholder="Digite aqui o resumo detalhado ou a sua dúvida completa... Use marcadores, exemplos e detalhe bem!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-sm font-sans text-brand-text-main placeholder-slate-400 bg-white border border-slate-200 rounded-xl px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-primary"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-brand-text-main block">
              Anexar material de apoio (Opcional)
            </label>
            <UploadZone onFileSelect={(file) => setFileAttached(file)} />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-50 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("feed")}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Publicando..." : "Publicar no Feed"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

// =========================================================
// 5. DETALHES DA PUBLICAÇÃO
// =========================================================
export const DetalhesPublicacaoScreen: React.FC<ScreenProps> = ({
  selectedPostId,
  posts,
  user,
  navigate,
  triggerToast,
  onToggleReaction,
  onCreateComment,
}) => {
  const [commentText, setCommentText] = useState("");

  const post = posts.find((p) => p.id === selectedPostId);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h4 className="text-sm font-bold text-brand-text-main">
          Post não encontrado
        </h4>
        <Button
          onClick={() => navigate("feed")}
          variant="primary"
          className="mt-4"
        >
          Voltar ao Feed
        </Button>
      </div>
    );
  }

  const handleLike = async () => {
    try {
      await onToggleReaction(post.id);
      triggerToast("Interação registrada!");
    } catch (error) {
      triggerToast(error instanceof Error ? error.message : "Erro ao registrar curtida.");
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await onCreateComment(post.id, commentText);
      setCommentText("");
      triggerToast("Comentário publicado!");
    } catch (error) {
      triggerToast(error instanceof Error ? error.message : "Erro ao comentar.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-brand-text-sub">
        <button
          onClick={() => navigate("feed")}
          className="hover:text-brand-text-main flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Feed
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-text-main truncate max-w-[200px]">
          {post.title}
        </span>
      </div>

      {/* Main post card */}
      <Card className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              src={post.author.avatar}
              alt={post.author.name}
              role={post.author.role}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-brand-text-main">
                  {post.author.name}
                </span>
                <Badge
                  variant={
                    post.author.role === "teacher" ? "secondary" : "primary"
                  }
                >
                  {post.author.role === "teacher" ? "Prof." : "Aluno"}
                </Badge>
              </div>
              <span className="text-xs text-brand-text-sub">
                {post.author.schoolClass}
              </span>
            </div>
          </div>
          <Tag subject={post.subject} />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-brand-text-main tracking-tight leading-snug">
            {post.title}
          </h1>
          <div className="text-sm text-brand-text-main leading-relaxed whitespace-pre-wrap space-y-2">
            {post.content}
          </div>
        </div>

        {/* Attachments */}
        {post.attachments && post.attachments.length > 0 && (
          <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50 space-y-2">
            <h5 className="text-xs font-bold text-brand-text-main uppercase tracking-wider">
              Arquivos em Anexo
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {post.attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileText className="w-4 h-4 text-brand-primary shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-brand-text-main truncate">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-brand-text-sub">
                        {file.size}
                      </p>
                    </div>
                  </div>
                  <button
                    className="p-1.5 hover:bg-slate-50 rounded-lg text-brand-primary cursor-pointer transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button Likes */}
        <div className="flex items-center gap-4 text-xs font-semibold text-brand-text-sub border-t border-slate-50 pt-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              post.likedByMe
                ? "bg-blue-50/50 text-brand-primary border-blue-100 hover:bg-blue-100/40"
                : "bg-white border-slate-200 hover:bg-slate-50 text-brand-text-sub hover:text-brand-text-main"
            }`}
          >
            <ThumbsUp
              className={`w-3.5 h-3.5 ${post.likedByMe ? "fill-blue-50" : ""}`}
            />
            <span>{post.likesCount} Curtidas</span>
          </button>

          <span className="text-brand-text-sub ml-auto">
            Publicado em {new Date(post.createdAt).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </Card>

      {/* Comments section */}
      <Card className="p-6 md:p-8 space-y-6">
        <h3 className="text-base font-bold text-brand-text-main border-b border-slate-50 pb-3">
          Discussões ({post.comments.length})
        </h3>

        {/* Existing comments */}
        <div className="space-y-4">
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 text-sm border-b border-slate-50 pb-4 last:border-0 last:pb-0"
              >
                <Avatar
                  src={comment.authorAvatar}
                  alt={comment.authorName}
                  size="sm"
                  role={comment.authorRole}
                />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-brand-text-main">
                      {comment.authorName}
                    </span>
                    <Badge
                      variant={
                        comment.authorRole === "teacher"
                          ? "secondary"
                          : "primary"
                      }
                    >
                      {comment.authorRole === "teacher" ? "Prof." : "Aluno"}
                    </Badge>
                    <span className="text-[10px] text-brand-text-sub ml-auto">
                      {new Date(comment.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-brand-text-main text-xs leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-xs text-brand-text-sub">
                Seja o primeiro a deixar um comentário educativo!
              </p>
            </div>
          )}
        </div>

        {/* Add comment Form */}
        <form
          onSubmit={handleAddComment}
          className="flex gap-3 pt-4 border-t border-slate-50"
        >
          <Avatar
            src={user.avatar}
            alt={user.name}
            size="sm"
            role={user.role}
          />
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Digite sua resposta ou contribuição..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 font-sans text-xs bg-slate-50 border border-slate-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-brand-primary transition-all"
            />
            <Button type="submit" size="sm" className="px-4 py-2 text-xs">
              <Send className="w-3.5 h-3.5" /> Enviar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

// =========================================================
// 6. PERFIL DO ALUNO
// =========================================================
export const PerfilAlunoScreen: React.FC<ScreenProps> = ({
  user,
  posts,
  navigate,
}) => {
  const userPosts = posts.filter((p) => p.author.id === user.id);
  const progressPercent = Math.min(
    100,
    Math.round((user.xp / user.xpNextLevel) * 100),
  );

  return (
    <div className="space-y-8">
      {/* Profile Card Banner */}
      <Card className="overflow-hidden p-0 rounded-3xl relative">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <div className="p-6 md:p-8 relative pt-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between -mt-12 mb-6 gap-4">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
              <Avatar
                src={user.avatar}
                alt={user.name}
                size="xl"
                level={user.level}
                role="student"
              />
              <div className="pb-1">
                <h2 className="text-2xl font-bold text-brand-text-main">
                  {user.name}
                </h2>
                <p className="text-sm font-semibold text-brand-primary">
                  {user.schoolClass}
                </p>
              </div>
            </div>

            <div className="flex gap-2 self-center md:self-auto">
              <div className="px-4 py-2 bg-amber-50 border border-amber-100 rounded-xl text-center">
                <span className="text-[10px] font-bold text-amber-700 block uppercase">
                  Moedas
                </span>
                <span className="text-base font-extrabold text-amber-600">
                  {user.points} 🪙
                </span>
              </div>
              <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-center">
                <span className="text-[10px] font-bold text-blue-700 block uppercase">
                  Nível
                </span>
                <span className="text-base font-extrabold text-brand-primary">
                  Lvl {user.level}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-50">
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                Sobre Mim
              </h4>
              <p className="text-sm text-brand-text-sub leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                {user.bio}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                Metas e Experiência
              </h4>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 space-y-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-brand-text-sub">
                    Experiência acumulada
                  </span>
                  <span className="text-brand-primary">
                    {user.xp} / {user.xpNextLevel} XP
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-primary rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs pt-1">
                  <span className="text-brand-text-sub">
                    Missões Concluídas
                  </span>
                  <span className="font-bold text-brand-text-main">
                    {user.completedMissionsCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Grid: Badges (Medalhas) & Post History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Badges Box (Col 5) */}
        <div className="col-span-1 lg:col-span-5">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-brand-text-main border-b border-slate-50 pb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-primary" /> Insígnias
              Destravadas
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${badge.color}`}
                  >
                    <BadgeIconResolver name={badge.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-brand-text-main">
                      {badge.title}
                    </h5>
                    <p className="text-[10px] text-brand-text-sub leading-tight mt-0.5">
                      {badge.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* History Box (Col 7) */}
        <div className="col-span-1 lg:col-span-7">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-brand-text-main border-b border-slate-50 pb-3">
              Minhas Publicações ({userPosts.length})
            </h3>

            <div className="space-y-4">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => navigate("detalhes-publicacao", post.id)}
                    className="p-4 border border-slate-100 rounded-2xl hover:border-slate-200 cursor-pointer bg-slate-50/50 hover:bg-white transition-all space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-brand-text-sub">
                        {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                      <Tag subject={post.subject} />
                    </div>
                    <h4 className="text-xs font-bold text-brand-text-main line-clamp-1">
                      {post.title}
                    </h4>
                    <p className="text-[11px] text-brand-text-sub line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex gap-4 text-[10px] text-brand-text-sub font-semibold pt-1">
                      <span>👍 {post.likesCount} curtidas</span>
                      <span>💬 {post.comments.length} comentários</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-xs text-brand-text-sub">
                    Você ainda não publicou nada.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => navigate("criar-publicacao")}
                  >
                    Criar Primeira Publicação
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// 7. LISTA DE MISSÕES
// =========================================================
export const ListaMissoesScreen: React.FC<ScreenProps> = ({
  missions,
  navigate,
}) => {
  const [filterStatus, setFilterStatus] = useState<MissionFilterStatus>("All");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("All");

  const filteredMissions = missions.filter((m) => {
    const matchesStatus = filterStatus === "All" || m.status === filterStatus;
    const matchesDiff =
      filterDifficulty === "All" || m.difficulty === filterDifficulty;
    return matchesStatus && matchesDiff;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-brand-text-main tracking-tight">
            Missões Acadêmicas
          </h2>
          <p className="text-sm text-brand-text-sub mt-0.5">
            Participe dos desafios propostos pelos professores para ganhar XP e
            medalhas.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-slate-100 rounded-2xl">
        {/* Status filters */}
        <div className="flex flex-wrap gap-1">
          {(["All", "Disponível", "Em Andamento", "Concluída"] as MissionFilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer select-none ${
                filterStatus === status
                  ? "bg-brand-primary text-white"
                  : "bg-slate-50 hover:bg-slate-100 text-brand-text-sub hover:text-brand-text-main"
              }`}
            >
              {status === "All" ? "Todas" : status}
            </button>
          ))}
        </div>

        {/* Difficulty Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-brand-text-sub">
            Dificuldade:
          </span>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="text-xs font-semibold text-brand-text-main bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-100"
          >
            <option value="All">Todas</option>
            <option value="Fácil">Fácil</option>
            <option value="Médio">Médio</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>
      </div>

      {/* Mission Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMissions.length > 0 ? (
          filteredMissions.map((mission) => (
          <Card
            key={mission.id}
            onClick={() => navigate("detalhes-missao", mission.id)}
            className="flex flex-col justify-between hover:border-slate-200 transition-all p-6 relative overflow-hidden group"
          >
            {mission.status === "Concluída" && (
              <div className="absolute top-0 right-0 bg-brand-success/10 text-brand-success text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-emerald-100 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Concluída
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text-sub">
                  {mission.subject}
                </span>
                <Badge
                  variant={
                    mission.difficulty === "Fácil"
                      ? "success"
                      : mission.difficulty === "Médio"
                        ? "primary"
                        : "danger"
                  }
                >
                  {mission.difficulty}
                </Badge>
              </div>

              <h4 className="text-sm font-bold text-brand-text-main group-hover:text-brand-primary transition-colors">
                {mission.title}
              </h4>
              <p className="text-xs text-brand-text-sub leading-relaxed line-clamp-3">
                {mission.description}
              </p>
            </div>

            {/* Reward & Progress info */}
            <div className="mt-5 pt-4 border-t border-slate-50 space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-brand-text-sub">Prêmios:</span>
                <div className="flex items-center gap-3">
                  <span className="text-brand-primary">
                    +{mission.xpReward} XP
                  </span>
                  <span className="text-amber-600">
                    +{mission.pointsReward} Moedas
                  </span>
                </div>
              </div>

              <Button
                variant={mission.status === "Concluída" ? "outline" : "primary"}
                className="w-full text-xs py-2"
              >
                {mission.status === "Concluída"
                  ? "Rever Exercícios"
                  : "Iniciar Missão"}
              </Button>
            </div>
          </Card>
          ))
        ) : (
          <div className="md:col-span-2 lg:col-span-3 text-center py-12 bg-white rounded-2xl border border-slate-100 space-y-2">
            <Brain className="w-8 h-8 text-brand-text-sub mx-auto opacity-50" />
            <h4 className="text-sm font-bold text-brand-text-main">
              Nenhuma missão encontrada
            </h4>
            <p className="text-xs text-brand-text-sub">
              As novas missões publicadas pelos professores aparecerão aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================
// 8. DETALHES DA MISSÃO & QUIZ
// =========================================================
export const DetalhesMissaoScreen: React.FC<ScreenProps> = ({
  selectedMissionId,
  missions,
  setMissions,
  user,
  navigate,
  triggerToast,
  onSubmitMissionAnswer,
}) => {
  const mission = missions.find((m) => m.id === selectedMissionId);
  const [missionAnswer, setMissionAnswer] = useState("");
  const [missionSubmitting, setMissionSubmitting] = useState(false);
  const [missionSubmitted, setMissionSubmitted] = useState(false);

  if (!mission) {
    return (
      <div className="text-center py-12">
        <h4 className="text-sm font-bold text-brand-text-main">
          Missão não encontrada
        </h4>
        <Button
          onClick={() => navigate("missoes")}
          variant="primary"
          className="mt-4"
        >
          Voltar para Missões
        </Button>
      </div>
    );
  }

  const handleSubmitMission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.role !== "student") {
      triggerToast("Somente alunos podem responder missões.");
      return;
    }

    if (missionAnswer.trim().length < 10) {
      triggerToast("A resposta deve ter pelo menos 10 caracteres.");
      return;
    }

    setMissionSubmitting(true);
    try {
      await onSubmitMissionAnswer(mission, missionAnswer.trim());
      setMissionSubmitted(true);
      setMissions((prev) =>
        prev.map((m) =>
          m.id === mission.id ? { ...m, status: "Em Andamento" } : m,
        ),
      );
    } catch (error) {
      triggerToast(error instanceof Error ? error.message : "Erro ao enviar resposta.");
    } finally {
      setMissionSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header / Nav */}
      <div className="flex items-center gap-2 text-xs font-semibold text-brand-text-sub">
        <button
          onClick={() => navigate("missoes")}
          className="hover:text-brand-text-main flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Missões
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-text-main truncate max-w-[200px]">
          {mission.title}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Instructions (Col 4) */}
        <div className="col-span-1 lg:col-span-4 space-y-6">
          <Card className="p-6 space-y-4">
            <Tag subject={mission.subject} />
            <h3 className="text-lg font-bold text-brand-text-main leading-snug">
              {mission.title}
            </h3>
            <p className="text-xs text-brand-text-sub leading-relaxed">
              {mission.description}
            </p>

            <div className="space-y-2 border-t border-slate-50 pt-4 text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-brand-text-sub">Dificuldade:</span>
                <span className="text-brand-text-main">
                  {mission.difficulty}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-text-sub">Recompensa:</span>
                <span className="text-brand-primary">
                  +{mission.xpReward} XP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-text-sub">Moedas:</span>
                <span className="text-amber-600">
                  +{mission.pointsReward} Moedas
                </span>
              </div>
            </div>

            {mission.unlockedBadge && (
              <div className="border-t border-slate-50 pt-4 space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-brand-text-sub block">
                  Desbloqueia Medalha
                </span>
                <div className="flex items-center gap-2.5 p-2.5 bg-amber-50/50 border border-amber-100 rounded-xl">
                  <Award className="w-5 h-5 text-brand-secondary shrink-0" />
                  <div>
                    <h5 className="text-[11px] font-bold text-brand-text-main">
                      {mission.unlockedBadge.title}
                    </h5>
                    <p className="text-[9px] text-brand-text-sub leading-tight">
                      100% de acerto.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Side: Interactive Quiz (Col 8) */}
        <div className="col-span-1 lg:col-span-8">
          <Card className="p-6 md:p-8 space-y-6">
            {!missionSubmitted ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                  <h4 className="text-sm font-bold text-brand-text-main">
                    Resposta da missão
                  </h4>
                  <div className="text-xs font-semibold text-brand-text-sub bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                    {user.role === "student" ? "Aluno" : "Professor"}
                  </div>
                </div>

                {user.role === "teacher" ? (
                  <Alert
                    type="info"
                    title="Modo professor"
                    description="Professores podem criar missões no painel docente. O envio de respostas é permitido apenas para alunos."
                  />
                ) : (
                  <form onSubmit={handleSubmitMission} className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="mission-answer"
                        className="text-sm font-medium text-brand-text-main"
                      >
                        Sua resposta
                      </label>
                      <textarea
                        id="mission-answer"
                        rows={6}
                        value={missionAnswer}
                        onChange={(e) => setMissionAnswer(e.target.value)}
                        placeholder="Digite sua resposta para a missão..."
                        className="w-full text-sm font-sans text-brand-text-main placeholder-slate-400 bg-white border border-slate-200 rounded-xl px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-primary"
                        disabled={missionSubmitting}
                      />
                    </div>
                    <div className="flex items-center justify-end border-t border-slate-50 pt-6">
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        disabled={missionSubmitting || missionAnswer.trim().length < 10}
                      >
                        {missionSubmitting ? "Enviando..." : "Enviar Resposta"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* Success Celebration Screen */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-brand-success flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-brand-text-main">
                    Resposta enviada
                  </h3>
                  <p className="text-sm text-brand-text-sub max-w-md mx-auto">
                    Sua resposta para "{mission.title}" foi encaminhada para
                    avaliação do professor.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 max-w-sm mx-auto grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-brand-text-sub uppercase block">
                      XP Conquistado
                    </span>
                    <span className="text-lg font-bold text-brand-primary">
                      {mission.xpReward} XP
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brand-text-sub uppercase block">
                      Moedas Ganhas
                    </span>
                    <span className="text-lg font-bold text-amber-600">
                      {mission.pointsReward} pontos
                    </span>
                  </div>
                </div>

                {mission.unlockedBadge && (
                  <div className="border border-amber-100 bg-amber-50/50 p-4 rounded-2xl max-w-sm mx-auto space-y-2">
                    <span className="text-xs font-bold text-amber-700 flex items-center justify-center gap-1">
                      <Award className="w-4 h-4" /> Nova Medalha Destravada!
                    </span>
                    <h4 className="text-sm font-bold text-brand-text-main">
                      {mission.unlockedBadge.title}
                    </h4>
                    <p className="text-xs text-brand-text-sub">
                      {mission.unlockedBadge.description}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 justify-center pt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate("missoes")}
                  >
                    Ver Outras Missões
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// 9. RANKING SCREEN
// =========================================================
export const RankingScreen: React.FC<ScreenProps> = ({ ranking, user }) => {
  // Sort ranking entries by XP descending
  // Let's dynamically map our active user XP into the ranking spotlight!
  const mappedRanking = ranking
    .map((entry) => {
      if (entry.id === "user-me") {
        return {
          ...entry,
          xp: user.xp + (user.level - 5) * 2500, // accommodate higher levels dynamically
          level: user.level,
          name: user.name,
        };
      }
      return entry;
    })
    .sort((a, b) => b.xp - a.xp)
    .map((entry, idx) => ({ ...entry, rank: idx + 1 }));

  const podium = mappedRanking.slice(0, 3);
  const remaining = mappedRanking.slice(3);

  // Helper colors for podium card
  const getCrownColor = (rank: number) => {
    if (rank === 1) return "text-[#FBBF24]"; // Gold
    if (rank === 2) return "text-[#94A3B8]"; // Silver
    return "text-[#B45309]"; // Bronze
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-bold text-brand-text-main tracking-tight flex items-center gap-2">
          <Trophy className="w-6 h-6 text-brand-secondary" /> Liga de
          Conhecimento Semanal
        </h2>
        <p className="text-sm text-brand-text-sub mt-0.5">
          Veja quem acumulou mais XP realizando atividades e publique resumos de
          alto nível.
        </p>
      </div>

      {/* Podium Cards (Top 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
        {/* Second Place (idx 1) */}
        {podium[1] && (
          <Card className="text-center p-6 space-y-4 border-slate-100 bg-white sm:order-1 order-2">
            <div className="relative inline-block">
              <Avatar
                src={podium[1].avatar}
                alt={podium[1].name}
                size="lg"
                level={podium[1].level}
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-text-main line-clamp-1">
                {podium[1].name}
              </h4>
              <p className="text-xs text-brand-text-sub mt-0.5">2º Lugar</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl text-xs font-semibold text-brand-primary">
              {podium[1].xp} XP
            </div>
          </Card>
        )}

        {/* First Place (idx 0) */}
        {podium[0] && (
          <Card className="text-center p-8 space-y-4 border-brand-secondary bg-amber-50/10 shadow-md sm:order-2 order-1 relative transform sm:-translate-y-4">
            <div className="absolute top-2 right-2 bg-brand-secondary text-brand-text-main text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase">
              Campeão
            </div>
            <div className="relative inline-block">
              <Avatar
                src={podium[0].avatar}
                alt={podium[0].name}
                size="xl"
                level={podium[0].level}
              />
            </div>
            <div>
              <h4 className="text-base font-bold text-brand-text-main line-clamp-1">
                {podium[0].name}
              </h4>
              <p className="text-xs text-brand-text-sub mt-0.5">1º Lugar</p>
            </div>
            <div className="bg-brand-secondary text-brand-text-main p-2 rounded-xl text-xs font-bold">
              {podium[0].xp} XP
            </div>
          </Card>
        )}

        {/* Third Place (idx 2) */}
        {podium[2] && (
          <Card
            className={`text-center p-6 space-y-4 border-slate-100 bg-white sm:order-3 order-3 ${podium[2].isMe ? "border-brand-primary bg-blue-50/10" : ""}`}
          >
            <div className="relative inline-block">
              <Avatar
                src={podium[2].avatar}
                alt={podium[2].name}
                size="lg"
                level={podium[2].level}
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-text-main line-clamp-1">
                {podium[2].name} {podium[2].isMe && "(Você)"}
              </h4>
              <p className="text-xs text-brand-text-sub mt-0.5">3º Lugar</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl text-xs font-semibold text-brand-primary">
              {podium[2].xp} XP
            </div>
          </Card>
        )}
      </div>

      {/* Leaderboard list */}
      <Card className="p-0 overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4 bg-slate-50/50">
          <h3 className="text-sm font-bold text-brand-text-main">
            Classificação Geral
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {remaining.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between px-6 py-3.5 ${
                entry.isMe ? "bg-blue-50/30" : "hover:bg-slate-50/30"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-6 text-center text-xs font-bold text-brand-text-sub">
                  #{entry.rank}
                </span>
                <Avatar src={entry.avatar} alt={entry.name} size="sm" />
                <div>
                  <h5 className="text-xs font-bold text-brand-text-main flex items-center gap-2">
                    {entry.name}{" "}
                    {entry.isMe && (
                      <span className="text-[10px] font-normal text-brand-primary">
                        (Você)
                      </span>
                    )}
                  </h5>
                  <span className="text-[10px] text-brand-text-sub capitalize">
                    {entry.role}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-brand-text-main block">
                  {entry.xp} XP
                </span>
                <span className="text-[9px] text-brand-text-sub font-semibold">
                  Lvl {entry.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// =========================================================
// 10. DASHBOARD DO PROFESSOR (TEACHER CONSOLE)
// =========================================================
export const DashboardProfessorScreen: React.FC<ScreenProps> = ({
  submissions,
  triggerToast,
  disciplines,
  onCreateMission,
  onApproveMissionSubmission,
  isLoading,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDifficulty, setNewDifficulty] = useState<
    MissionDifficultyLabel
  >("Médio");

  const handleApprove = async (submission: MissionSubmission) => {
    try {
      await onApproveMissionSubmission(submission);
    } catch (error) {
      triggerToast(error instanceof Error ? error.message : "Erro ao avaliar submissão.");
    }
  };

  const subjects = disciplines.map((discipline) => discipline.nome);

  const handleCreateMission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    try {
      await onCreateMission({
        title: newTitle,
        description: newDesc,
        subject: newSubject || subjects[0],
        difficulty: newDifficulty,
      });
      setNewTitle("");
      setNewDesc("");
    } catch (error) {
      triggerToast(error instanceof Error ? error.message : "Erro ao criar missão.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-bold text-brand-text-main tracking-tight">
          Console de Gestão do Docente
        </h2>
        <p className="text-sm text-brand-text-sub mt-0.5">
          Monitore o engajamento dos alunos, lance missões personalizadas e
          aprove submissões de relatórios.
        </p>
      </div>

      {/* High Level Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-text-sub uppercase tracking-wider block">
              Total de Alunos
            </span>
            <span className="text-lg font-bold text-brand-text-main">
              28 Ativos
            </span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-success flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-text-sub uppercase tracking-wider block">
              Média de Acertos
            </span>
            <span className="text-lg font-bold text-brand-text-main">
              85% Geral
            </span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-brand-secondary flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-text-sub uppercase tracking-wider block">
              Missões Entregues
            </span>
            <span className="text-lg font-bold text-brand-text-main">
              42 Resolvidas
            </span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-text-sub uppercase tracking-wider block">
              Engajamento
            </span>
            <span className="text-lg font-bold text-brand-text-main">
              92% Semanal
            </span>
          </div>
        </Card>
      </div>

      {/* Content Grid: Submissions list (Col 8) & Create Mission Form (Col 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pending Submissions Box */}
        <div className="col-span-1 lg:col-span-8">
          <Card className="p-0 overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-4 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-sm font-bold text-brand-text-main">
                Revisão de Exercícios Práticos
              </h3>
              <Badge variant="primary">Ação Necessária</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-brand-text-main border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-brand-text-sub uppercase bg-slate-50/30">
                    <th className="px-6 py-3">Estudante</th>
                    <th className="px-6 py-3">Missão</th>
                    <th className="px-6 py-3">Pontuação</th>
                    <th className="px-6 py-3">Data</th>
                    <th className="px-6 py-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {submissions.length > 0 ? (
                    submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/30">
                      <td className="px-6 py-3.5 flex items-center gap-2.5">
                        <img
                          src={sub.studentAvatar}
                          alt={sub.studentName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-semibold">{sub.studentName}</span>
                      </td>
                      <td className="px-6 py-3.5 font-medium">
                        {sub.missionTitle}
                      </td>
                      <td className="px-6 py-3.5">
                        <Badge
                          variant={
                            sub.score.includes("100%") ? "success" : "primary"
                          }
                        >
                          {sub.score}
                        </Badge>
                      </td>
                      <td className="px-6 py-3.5 text-brand-text-sub">
                        {new Date(sub.submittedAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        {sub.status === "Pendente" ? (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => void handleApprove(sub)}
                            className="px-3 py-1 rounded-lg text-[10px]"
                          >
                            Aprovar
                          </Button>
                        ) : (
                          <span className="text-[10px] text-brand-success font-semibold flex items-center justify-end gap-1">
                            <Check className="w-3.5 h-3.5" /> Aprovado
                          </span>
                        )}
                      </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-8 text-center text-brand-text-sub"
                      >
                        Nenhuma submissão pendente encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Dispatch New Mission Form */}
        <div className="col-span-1 lg:col-span-4">
          <Card className="p-6 space-y-4">
            <div className="border-b border-slate-50 pb-3">
              <h3 className="text-sm font-bold text-brand-text-main">
                Despachar Novo Desafio
              </h3>
              <p className="text-[10px] text-brand-text-sub mt-0.5">
                Sua missão será enviada imediatamente para todos os estudantes
                do Ensino Médio.
              </p>
            </div>

            <form onSubmit={handleCreateMission} className="space-y-3.5">
              <Input
                id="teach-miss-title"
                label="Título do Desafio"
                placeholder="Ex: Teorema de Pitágoras no Cotidiano"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />

              <Select
                id="teach-miss-subj"
                label="Disciplina"
                value={newSubject || subjects[0] || ""}
                onChange={(e) => setNewSubject(e.target.value)}
                options={subjects.map((item) => ({ value: item, label: item }))}
              />

              <Select
                id="teach-miss-diff"
                label="Dificuldade Estimada"
                value={newDifficulty}
                onChange={(e) =>
                  setNewDifficulty(e.target.value as MissionDifficultyLabel)
                }
                options={[
                  { value: "Fácil", label: "Fácil" },
                  { value: "Médio", label: "Médio" },
                  { value: "Difícil", label: "Difícil" },
                ]}
              />

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="teach-miss-desc"
                  className="text-xs font-semibold text-brand-text-main"
                >
                  Instruções / Enunciado
                </label>
                <textarea
                  id="teach-miss-desc"
                  rows={3}
                  placeholder="Escreva o enunciado inicial do quiz..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full text-xs font-sans text-brand-text-main placeholder-slate-400 bg-white border border-slate-200 rounded-xl px-3 py-2 transition-all focus:outline-none focus:ring-1 focus:ring-blue-100"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full text-xs py-2 mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Publicando..." : "Publicar Desafio"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// 11. CENTRAL DE NOTIFICAÇÕES (NOTIFICATION PANEL)
// =========================================================
export const CentralNotificacoesScreen: React.FC<ScreenProps> = ({
  notifications,
  triggerToast,
  onMarkNotificationAsRead,
}) => {
  const [markingReadId, setMarkingReadId] = useState<string | null>(null);

  const markAllRead = async () => {
    setMarkingReadId("all");
    try {
      await Promise.all(
        notifications
          .filter((notification) => !notification.read)
          .map((notification) => onMarkNotificationAsRead(notification.id)),
      );
      triggerToast("Todas as notificações foram marcadas como lidas.");
    } catch (error) {
      triggerToast(error instanceof Error ? error.message : "Erro ao atualizar notificações.");
    } finally {
      setMarkingReadId(null);
    }
  };

  const markRead = async (id: string) => {
    setMarkingReadId(id);
    try {
      await onMarkNotificationAsRead(id);
    } catch (error) {
      triggerToast(error instanceof Error ? error.message : "Erro ao atualizar notificação.");
    } finally {
      setMarkingReadId(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-brand-text-main tracking-tight">
            Central de Notificações
          </h2>
          <p className="text-sm text-brand-text-sub mt-0.5">
            Acompanhe menções, conquistas desbloqueadas e atualizações
            escolares.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={markAllRead}
            disabled={markingReadId !== null}
          >
            {markingReadId === "all" ? "Atualizando..." : "Marcar como lidas"}
          </Button>
        </div>
      </div>

      {/* Notifications list */}
      <Card className="p-0 overflow-hidden space-y-0 divide-y divide-slate-100">
        {notifications.length > 0 ? (
          notifications.map((notif) => {
            const iconBg = {
              system: "bg-blue-50 text-brand-primary border-blue-100",
              like: "bg-emerald-50 text-brand-success border-emerald-100",
              comment: "bg-purple-50 text-purple-600 border-purple-100",
              mission: "bg-amber-50 text-brand-secondary border-amber-200",
              badge: "bg-rose-50 text-brand-danger border-rose-100",
            };

            const notifIcons = {
              system: <Bell className="w-4 h-4" />,
              like: <ThumbsUp className="w-4 h-4" />,
              comment: <MessageSquare className="w-4 h-4" />,
              mission: <Brain className="w-4 h-4 text-amber-700" />,
              badge: <Award className="w-4 h-4" />,
            };

            return (
              <div
                key={notif.id}
                onClick={() => !notif.read && void markRead(notif.id)}
                className={`flex gap-4 p-5 transition-colors cursor-pointer select-none ${
                  notif.read
                    ? "bg-white opacity-70"
                    : "bg-blue-50/15 font-semibold"
                }`}
              >
                {/* Visual state indicator */}
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${iconBg[notif.type]}`}
                  >
                    {notifIcons[notif.type]}
                  </div>
                  {!notif.read && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-primary border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h5 className="text-xs font-bold text-brand-text-main">
                      {notif.title}
                    </h5>
                    <span className="text-[10px] text-brand-text-sub shrink-0 font-normal">
                      {new Date(notif.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-xs text-brand-text-sub leading-relaxed">
                    {notif.content}
                  </p>

                  <div className="pt-1 flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-brand-primary bg-blue-50 px-2 py-0.5 rounded-md">
                      {notif.type}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!notif.read) {
                          void markRead(notif.id);
                        }
                      }}
                      disabled={markingReadId !== null || notif.read}
                      className="text-[10px] font-bold text-brand-text-sub hover:text-brand-text-main hover:underline transition-colors ml-auto"
                    >
                      {markingReadId === notif.id
                        ? "Atualizando..."
                        : notif.read
                          ? "Lida"
                          : "Marcar como lida"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 space-y-2">
            <Bell className="w-8 h-8 text-brand-text-sub mx-auto opacity-40" />
            <h4 className="text-sm font-bold text-brand-text-main">
              Sua caixa de entrada está limpa
            </h4>
            <p className="text-xs text-brand-text-sub">
              Você receberá atualizações quando interações ou novos desafios
              surgirem!
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
