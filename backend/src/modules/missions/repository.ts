import type {
  Disciplina,
  Prisma,
  RespostaMissao,
  StatusRespostaMissao,
  TipoNotificacao,
  Usuario,
} from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";
import type {
  AtualizarMissaoRepositoryDto,
  AvaliarRespostaMissaoRepositoryDto,
  CriarMissaoRepositoryDto,
  CriarRespostaMissaoRepositoryDto,
  EnviarRespostaMissaoRepositoryDto,
  IniciarRespostaMissaoRepositoryDto,
  ListarMissoesDto,
} from "./dto.js";

const missaoInclude = {
  professor: {
    select: {
      id: true,
      nomeCompleto: true,
      perfil: true,
    },
  },
  disciplina: {
    select: {
      id: true,
      nome: true,
    },
  },
} satisfies Prisma.MissaoInclude;

export type MissaoComRelacoes = Prisma.MissaoGetPayload<{
  include: typeof missaoInclude;
}>;

const respostaMissaoAlunoInclude = {
  aluno: {
    select: {
      id: true,
      nomeCompleto: true,
      email: true,
      turma: true,
    },
  },
} satisfies Prisma.RespostaMissaoInclude;

export type RespostaMissaoComAluno = Prisma.RespostaMissaoGetPayload<{
  include: typeof respostaMissaoAlunoInclude;
}>;

export class MissionsRepository {
  protected readonly prisma = prisma;

  public async criarComNotificacoes(
    dados: CriarMissaoRepositoryDto,
  ): Promise<MissaoComRelacoes> {
    return this.prisma.$transaction(async (tx) => {
      const missao = await tx.missao.create({
        data: dados,
        include: missaoInclude,
      });

      const alunos = await tx.usuario.findMany({
        where: { perfil: "ALUNO" },
        select: { id: true },
      });

      if (alunos.length > 0) {
        await tx.notificacao.createMany({
          data: alunos.map((aluno) => ({
            usuarioId: aluno.id,
            missaoId: missao.id,
            titulo: "Novo desafio disponível",
            mensagem: `O professor publicou um novo desafio: ${missao.titulo}. Acesse a área de Missões Acadêmicas para participar.`,
            tipo: "MISSAO" as const,
          })),
        });
      }

      return missao;
    });
  }

  public async buscarPorId(id: string): Promise<MissaoComRelacoes | null> {
    return this.prisma.missao.findUnique({
      where: { id },
      include: missaoInclude,
    });
  }

  public async buscarRespostaPorAlunoEMissao(
    alunoId: string,
    missaoId: string,
  ): Promise<RespostaMissao | null> {
    return this.prisma.respostaMissao.findUnique({
      where: {
        alunoId_missaoId: {
          alunoId,
          missaoId,
        },
      },
    });
  }

  public async buscarRespostaPorId(id: string): Promise<RespostaMissao | null> {
    return this.prisma.respostaMissao.findUnique({
      where: { id },
    });
  }

  public async iniciarResposta(dados: IniciarRespostaMissaoRepositoryDto): Promise<RespostaMissao> {
    return this.prisma.respostaMissao.create({
      data: {
        alunoId: dados.alunoId,
        missaoId: dados.missaoId,
        status: "INICIADA",
      },
    });
  }

  public async criarResposta(dados: CriarRespostaMissaoRepositoryDto): Promise<RespostaMissao> {
    return this.prisma.respostaMissao.create({
      data: {
        resposta: dados.resposta,
        imagemUrl: dados.imagemUrl ?? null,
        alunoId: dados.alunoId,
        missaoId: dados.missaoId,
        status: "ENVIADA",
        dataEnvio: new Date(),
      },
    });
  }

  public async enviarResposta(
    id: string,
    dados: EnviarRespostaMissaoRepositoryDto,
  ): Promise<RespostaMissao> {
    return this.prisma.respostaMissao.update({
      where: { id },
      data: {
        resposta: dados.resposta,
        imagemUrl: dados.imagemUrl ?? null,
        status: "ENVIADA",
        dataEnvio: new Date(),
      },
    });
  }

  public async avaliarResposta(
    id: string,
    dados: AvaliarRespostaMissaoRepositoryDto,
    notificacao?: {
      usuarioId: string;
      missaoId: string;
      titulo: string;
      mensagem: string;
      tipo: TipoNotificacao;
    },
  ): Promise<RespostaMissao> {
    return this.prisma.$transaction(async (tx) => {
      const respostaAvaliada = await tx.respostaMissao.update({
        where: { id },
        data: {
          nota: dados.nota,
          feedbackProfessor: dados.feedbackProfessor ?? null,
          status: "AVALIADA",
        },
      });

      if (notificacao) {
        await tx.notificacao.create({ data: notificacao });
      }

      return respostaAvaliada;
    });
  }

  public async listarRespostasPorMissao(missaoId: string): Promise<RespostaMissaoComAluno[]> {
    return this.prisma.respostaMissao.findMany({
      where: {
        missaoId,
        status: { in: ["ENVIADA", "AVALIADA"] },
      },
      include: respostaMissaoAlunoInclude,
      orderBy: {
        dataEnvio: "asc",
      },
    });
  }

  public async listar(filtros: ListarMissoesDto): Promise<MissaoComRelacoes[]> {
    return this.prisma.missao.findMany({
      where: this.criarWhereListagem(filtros),
      include: missaoInclude,
      orderBy: {
        prazo: "asc",
      },
      skip: (filtros.pagina - 1) * filtros.limite,
      take: filtros.limite,
    });
  }

  public async contar(filtros: ListarMissoesDto): Promise<number> {
    return this.prisma.missao.count({
      where: this.criarWhereListagem(filtros),
    });
  }

  public async buscarDisciplinaPorId(id: string): Promise<Disciplina | null> {
    return this.prisma.disciplina.findUnique({
      where: { id },
    });
  }

  public async buscarProfessorPorId(id: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  public async listarPorProfessor(
    professorId: string,
    filtros: { pagina: number; limite: number },
  ): Promise<MissaoComRelacoes[]> {
    return this.prisma.missao.findMany({
      where: { professorId },
      include: missaoInclude,
      orderBy: { dataCriacao: "desc" },
      skip: (filtros.pagina - 1) * filtros.limite,
      take: filtros.limite,
    });
  }

  public async contarPorProfessor(professorId: string): Promise<number> {
    return this.prisma.missao.count({ where: { professorId } });
  }

  public async contarRespostasPorMissoes(
    missaoIds: string[],
  ): Promise<{ missaoId: string; status: StatusRespostaMissao; quantidade: number }[]> {
    if (missaoIds.length === 0) {
      return [];
    }

    const grupos = await this.prisma.respostaMissao.groupBy({
      by: ["missaoId", "status"],
      where: { missaoId: { in: missaoIds } },
      _count: { _all: true },
    });

    return grupos.map((grupo) => ({
      missaoId: grupo.missaoId,
      status: grupo.status,
      quantidade: grupo._count._all,
    }));
  }

  public async contarRespostasDaMissao(missaoId: string): Promise<number> {
    return this.prisma.respostaMissao.count({ where: { missaoId } });
  }

  public async atualizar(
    id: string,
    dados: AtualizarMissaoRepositoryDto,
  ): Promise<MissaoComRelacoes> {
    return this.prisma.missao.update({
      where: { id },
      data: dados,
      include: missaoInclude,
    });
  }

  public async excluir(id: string): Promise<void> {
    await this.prisma.missao.delete({ where: { id } });
  }

  private criarWhereListagem(filtros: ListarMissoesDto): Prisma.MissaoWhereInput {
    const where: Prisma.MissaoWhereInput = {};

    if (filtros.disciplinaId) {
      where.disciplinaId = filtros.disciplinaId;
    }

    return where;
  }
}
