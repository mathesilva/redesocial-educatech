import type { Prisma } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";

const professorDashboardSelect = {
  id: true,
  perfil: true,
  escola: true,
  disciplinaId: true,
} satisfies Prisma.UsuarioSelect;

const respostaRankingDashboardSelect = {
  nota: true,
  aluno: {
    select: {
      id: true,
      nomeCompleto: true,
    },
  },
  missao: {
    select: {
      pontuacao: true,
    },
  },
} satisfies Prisma.RespostaMissaoSelect;

const missaoDashboardSelect = {
  id: true,
  titulo: true,
  prazo: true,
  respostasMissao: {
    select: {
      status: true,
    },
  },
} satisfies Prisma.MissaoSelect;

export type ProfessorDashboard = Prisma.UsuarioGetPayload<{
  select: typeof professorDashboardSelect;
}>;

export type RespostaRankingDashboard = Prisma.RespostaMissaoGetPayload<{
  select: typeof respostaRankingDashboardSelect;
}>;

export type MissaoDashboard = Prisma.MissaoGetPayload<{
  select: typeof missaoDashboardSelect;
}>;

export class DashboardRepository {
  protected readonly prisma = prisma;

  public async buscarProfessorPorId(id: string): Promise<ProfessorDashboard | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: professorDashboardSelect,
    });
  }

  public async contarAlunosPorEscola(escola: string): Promise<number> {
    return this.prisma.usuario.count({
      where: {
        perfil: "ALUNO",
        escola,
      },
    });
  }

  public async contarPublicacoesPorDisciplina(disciplinaId: string | null): Promise<number> {
    return this.prisma.publicacao.count({
      where: this.criarWhereDisciplina(disciplinaId),
    });
  }

  public async contarPublicacoesPendentesPorDisciplina(
    disciplinaId: string | null,
  ): Promise<number> {
    return this.prisma.publicacao.count({
      where: {
        ...this.criarWhereDisciplina(disciplinaId),
        status: "PENDENTE",
      },
    });
  }

  public async contarMissoesPorProfessor(professorId: string): Promise<number> {
    return this.prisma.missao.count({
      where: {
        professorId,
      },
    });
  }

  public async contarMissoesAtivasPorProfessor(professorId: string): Promise<number> {
    return this.prisma.missao.count({
      where: {
        professorId,
        prazo: {
          gt: new Date(),
        },
      },
    });
  }

  public async listarRespostasAvaliadasRanking(
    disciplinaId: string | null,
  ): Promise<RespostaRankingDashboard[]> {
    const where: Prisma.RespostaMissaoWhereInput = {
      status: "AVALIADA",
    };

    if (disciplinaId) {
      where.missao = {
        disciplinaId,
      };
    }

    return this.prisma.respostaMissao.findMany({
      where,
      select: respostaRankingDashboardSelect,
    });
  }

  public async listarMissoesPorProfessor(professorId: string): Promise<MissaoDashboard[]> {
    return this.prisma.missao.findMany({
      where: {
        professorId,
      },
      select: missaoDashboardSelect,
      orderBy: {
        prazo: "asc",
      },
    });
  }

  private criarWhereDisciplina(disciplinaId: string | null): Prisma.PublicacaoWhereInput {
    if (!disciplinaId) {
      return {};
    }

    return { disciplinaId };
  }
}
