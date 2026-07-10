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
}

// =========================================================
// 1. LOGIN SCREEN
// =========================================================
export const LoginScreen: React.FC<ScreenProps> = ({
  navigate,
  triggerToast,
  setUser,
}) => {
  const [email, setEmail] = useState("thiago.alencar@escola.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
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

    // Simulate login
    if (
      email.toLowerCase().includes("teacher") ||
      email.toLowerCase().includes("prof")
    ) {
      setUser((prev) => ({
        ...prev,
        role: "teacher",
        name: "Prof. Lucas Rocha",
        schoolClass: "Física - Ensino Médio",
      }));
      triggerToast("Bem-vindo, Professor Lucas!");
      navigate("professor");
    } else {
      setUser((prev) => ({
        ...prev,
        role: "student",
        name: "Thiago Alencar",
        schoolClass: "2º Ano A - Matutino",
      }));
      triggerToast("Login efetuado com sucesso!");
      navigate("feed");
    }
  };

  const loginAs = (role: "student" | "teacher") => {
    if (role === "teacher") {
      setEmail("prof.lucas@escola.com");
      setUser((prev) => ({
        ...prev,
        role: "teacher",
        name: "Prof. Lucas Rocha",
        schoolClass: "Física - Ensino Médio",
      }));
      triggerToast("Sessão simulada como Professor.");
      navigate("professor");
    } else {
      setEmail("thiago.alencar@escola.com");
      setUser((prev) => ({
        ...prev,
        role: "student",
        name: "Thiago Alencar",
        schoolClass: "2º Ano A - Matutino",
        xp: 1420,
        level: 5,
        points: 340,
      }));
      triggerToast("Sessão simulada como Thiago.");
      navigate("feed");
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

        {error && (
          <Alert type="error" title="Erro de Acesso" description={error} />
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

          <Button type="submit" variant="primary" className="w-full py-3 mt-2">
            Entrar na Plataforma
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

        {/* Quick Simulator Switcher (Very helpful for UX review) */}
        <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100">
          <span className="text-[10px] font-bold text-brand-text-sub uppercase tracking-wider block text-center">
            Atalho de Simulação Rápida
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => loginAs("student")}
              className="px-2 py-1.5 bg-white border border-slate-200 text-xs font-semibold text-brand-primary rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors"
            >
              Entrar como Aluno
            </button>
            <button
              type="button"
              onClick={() => loginAs("teacher")}
              className="px-2 py-1.5 bg-white border border-slate-200 text-xs font-semibold text-amber-600 rounded-xl hover:bg-amber-50 hover:border-amber-200 transition-colors"
            >
              Entrar como Professor
            </button>
          </div>
        </div>
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
  setUser,
}) => {
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolClass, setSchoolClass] = useState("2º Ano A - Matutino");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      triggerToast("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setUser((prev) => ({
      ...prev,
      name,
      email,
      role,
      schoolClass: role === "teacher" ? "Professor Conselheiro" : schoolClass,
      xp: role === "teacher" ? 0 : 100, // starting XP
      level: role === "teacher" ? 1 : 1,
    }));

    triggerToast("Conta criada com sucesso! Boas-vindas.");
    if (role === "teacher") {
      navigate("professor");
    } else {
      navigate("feed");
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
            placeholder="No mínimo 6 caracteres"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <Button type="submit" variant="primary" className="w-full py-3 mt-4">
            Cadastrar e Começar 🚀
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
  setPosts,
  user,
  navigate,
  triggerToast,
  missions,
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

  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening post details
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const likedByMe = !p.likedByMe;
          const likesCount = likedByMe ? p.likesCount + 1 : p.likesCount - 1;
          return { ...p, likedByMe, likesCount };
        }
        return p;
      }),
    );
    triggerToast("Interação registrada!");
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

        {/* Post Creation Trigger */}
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
  setPosts,
  navigate,
  triggerToast,
  setNotifications,
}) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Matemática");
  const [content, setContent] = useState("");
  const [fileAttached, setFileAttached] = useState<{
    name: string;
    size: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      triggerToast("Preencha o título e o conteúdo da postagem.");
      return;
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        schoolClass: user.schoolClass,
      },
      title,
      content,
      subject,
      likesCount: 0,
      likedByMe: false,
      createdAt: new Date().toISOString(),
      attachments: fileAttached
        ? [{ name: fileAttached.name, size: fileAttached.size, type: "pdf" }]
        : [],
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);

    // Send notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: "Publicação criada com sucesso! 📰",
        content: `Você publicou "${title}" em ${subject}. Outros alunos já podem ver e interagir.`,
        type: "system",
        createdAt: new Date().toISOString(),
        read: false,
      },
      ...prev,
    ]);

    triggerToast("Publicação enviada para o feed!");
    navigate("feed");
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
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: "Matemática", label: "Matemática" },
              { value: "Física", label: "Física" },
              { value: "Química", label: "Química" },
              { value: "Ciências", label: "Ciências" },
              { value: "História", label: "História" },
              { value: "Redação", label: "Redação" },
            ]}
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
            <Button type="submit" variant="primary">
              Publicar no Feed
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
  setPosts,
  user,
  navigate,
  triggerToast,
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

  const handleLike = () => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === post.id) {
          const likedByMe = !p.likedByMe;
          const likesCount = likedByMe ? p.likesCount + 1 : p.likesCount - 1;
          return { ...p, likedByMe, likesCount };
        }
        return p;
      }),
    );
    triggerToast("Interação registrada!");
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      authorRole: user.role,
      content: commentText,
      createdAt: new Date().toISOString(),
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === post.id) {
          return {
            ...p,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      }),
    );

    setCommentText("");
    triggerToast("Comentário publicado!");
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
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Disponível" | "Em Andamento" | "Concluída"
  >("All");
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
          {["All", "Disponível", "Em Andamento", "Concluída"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
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
        {filteredMissions.map((mission) => (
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
        ))}
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
  setUser,
  navigate,
  triggerToast,
  setNotifications,
}) => {
  const mission = missions.find((m) => m.id === selectedMissionId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [qId: string]: number;
  }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<"success" | "fail" | null>(
    null,
  );

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

  const handleSelectOption = (qId: string, optIndex: number) => {
    if (quizCompleted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < mission.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setQuizFeedback(null);
  };

  const handleSubmitQuiz = () => {
    // Check answers
    let correctCount = 0;
    mission.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setQuizCompleted(true);

    const pass = correctCount === mission.questions.length;
    if (pass) {
      setQuizFeedback("success");

      // Update mission status
      setMissions((prev) =>
        prev.map((m) => {
          if (m.id === mission.id) {
            return { ...m, status: "Concluída" };
          }
          return m;
        }),
      );

      // Award XP and coins to user
      const isFirstTime = mission.status !== "Concluída";
      if (isFirstTime) {
        const xpGained = mission.xpReward;
        const coinsGained = mission.pointsReward;

        let newXp = user.xp + xpGained;
        let newLevel = user.level;
        let leveledUp = false;

        if (newXp >= user.xpNextLevel) {
          newLevel += 1;
          newXp = newXp - user.xpNextLevel;
          leveledUp = true;
        }

        setUser((prev) => {
          // Check if there is an unlocked badge
          const currentBadges = [...prev.badges];
          if (
            mission.unlockedBadge &&
            !currentBadges.some((b) => b.id === mission.unlockedBadge?.id)
          ) {
            currentBadges.push({
              ...mission.unlockedBadge,
              unlockedAt: new Date().toISOString(),
            });
          }

          return {
            ...prev,
            xp: newXp,
            level: newLevel,
            points: prev.points + coinsGained,
            completedMissionsCount: prev.completedMissionsCount + 1,
            badges: currentBadges,
          };
        });

        // Add Notification
        setNotifications((prev) => [
          {
            id: `notif-complete-${Date.now()}`,
            title: `Missão concluída! +${xpGained} XP 🌟`,
            content: `Você completou com sucesso a missão "${mission.title}" e faturou ${coinsGained} moedas.`,
            type: "badge",
            createdAt: new Date().toISOString(),
            read: false,
          },
          ...(leveledUp
            ? [
                {
                  id: `notif-lvl-${Date.now()}`,
                  title: `Subiu de Nível! Nível ${newLevel} 🎉`,
                  content:
                    "Incrível! Sua sede de conhecimento te levou a um novo patamar intelectual.",
                  type: "system" as const,
                  createdAt: new Date().toISOString(),
                  read: false,
                },
              ]
            : []),
          ...prev,
        ]);

        triggerToast(
          `Missão Concluída! +${xpGained} XP e +${coinsGained} Moedas!`,
        );
      } else {
        triggerToast("Missão revisada com sucesso!");
      }
    } else {
      setQuizFeedback("fail");
      triggerToast("Alguns exercícios precisam de correção.");
    }
  };

  const currentQuestion = mission.questions[currentQuestionIndex];
  const allQuestionsAnswered = mission.questions.every(
    (q) => selectedAnswers[q.id] !== undefined,
  );

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
            {/* If Quiz is NOT complete or fails */}
            {quizFeedback !== "success" ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                  <h4 className="text-sm font-bold text-brand-text-main">
                    Exercício {currentQuestionIndex + 1} de{" "}
                    {mission.questions.length}
                  </h4>
                  <div className="text-xs font-semibold text-brand-text-sub bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                    Respostas: {Object.keys(selectedAnswers).length} /{" "}
                    {mission.questions.length}
                  </div>
                </div>

                {/* Question rendering */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-brand-text-main leading-relaxed">
                    {currentQuestion.question}
                  </h3>

                  <div className="grid grid-cols-1 gap-2.5">
                    {currentQuestion.options.map((opt, oIdx) => {
                      const isSelected =
                        selectedAnswers[currentQuestion.id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() =>
                            handleSelectOption(currentQuestion.id, oIdx)
                          }
                          className={`w-full text-left text-xs p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-blue-50/50 border-brand-primary text-brand-primary font-semibold"
                              : "bg-white border-slate-100 hover:border-slate-200 text-brand-text-main"
                          }`}
                        >
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-bold mr-3 text-brand-text-sub group-hover:bg-blue-50">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Error Banner if fail */}
                {quizFeedback === "fail" && (
                  <Alert
                    type="error"
                    title="Ops! Respostas Incorretas"
                    description="Alguma de suas respostas está errada. Mas não desanime, revise as opções e tente novamente!"
                  />
                )}

                {/* Quiz Navigation actions */}
                <div className="flex items-center justify-between border-t border-slate-50 pt-6 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                  >
                    Anterior
                  </Button>

                  {currentQuestionIndex < mission.questions.length - 1 ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleNext}
                      disabled={
                        selectedAnswers[currentQuestion.id] === undefined
                      }
                    >
                      Próxima
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSubmitQuiz}
                      disabled={!allQuestionsAnswered}
                    >
                      Enviar Respostas
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              /* Success Celebration Screen */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-brand-success flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-brand-text-main">
                    Excelente Trabalho! 🎉
                  </h3>
                  <p className="text-sm text-brand-text-sub max-w-md mx-auto">
                    Você gabaritou a missão **"{mission.title}"** acertando{" "}
                    {score} de {mission.questions.length} questões.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 max-w-sm mx-auto grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-brand-text-sub uppercase block">
                      XP Conquistado
                    </span>
                    <span className="text-lg font-bold text-brand-primary">
                      +{mission.xpReward} XP ⭐
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brand-text-sub uppercase block">
                      Moedas Ganhas
                    </span>
                    <span className="text-lg font-bold text-amber-600">
                      +{mission.pointsReward} Moedas 🪙
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
                  <Button variant="outline" size="sm" onClick={handleResetQuiz}>
                    Fazer Novamente (Revisar)
                  </Button>
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
  setSubmissions,
  user,
  navigate,
  triggerToast,
  setNotifications,
  missions,
  setMissions,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("Matemática");
  const [newDesc, setNewDesc] = useState("");
  const [newDifficulty, setNewDifficulty] = useState<
    "Fácil" | "Médio" | "Difícil"
  >("Médio");

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          return { ...sub, status: "Aprovado" as const };
        }
        return sub;
      }),
    );

    const sub = submissions.find((s) => s.id === id);
    if (sub) {
      // Notify the student
      setNotifications((prev) => [
        {
          id: `notif-app-${Date.now()}`,
          title: "Exercício de Biologia Aprovado! 🩺",
          content: `Parabéns, ${sub.studentName}! Seu professor aprovou sua submissão para a missão "${sub.missionTitle}".`,
          type: "system",
          createdAt: new Date().toISOString(),
          read: false,
        },
        ...prev,
      ]);
    }

    triggerToast("Submissão revisada e aprovada com sucesso!");
  };

  const handleCreateMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    const newM: Mission = {
      id: `mission-gen-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      subject: newSubject,
      xpReward:
        newDifficulty === "Fácil" ? 100 : newDifficulty === "Médio" ? 150 : 200,
      pointsReward:
        newDifficulty === "Fácil" ? 20 : newDifficulty === "Médio" ? 30 : 40,
      difficulty: newDifficulty,
      status: "Disponível",
      instructions: "Siga os enunciados e responda com precisão Educatech.",
      questions: [
        {
          id: `q-gen-1`,
          question: "Qual é a resposta lógica para este desafio inicial?",
          options: [
            "Opção Correta do Professor",
            "Opção Distratora 1",
            "Opção Distratora 2",
          ],
          correctOptionIndex: 0,
        },
      ],
    };

    setMissions((prev) => [newM, ...prev]);

    // Send generic notification to feed
    setNotifications((prev) => [
      {
        id: `notif-miss-gen-${Date.now()}`,
        title: `Nova Missão Disponibilizada! 🎯`,
        content: `O Prof. Lucas Rocha publicou uma nova missão: "${newTitle}" em ${newSubject}. Participe!`,
        type: "mission",
        createdAt: new Date().toISOString(),
        read: false,
      },
      ...prev,
    ]);

    setNewTitle("");
    setNewDesc("");
    triggerToast("Nova missão despachada para os estudantes!");
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
                  {submissions.map((sub) => (
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
                            onClick={() => handleApprove(sub.id)}
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
                  ))}
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
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                options={[
                  { value: "Matemática", label: "Matemática" },
                  { value: "Física", label: "Física" },
                  { value: "Química", label: "Química" },
                  { value: "Ciências", label: "Ciências" },
                  { value: "História", label: "História" },
                  { value: "Redação", label: "Redação" },
                ]}
              />

              <Select
                id="teach-miss-diff"
                label="Dificuldade Estimada"
                value={newDifficulty}
                onChange={(e) => setNewDifficulty(e.target.value as any)}
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
              >
                Publicar Desafio 🎯
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
  setNotifications,
  triggerToast,
}) => {
  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    triggerToast("Todas as notificações foram marcadas como lidas.");
  };

  const clearRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
    triggerToast("Notificações lidas removidas.");
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          return { ...n, read: !n.read };
        }
        return n;
      }),
    );
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
          >
            Marcar como lidas
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={clearRead}
          >
            Limpar lidas
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
                onClick={() => toggleRead(notif.id)}
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
                        toggleRead(notif.id);
                      }}
                      className="text-[10px] font-bold text-brand-text-sub hover:text-brand-text-main hover:underline transition-colors ml-auto"
                    >
                      {notif.read ? "Marcar como não lida" : "Marcar como lida"}
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
