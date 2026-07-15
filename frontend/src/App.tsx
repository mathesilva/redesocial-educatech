/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  MessageSquare,
  Brain,
  Trophy,
  Users,
  Award,
  Bell,
  User as UserIcon,
  Menu,
  X,
  LogOut,
} from "lucide-react";

// Import Types
import {
  UserProfile,
  Post,
  Mission,
  NotificationItem,
  RankingEntry,
  MissionSubmission,
  Discipline,
} from "./types";

// Import Mock Data
import {
  INITIAL_USER,
  INITIAL_RANKING,
  INITIAL_SUBMISSIONS,
} from "./data";

import { authApi } from "./api/auth";
import {
  addUnauthorizedListener,
  clearStoredToken,
  getStoredToken,
  setStoredToken,
} from "./api/client";
import { commentsApi } from "./api/comments";
import { disciplinesApi } from "./api/disciplines";
import { missionsApi } from "./api/missions";
import { notificationsApi } from "./api/notifications";
import { postsApi } from "./api/posts";
import { profileApi } from "./api/profile";
import { reactionsApi } from "./api/reactions";
import { usersApi } from "./api/users";
import {
  mapApiDifficulty,
  mapApiRole,
  mapComment,
  mapMission,
  mapNotification,
  mapPost,
  mapProfileToUser,
  mapRole,
} from "./services/mappers";

// Import Reusable Design System components
import { Toast, Avatar, Badge, Button } from "./components/DesignSystem";

// Import Pages
import {
  LoginScreen,
  CadastroScreen,
  FeedScreen,
  CriarPublicacaoScreen,
  DetalhesPublicacaoScreen,
  PerfilAlunoScreen,
  ListaMissoesScreen,
  DetalhesMissaoScreen,
  RankingScreen,
  DashboardProfessorScreen,
  CentralNotificacoesScreen,
} from "./components/Pages";

export default function App() {
  // Global States
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [posts, setPosts] = useState<Post[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [ranking, setRanking] = useState<RankingEntry[]>(INITIAL_RANKING);
  const [submissions, setSubmissions] =
    useState<MissionSubmission[]>(INITIAL_SUBMISSIONS);

  // Routing and Navigation States
  const [currentScreen, setCurrentScreen] = useState<string>(
    getStoredToken() ? "feed" : "login",
  );
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(
    null,
  );

  // UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getStoredToken()));
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(getStoredToken()));
  const [loadingMessage, setLoadingMessage] = useState("");
  const [globalError, setGlobalError] = useState("");

  // Reset page scroll on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  const triggerToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const getErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : "Nao foi possivel concluir a operacao.";

  const loadDisciplines = async () => {
    const response = await disciplinesApi.list();
    setDisciplines(response.itens);
    return response.itens;
  };

  const loadProfile = async () => {
    const [me, profile] = await Promise.all([authApi.me(), profileApi.get()]);
    setUser(mapProfileToUser(profile, mapRole(me.perfil), me.email));
    return me;
  };

  const loadPosts = async () => {
    const response = await postsApi.list();
    const enriched = await Promise.all(
      response.itens.map(async (post) => {
        const [comments, reactions] = await Promise.all([
          commentsApi.listByPost(post.id).catch(() => []),
          reactionsApi.summary(post.id).catch(() => ({
            quantidadeCurtidas: 0,
            usuarioCurtiu: false,
          })),
        ]);

        return mapPost(
          post,
          comments.map(mapComment),
          reactions.quantidadeCurtidas,
          reactions.usuarioCurtiu,
        );
      }),
    );

    setPosts(enriched);
  };

  const loadMissions = async (role: UserProfile["role"] = user.role) => {
    const response = await missionsApi.list();
    const mappedMissions = await Promise.all(
      response.itens.map(async (mission) => {
        const mappedMission = mapMission(mission);

        if (role !== "student") {
          return mappedMission;
        }

        const answer = await missionsApi.myAnswer(mission.id).catch(() => null);

        if (!answer) {
          return mappedMission;
        }

        return {
          ...mappedMission,
          status: answer.status === "AVALIADA" ? "Concluída" : "Em Andamento",
        } as Mission;
      }),
    );

    setMissions(mappedMissions);
    return mappedMissions;
  };

  const loadMissionSubmissions = async (items: Mission[]) => {
    const answers = await Promise.all(
      items.map(async (mission) => {
        const missionAnswers = await missionsApi.listAnswers(mission.id).catch(() => []);

        return missionAnswers.map((answer): MissionSubmission => ({
          id: answer.id,
          missionId: mission.id,
          studentName: answer.aluno.nomeCompleto,
          studentAvatar: INITIAL_USER.avatar,
          missionTitle: mission.title,
          score: answer.nota === null ? "Pendente" : `${answer.nota}%`,
          submittedAt: answer.dataEnvio,
          xpAwarded: answer.nota ?? 0,
          status: answer.status === "AVALIADA" ? "Aprovado" : "Pendente",
        }));
      }),
    );

    setSubmissions(answers.flat());
  };

  const loadNotifications = async () => {
    const items = await notificationsApi.list();
    setNotifications(items.map(mapNotification));
  };

  const loadAuthenticatedData = async () => {
    setLoadingMessage("Carregando dados da plataforma...");
    setGlobalError("");
    const me = await loadProfile();
    const [, , missionItems] = await Promise.all([
      loadDisciplines(),
      loadPosts(),
      loadMissions(mapRole(me.perfil)),
      loadNotifications(),
    ]);

    if (me.perfil === "PROFESSOR") {
      await loadMissionSubmissions(missionItems);
    }

    setIsAuthenticated(true);
    return me;
  };

  useEffect(() => {
    const bootstrap = async () => {
      await loadDisciplines().catch(() => []);

      if (!getStoredToken()) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const me = await loadAuthenticatedData();
        setCurrentScreen(me.perfil === "PROFESSOR" ? "professor" : "feed");
      } catch (error) {
        clearStoredToken();
        setIsAuthenticated(false);
        setCurrentScreen("login");
        setGlobalError(getErrorMessage(error));
      } finally {
        setLoadingMessage("");
        setIsBootstrapping(false);
      }
    };

    void bootstrap();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && currentScreen !== "login" && currentScreen !== "cadastro") {
      setCurrentScreen("login");
    }
  }, [currentScreen, isAuthenticated]);

  // Safe navigation function
  const navigate = (screenName: string, extraId?: string) => {
    if (!isAuthenticated && screenName !== "login" && screenName !== "cadastro") {
      setCurrentScreen("login");
      return;
    }

    if (screenName === "detalhes-publicacao" && extraId) {
      setSelectedPostId(extraId);
    } else if (screenName === "detalhes-missao" && extraId) {
      setSelectedMissionId(extraId);
    }
    setCurrentScreen(screenName);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    clearStoredToken();
    setIsAuthenticated(false);
    setPosts([]);
    setMissions([]);
    setNotifications([]);
    triggerToast("Desconectado com sucesso!");
    setCurrentScreen("login");
  };

  useEffect(() => {
    return addUnauthorizedListener(() => {
      setIsAuthenticated(false);
      setPosts([]);
      setMissions([]);
      setNotifications([]);
      setCurrentScreen("login");
      setGlobalError("Sessao expirada. Faça login novamente.");
    });
  }, []);

  const handleLogin = async (email: string, senha: string) => {
    setLoadingMessage("Entrando...");
    setGlobalError("");
    try {
      const response = await authApi.login({ email, senha });
      setStoredToken(response.accessToken);
      const me = await loadAuthenticatedData();
      triggerToast("Login efetuado com sucesso!");
      setCurrentScreen(me.perfil === "PROFESSOR" ? "professor" : "feed");
    } catch (error) {
      const message = getErrorMessage(error);
      setGlobalError(message);
      throw error;
    } finally {
      setLoadingMessage("");
    }
  };

  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserProfile["role"];
    school: string;
    schoolClass: string;
    disciplineId?: string | null;
  }) => {
    setLoadingMessage("Criando conta...");
    setGlobalError("");
    try {
      await usersApi.register({
        nomeCompleto: data.name,
        email: data.email,
        senha: data.password,
        confirmarSenha: data.confirmPassword,
        perfil: mapApiRole(data.role),
        escola: data.school,
        turma: data.role === "student" ? data.schoolClass : null,
        disciplinaId: data.role === "teacher" ? data.disciplineId || null : null,
      });

      await handleLogin(data.email, data.password);
      triggerToast("Conta criada com sucesso! Boas-vindas.");
    } catch (error) {
      setGlobalError(getErrorMessage(error));
      throw error;
    } finally {
      setLoadingMessage("");
    }
  };

  const findDisciplineId = (subject: string) =>
    disciplines.find((discipline) => discipline.nome === subject)?.id ||
    disciplines[0]?.id;

  const handleCreatePost = async (data: { title: string; content: string; subject: string }) => {
    const disciplineId = findDisciplineId(data.subject);
    if (!disciplineId) {
      throw new Error("Nenhuma disciplina cadastrada no backend.");
    }

    const created = await postsApi.create({
      titulo: data.title,
      descricao: data.content,
      disciplinaId: disciplineId,
    });

    setPosts((prev) => [mapPost(created), ...prev]);
    triggerToast(
      created.status === "PENDENTE"
        ? "Publicacao enviada para aprovacao."
        : "Publicacao enviada para o feed!",
    );
    navigate("feed");
  };

  const handleToggleReaction = async (postId: string) => {
    const summary = await reactionsApi.toggle(postId);
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likedByMe: summary.usuarioCurtiu,
              likesCount: summary.quantidadeCurtidas,
            }
          : post,
      ),
    );
  };

  const handleCreateComment = async (postId: string, content: string) => {
    const created = await commentsApi.create(postId, content);
    const comment = mapComment(created);
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post,
      ),
    );
  };

  const handleCreateMission = async (data: {
    title: string;
    description: string;
    subject: string;
    difficulty: Mission["difficulty"];
  }) => {
    const disciplineId = findDisciplineId(data.subject);
    if (!disciplineId) {
      throw new Error("Nenhuma disciplina cadastrada no backend.");
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const created = await missionsApi.create({
      titulo: data.title,
      descricao: data.description,
      criteriosAvaliacao: data.description,
      prazo: dueDate.toISOString(),
      pontuacao:
        data.difficulty === "Fácil" ? 100 : data.difficulty === "Médio" ? 150 : 200,
      dificuldade: mapApiDifficulty(data.difficulty),
      disciplinaId: disciplineId,
    });

    setMissions((prev) => [mapMission(created), ...prev]);
    triggerToast("Nova missão publicada para os estudantes!");
  };

  const handleSubmitMissionAnswer = async (mission: Mission, answer: string) => {
    await missionsApi.answer(mission.id, { resposta: answer });
    setMissions((prev) =>
      prev.map((item) =>
        item.id === mission.id ? { ...item, status: "Em Andamento" } : item,
      ),
    );
    triggerToast("Resposta enviada para avaliação do professor.");
  };

  const handleApproveMissionSubmission = async (submission: MissionSubmission) => {
    if (!submission.missionId) {
      throw new Error("Resposta de missão sem identificador.");
    }

    await missionsApi.evaluateAnswer(submission.missionId, submission.id, {
      nota: 100,
      feedbackProfessor: "Resposta aprovada.",
    });

    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === submission.id
          ? { ...item, status: "Aprovado", score: "100%", xpAwarded: 100 }
          : item,
      ),
    );

    triggerToast("Submissão avaliada com sucesso!");
  };

  const handleMarkNotificationAsRead = async (id: string) => {
    const updated = await notificationsApi.markAsRead(id);
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? mapNotification(updated) : notification,
      ),
    );
  };

  // Notifications Count
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Breadcrumbs text resolver
  const getBreadcrumb = () => {
    switch (currentScreen) {
      case "login":
        return "Portal > Entrar";
      case "cadastro":
        return "Portal > Nova Conta";
      case "feed":
        return "Início > Feed Educatech";
      case "criar-publicacao":
        return "Início > Criar Publicação";
      case "detalhes-publicacao":
        return "Início > Detalhes da Postagem";
      case "perfil":
        return "Minha Conta > Perfil do Estudante";
      case "missoes":
        return "Desafios > Missões Ativas";
      case "detalhes-missao":
        return "Desafios > Resolver Exercício";
      case "ranking":
        return "Competições > Ranking Escolar";
      case "professor":
        return "Docência > Painel do Professor";
      case "notificacoes":
        return "Central > Notificações";
      default:
        return "Educatech";
    }
  };

  const renderActiveScreen = () => {
    const props = {
      user,
      setUser,
      posts,
      setPosts,
      missions,
      setMissions,
      notifications,
      setNotifications,
      ranking,
      setRanking,
      submissions,
      setSubmissions,
      navigate,
      selectedPostId,
      selectedMissionId,
      triggerToast,
      disciplines,
      isLoading: Boolean(loadingMessage),
      errorMessage: globalError,
      onLogin: handleLogin,
      onRegister: handleRegister,
      onCreatePost: handleCreatePost,
      onToggleReaction: handleToggleReaction,
      onCreateComment: handleCreateComment,
      onCreateMission: handleCreateMission,
      onSubmitMissionAnswer: handleSubmitMissionAnswer,
      onApproveMissionSubmission: handleApproveMissionSubmission,
      onMarkNotificationAsRead: handleMarkNotificationAsRead,
    };

    switch (currentScreen) {
      case "login":
        return <LoginScreen {...props} />;
      case "cadastro":
        return <CadastroScreen {...props} />;
      case "feed":
        return <FeedScreen {...props} />;
      case "criar-publicacao":
        return <CriarPublicacaoScreen {...props} />;
      case "detalhes-publicacao":
        return <DetalhesPublicacaoScreen {...props} />;
      case "perfil":
        return <PerfilAlunoScreen {...props} />;
      case "missoes":
        return <ListaMissoesScreen {...props} />;
      case "detalhes-missao":
        return <DetalhesMissaoScreen {...props} />;
      case "ranking":
        return <RankingScreen {...props} />;
      case "professor":
        return <DashboardProfessorScreen {...props} />;
      case "notificacoes":
        return <CentralNotificacoesScreen {...props} />;
      default:
        return <FeedScreen {...props} />;
    }
  };

  // Full Screen Auth Views (No sidebar or standard frame)
  const isAuthScreen =
    currentScreen === "login" || currentScreen === "cadastro";

  return (
    <div className="min-h-screen bg-brand-bg font-sans antialiased text-brand-text-main flex flex-col transition-colors selection:bg-blue-100 selection:text-brand-primary">
      {/* Top Navbar Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-6 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-md shadow-blue-100">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-bold text-base tracking-tight text-brand-text-main hidden md:inline-block">
              Educatech
            </span>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden md:block" />

          {/* Breadcrumbs */}
          <span className="text-xs font-semibold text-brand-text-sub font-mono">
            {getBreadcrumb()}
          </span>
        </div>

        {/* Top switch button & controls */}
        <div className="flex items-center gap-3">
          {/* Role Changer Shortcut (Except inside auth) */}
          {/* Notifications Quick Access */}
          {!isAuthScreen && (
            <button
              onClick={() => navigate("notificacoes")}
              className="relative p-2 hover:bg-slate-50 rounded-xl text-brand-text-sub hover:text-brand-text-main transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-brand-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          )}

          {/* Mobile hamburger menu button */}
          {!isAuthScreen && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-slate-50 rounded-xl text-brand-text-main transition-colors lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </header>

      {(isBootstrapping || loadingMessage) && (
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-2 text-center text-xs font-semibold text-brand-primary">
          {loadingMessage || "Carregando sessão..."}
        </div>
      )}

      {globalError && !isAuthScreen && (
        <div className="bg-red-50 border-b border-red-100 px-6 py-2 text-center text-xs font-semibold text-brand-danger">
          {globalError}
        </div>
      )}

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col lg:flex-row relative max-w-7xl w-full mx-auto">
        {/* Left Sidebar Frame (Desktop only, hidden in Auth views) */}
        {!isAuthScreen && (
          <aside className="w-64 shrink-0 bg-white border-r border-slate-100 p-6 hidden lg:flex flex-col justify-between">
            <div className="space-y-6">
              {/* Quick user profile overview */}
              <div
                onClick={() => navigate("perfil")}
                className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-2xl cursor-pointer transition-colors group"
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  level={user.role === "student" ? user.level : undefined}
                  role={user.role}
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-brand-text-main truncate group-hover:text-brand-primary transition-colors">
                    {user.name}
                  </h4>
                  <p className="text-[10px] text-brand-text-sub truncate font-semibold">
                    {user.schoolClass}
                  </p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2.5 mb-2">
                  Menu Principal
                </span>

                <button
                  onClick={() => navigate("feed")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    currentScreen === "feed" ||
                    currentScreen === "criar-publicacao" ||
                    currentScreen === "detalhes-publicacao"
                      ? "bg-blue-50/50 text-brand-primary"
                      : "text-brand-text-sub hover:bg-slate-50 hover:text-brand-text-main"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Feed Educatech</span>
                </button>

                <button
                  onClick={() => navigate("missoes")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    currentScreen === "missoes" ||
                    currentScreen === "detalhes-missao"
                      ? "bg-blue-50/50 text-brand-primary"
                      : "text-brand-text-sub hover:bg-slate-50 hover:text-brand-text-main"
                  }`}
                >
                  <Brain className="w-4 h-4" />
                  <span>Missões Acadêmicas</span>
                </button>

                <button
                  onClick={() => navigate("ranking")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    currentScreen === "ranking"
                      ? "bg-blue-50/50 text-brand-primary"
                      : "text-brand-text-sub hover:bg-slate-50 hover:text-brand-text-main"
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  <span>Ranking Geral</span>
                </button>

                <button
                  onClick={() => navigate("notificacoes")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    currentScreen === "notificacoes"
                      ? "bg-blue-50/50 text-brand-primary"
                      : "text-brand-text-sub hover:bg-slate-50 hover:text-brand-text-main"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span className="flex-1 text-left">Notificações</span>
                  {unreadNotificationsCount > 0 && (
                    <Badge
                      variant="primary"
                      className="px-2 py-0.5 text-[10px]"
                    >
                      {unreadNotificationsCount}
                    </Badge>
                  )}
                </button>

                <button
                  onClick={() => navigate("perfil")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    currentScreen === "perfil"
                      ? "bg-blue-50/50 text-brand-primary"
                      : "text-brand-text-sub hover:bg-slate-50 hover:text-brand-text-main"
                  }`}
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Meu Perfil</span>
                </button>

                {user.role === "teacher" && (
                  <button
                    onClick={() => navigate("professor")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      currentScreen === "professor"
                        ? "bg-amber-50 text-amber-700 border-l-2 border-brand-secondary"
                        : "text-brand-text-sub hover:bg-slate-50 hover:text-brand-text-main"
                    }`}
                  >
                    <Users className="w-4 h-4 text-amber-500" />
                    <span>Painel do Professor</span>
                  </button>
                )}
              </nav>
            </div>

            {/* Logout/Leave button */}
            <div className="border-t border-slate-100 pt-4 space-y-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-brand-danger hover:bg-red-50/50 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Desconectar</span>
              </button>
            </div>
          </aside>
        )}

        {/* Mobile Sidebar Menu Drawer (Slide-in) */}
        <AnimatePresence>
          {mobileMenuOpen && !isAuthScreen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 p-6 flex flex-col justify-between lg:hidden shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-primary" />
                    <span className="font-bold text-xs">Menu Escolar</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-brand-text-sub"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-2xl">
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    level={user.role === "student" ? user.level : undefined}
                    role={user.role}
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-brand-text-main truncate">
                      {user.name}
                    </h4>
                    <p className="text-[10px] text-brand-text-sub truncate">
                      {user.schoolClass}
                    </p>
                  </div>
                </div>

                <nav className="space-y-1">
                  <button
                    onClick={() => navigate("feed")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                      currentScreen === "feed"
                        ? "bg-blue-50/50 text-brand-primary"
                        : "text-brand-text-sub"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Feed Educatech</span>
                  </button>

                  <button
                    onClick={() => navigate("missoes")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                      currentScreen === "missoes"
                        ? "bg-blue-50/50 text-brand-primary"
                        : "text-brand-text-sub"
                    }`}
                  >
                    <Brain className="w-4 h-4" />
                    <span>Missões Acadêmicas</span>
                  </button>

                  <button
                    onClick={() => navigate("ranking")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                      currentScreen === "ranking"
                        ? "bg-blue-50/50 text-brand-primary"
                        : "text-brand-text-sub"
                    }`}
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Ranking Geral</span>
                  </button>

                  <button
                    onClick={() => navigate("notificacoes")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                      currentScreen === "notificacoes"
                        ? "bg-blue-50/50 text-brand-primary"
                        : "text-brand-text-sub"
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                    <span className="flex-1 text-left">Notificações</span>
                    {unreadNotificationsCount > 0 && (
                      <Badge
                        variant="primary"
                        className="px-2 py-0.5 text-[10px]"
                      >
                        {unreadNotificationsCount}
                      </Badge>
                    )}
                  </button>

                  <button
                    onClick={() => navigate("perfil")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                      currentScreen === "perfil"
                        ? "bg-blue-50/50 text-brand-primary"
                        : "text-brand-text-sub"
                    }`}
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Meu Perfil</span>
                  </button>

                  <button
                    onClick={() => navigate("professor")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                      currentScreen === "professor"
                        ? "bg-amber-50 text-amber-700"
                        : "text-brand-text-sub"
                    }`}
                  >
                    <Users className="w-4 h-4 text-amber-500" />
                    <span>Painel do Professor</span>
                  </button>
                </nav>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-brand-danger hover:bg-red-50/50 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Desconectar</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Container (Grid / Central work area) */}
        <main
          className={`flex-1 p-6 md:p-8 overflow-x-hidden ${isAuthScreen ? "max-w-xl mx-auto w-full" : ""}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderActiveScreen()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom Navigation (Mobile devices only, hidden in Auth view) */}
      {!isAuthScreen && (
        <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 px-4 py-2.5 flex items-center justify-around lg:hidden z-30 shadow-md">
          <button
            onClick={() => navigate("feed")}
            className={`flex flex-col items-center gap-0.5 text-xs font-semibold cursor-pointer ${
              currentScreen === "feed" ||
              currentScreen === "criar-publicacao" ||
              currentScreen === "detalhes-publicacao"
                ? "text-brand-primary"
                : "text-brand-text-sub"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px]">Feed</span>
          </button>

          <button
            onClick={() => navigate("missoes")}
            className={`flex flex-col items-center gap-0.5 text-xs font-semibold cursor-pointer ${
              currentScreen === "missoes" || currentScreen === "detalhes-missao"
                ? "text-brand-primary"
                : "text-brand-text-sub"
            }`}
          >
            <Brain className="w-5 h-5" />
            <span className="text-[10px]">Missões</span>
          </button>

          <button
            onClick={() => navigate("ranking")}
            className={`flex flex-col items-center gap-0.5 text-xs font-semibold cursor-pointer ${
              currentScreen === "ranking"
                ? "text-brand-primary"
                : "text-brand-text-sub"
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[10px]">Ranking</span>
          </button>

          <button
            onClick={() => navigate("professor")}
            className={`flex flex-col items-center gap-0.5 text-xs font-semibold cursor-pointer ${
              currentScreen === "professor"
                ? "text-amber-500"
                : "text-brand-text-sub"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px]">Docente</span>
          </button>

          <button
            onClick={() => navigate("perfil")}
            className={`flex flex-col items-center gap-0.5 text-xs font-semibold cursor-pointer ${
              currentScreen === "perfil"
                ? "text-brand-primary"
                : "text-brand-text-sub"
            }`}
          >
            <UserIcon className="w-5 h-5" />
            <span className="text-[10px]">Perfil</span>
          </button>
        </nav>
      )}

      {/* Global Toast Alerts */}
      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />

      {/* Padding adjustment for mobile navigation rail */}
      {!isAuthScreen && <div className="h-16 lg:hidden" />}
    </div>
  );
}
