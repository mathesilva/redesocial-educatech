/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  UserProfile,
  Badge,
  Post,
  Mission,
  NotificationItem,
  RankingEntry,
  MissionSubmission,
} from "./types";

export const INITIAL_BADGES: Badge[] = [
  {
    id: "badge-1",
    title: "Cérebro de Ferro",
    description: "Completou a primeira missão de exatas com pontuação máxima.",
    icon: "Brain",
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    unlockedAt: "2026-07-08T14:30:00Z",
  },
  {
    id: "badge-2",
    title: "Historiador Júnior",
    description:
      "Teve uma publicação sobre História elogiada por um professor.",
    icon: "BookOpen",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    unlockedAt: "2026-07-09T10:15:00Z",
  },
  {
    id: "badge-3",
    title: "Perguntador Nato",
    description: "Postou mais de 5 dúvidas produtivas no feed Educatech.",
    icon: "MessageSquare",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    id: "badge-4",
    title: "Mestre da Química",
    description: "Concluiu todos os desafios de Química Orgânica do nível 1.",
    icon: "Atom",
    color: "bg-rose-100 text-rose-700 border-rose-200",
  },
  {
    id: "badge-5",
    title: "Líder do Ranking",
    description:
      "Ficou no Top 3 do ranking semanal de XP por 2 semanas seguidas.",
    icon: "Award",
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
];

export const INITIAL_USER: UserProfile = {
  id: "user-me",
  name: "Thiago Alencar",
  email: "thiago.alencar@escola.com",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "student",
  level: 5,
  xp: 1420,
  xpNextLevel: 2500,
  points: 340,
  bio: "Estudante do 2º ano do Ensino Médio. Entusiasta de Física, Astronomia e Programação. Sempre buscando aprender coisas novas através da tecnologia! 🚀",
  schoolClass: "2º Ano A - Matutino",
  badges: [INITIAL_BADGES[0], INITIAL_BADGES[1]],
  completedMissionsCount: 6,
};

export const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    author: {
      id: "prof-lucas",
      name: "Prof. Lucas Rocha",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      role: "teacher",
      schoolClass: "Física - Ensino Médio",
    },
    title: "Resumo Ilustrado: As Três Leis de Newton 🍎",
    content:
      "Olá pessoal! Preparei este material interativo resumindo as Três Leis de Newton com exemplos práticos do cotidiano. Lembrem-se:\n\n1. **Inércia:** Um corpo tende a permanecer em repouso ou em MRU a menos que uma força atue sobre ele.\n2. **F = m.a:** A aceleração é diretamente proporcional à força resultante e inversamente proporcional à massa.\n3. **Ação e Reação:** Para toda ação há uma reação de mesma intensidade e direção, mas em sentido oposto.\n\nEspero que ajude nos estudos para o simulado da próxima semana! Deixem suas dúvidas aqui nos comentários.",
    subject: "Física",
    likesCount: 18,
    likedByMe: true,
    createdAt: "2026-07-10T07:15:00-07:00",
    attachments: [
      { name: "Leis_de_Newton_Infografico.pdf", size: "2.4 MB", type: "pdf" },
      {
        name: "Lista_Exercicios_Inercia.docx",
        size: "420 KB",
        type: "document",
      },
    ],
    comments: [
      {
        id: "comment-1-1",
        authorId: "user-beatriz",
        authorName: "Beatriz Silveira",
        authorAvatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        authorRole: "student",
        content:
          "Nossa professor, que infográfico incrível! Ajudou muito a clarear o conceito da terceira lei, eu sempre confundia onde as forças eram aplicadas.",
        createdAt: "2026-07-10T07:45:00-07:00",
      },
      {
        id: "comment-1-2",
        authorId: "prof-lucas",
        authorName: "Prof. Lucas Rocha",
        authorAvatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        authorRole: "teacher",
        content:
          "Que excelente, Beatriz! Lembre-se sempre de que as forças de ação e reação atuam em corpos diferentes, por isso elas nunca se anulam!",
        createdAt: "2026-07-10T08:00:00-07:00",
      },
    ],
  },
  {
    id: "post-2",
    author: {
      id: "user-joao",
      name: "João Lima",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      role: "student",
      schoolClass: "2º Ano B",
    },
    title: "Quem aí entende de Trigonometria? Socorro! 📐",
    content:
      "Alguém teria um macete ou tabela para decorar os valores de Seno, Cosseno e Tangente dos ângulos notáveis (30º, 45º e 60º)? Tenho prova amanhã de geometria e estou me batendo inteiro para memorizar. Se puderem mandar uma dica ou foto de um resumo eu agradeço muito!",
    subject: "Matemática",
    likesCount: 8,
    likedByMe: false,
    createdAt: "2026-07-09T18:30:00-07:00",
    comments: [
      {
        id: "comment-2-1",
        authorId: "user-me",
        authorName: "Thiago Alencar",
        authorAvatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        authorRole: "student",
        content:
          'João, tem aquela musiquinha clássica no ritmo do Jingle Bells! "Um, dois, três... três, dois, um... tudo sobre dois... a raiz vai no três e também no dois..." Procura no YouTube, juro que salva vidas, decorei em 5 minutos kkkk',
        createdAt: "2026-07-09T19:02:00-07:00",
      },
      {
        id: "comment-2-2",
        authorId: "prof-claudia",
        authorName: "Prof. Cláudia Cruz",
        authorAvatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        authorRole: "teacher",
        content:
          "Excelente dica do Thiago! A música realmente ajuda na memorização rápida. Também postei uma tabela dinâmica no meu perfil na semana passada, vale a pena dar uma olhada, João.",
        createdAt: "2026-07-09T20:10:00-07:00",
      },
    ],
  },
  {
    id: "post-3",
    author: {
      id: "prof-sofia",
      name: "Prof. Sofia Mendes",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      role: "teacher",
      schoolClass: "História - Ensino Médio",
    },
    title: "Tour Virtual 3D por Roma Antiga: O Coliseu e o Fórum Romano 🏛️",
    content:
      "Queridos alunos, nossa aula sobre o Império Romano será na sexta-feira. Mas para aquecer os motores, deixo aqui este link incrível para um tour virtual em 360 graus pelas ruínas do Coliseu e pela reconstrução digital do Fórum Romano.\n\nQuero que vocês visitem e escolham um detalhe arquitetônico ou monumento específico para discutirmos no início da aula. Anotem suas percepções!",
    subject: "História",
    likesCount: 25,
    likedByMe: false,
    createdAt: "2026-07-09T14:10:00-07:00",
    attachments: [
      { name: "Guia_Visita_Virtual_Roma.pdf", size: "1.2 MB", type: "pdf" },
    ],
    comments: [],
  },
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: "mission-1",
    title: "Desbravador de Funções",
    description:
      "Resolva exercícios fundamentais de funções de primeiro e segundo grau e domine o cálculo de raízes e coordenadas do vértice.",
    subject: "Matemática",
    xpReward: 150,
    pointsReward: 30,
    difficulty: "Médio",
    status: "Disponível",
    instructions:
      "Responda as questões de múltipla escolha com atenção. Você receberá 150 XP e 30 moedas se acertar todas!",
    unlockedBadge: {
      id: "badge-algebra",
      title: "Mestre Algébrico",
      description: "Acertou 100% de uma missão de Álgebra e funções.",
      icon: "Percent",
      color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    },
    questions: [
      {
        id: "q1-1",
        question:
          "Dada a função f(x) = 3x - 9, qual é o valor da raiz (ou zero) dessa função?",
        options: ["x = 0", "x = 3", "x = -3", "x = 9"],
        correctOptionIndex: 1,
      },
      {
        id: "q1-2",
        question:
          "Qual é o formato do gráfico de uma função polinomial do 2º grau (quadrática)?",
        options: [
          "Uma reta ascendente",
          "Uma elipse perfeita",
          "Uma parábola",
          "Uma curva senoidal",
        ],
        correctOptionIndex: 2,
      },
      {
        id: "q1-3",
        question:
          "Se f(x) = x² - 4x + 3, quais são os pontos onde a curva corta o eixo x (raízes)?",
        options: [
          "x = 1 e x = 3",
          "x = -1 e x = -3",
          "x = 0 e x = 4",
          "x = 2 e x = 3",
        ],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    id: "mission-2",
    title: "Fisiologia Humana: Impulso Nervoso",
    description:
      "Explore o fascinante funcionamento dos neurônios, sinapses e como os estímulos elétricos viajam pelo nosso corpo.",
    subject: "Ciências",
    xpReward: 200,
    pointsReward: 40,
    difficulty: "Difícil",
    status: "Em Andamento",
    instructions:
      "Esta missão de biologia se concentra no sistema nervoso central e periférico. Responda corretamente para ganhar 200 XP.",
    questions: [
      {
        id: "q2-1",
        question:
          "Qual é a estrutura do neurônio responsável por receber a maioria dos estímulos vindos de outras células?",
        options: [
          "O axônio",
          "Os dendritos",
          "A bainha de mielina",
          "O corpo celular",
        ],
        correctOptionIndex: 1,
      },
      {
        id: "q2-2",
        question:
          "Como é chamado o espaço físico ou junção de comunicação onde os neurotransmissores são liberados entre dois neurônios?",
        options: [
          "Fenda Sináptica",
          "Nó de Ranvier",
          "Ponte de Varólio",
          "Canal de Sódio",
        ],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    id: "mission-3",
    title: "Introdução ao Método Científico",
    description:
      "Entenda os passos lógicos que cientistas utilizam para formular hipóteses, realizar experimentos e tirar conclusões.",
    subject: "Ciências",
    xpReward: 100,
    pointsReward: 20,
    difficulty: "Fácil",
    status: "Concluída",
    instructions:
      "Um quiz rápido sobre a estrutura da investigação científica. Excelente para iniciantes!",
    questions: [
      {
        id: "q3-1",
        question: "Qual é o primeiro passo clássico do Método Científico?",
        options: [
          "Realizar um experimento",
          "Elaborar uma teoria matemática",
          "Fazer uma observação e formular uma pergunta",
          "Publicar um artigo científico",
        ],
        correctOptionIndex: 2,
      },
    ],
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Seu comentário recebeu curtidas! 👍",
    content:
      "O Professor Lucas Rocha e outros 3 usuários curtiram seu comentário na publicação sobre as Leis de Newton.",
    type: "like",
    createdAt: "2026-07-10T08:12:00-07:00",
    read: false,
  },
  {
    id: "notif-2",
    title: "Nova missão disponível! 🚀",
    content:
      'A professora Sofia Mendes liberou uma nova missão: "A Queda do Império Romano". Participe e ganhe 180 XP.',
    type: "mission",
    createdAt: "2026-07-09T16:00:00-07:00",
    read: false,
  },
  {
    id: "notif-3",
    title: "Nova medalha desbloqueada! 🏆",
    content:
      'Parabéns! Você conquistou a insígnia "Historiador Júnior" por suas contribuições ativas nas discussões de humanas.',
    type: "badge",
    createdAt: "2026-07-09T10:15:00-07:00",
    read: true,
  },
  {
    id: "notif-4",
    title: "Feedback do Professor 📝",
    content:
      "A Professora Cláudia Cruz corrigiu sua resposta do exercício de Álgebra e deixou um comentário de incentivo.",
    type: "system",
    createdAt: "2026-07-08T11:40:00-07:00",
    read: true,
  },
];

export const INITIAL_RANKING: RankingEntry[] = [
  {
    id: "rank-1",
    name: "Beatriz Silveira",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    role: "student",
    xp: 3450,
    level: 8,
    rank: 1,
  },
  {
    id: "rank-2",
    name: "João Lima",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    role: "student",
    xp: 2900,
    level: 7,
    rank: 2,
  },
  {
    id: "user-me",
    name: "Thiago Alencar",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "student",
    xp: 1420,
    level: 5,
    rank: 3,
    isMe: true,
  },
  {
    id: "rank-4",
    name: "Mariana Costa",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    role: "student",
    xp: 1280,
    level: 5,
    rank: 4,
  },
  {
    id: "rank-5",
    name: "Pedro Henrique",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    role: "student",
    xp: 980,
    level: 4,
    rank: 5,
  },
];

export const INITIAL_SUBMISSIONS: MissionSubmission[] = [
  {
    id: "sub-1",
    studentName: "Beatriz Silveira",
    studentAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    missionTitle: "Desbravador de Funções",
    score: "3/3 (100%)",
    submittedAt: "2026-07-10T08:15:00-07:00",
    xpAwarded: 150,
    status: "Aprovado",
  },
  {
    id: "sub-2",
    studentName: "João Lima",
    studentAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    missionTitle: "Desbravador de Funções",
    score: "2/3 (66%)",
    submittedAt: "2026-07-10T07:30:00-07:00",
    xpAwarded: 100,
    status: "Aprovado",
  },
  {
    id: "sub-3",
    studentName: "Mariana Costa",
    studentAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    missionTitle: "Fisiologia Humana: Impulso Nervoso",
    score: "2/2 (100%)",
    submittedAt: "2026-07-10T08:30:00-07:00",
    xpAwarded: 200,
    status: "Pendente",
  },
];
