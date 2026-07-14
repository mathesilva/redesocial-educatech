import type { Disciplina, Prisma, RespostaMissao, Usuario } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";
import type {
  CriarMissaoRepositoryDto,
  CriarRespostaMissaoRepositoryDto,
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

export class MissionsRepository {
  protected readonly prisma = prisma;

  public async criar(dados: CriarMissaoRepositoryDto): Promise<MissaoComRelacoes> {
    return this.prisma.missao.create({
      data: dados,
      include: missaoInclude,
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

  public async criarResposta(dados: CriarRespostaMissaoRepositoryDto): Promise<RespostaMissao> {
    return this.prisma.respostaMissao.create({
      data: {
        resposta: dados.resposta,
        imagemUrl: dados.imagemUrl ?? null,
        alunoId: dados.alunoId,
        missaoId: dados.missaoId,
        status: "ENVIADA",
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

  private criarWhereListagem(filtros: ListarMissoesDto): Prisma.MissaoWhereInput {
    const where: Prisma.MissaoWhereInput = {};

    if (filtros.disciplinaId) {
      where.disciplinaId = filtros.disciplinaId;
    }

    return where;
  }
}
