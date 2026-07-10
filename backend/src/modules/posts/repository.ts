import type { Disciplina, Prisma } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";
import type { CriarPublicacaoRepositoryDto, ListarPublicacoesDto } from "./dto.js";

const publicacaoInclude = {
  usuario: {
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
} satisfies Prisma.PublicacaoInclude;

export type PublicacaoComRelacoes = Prisma.PublicacaoGetPayload<{
  include: typeof publicacaoInclude;
}>;

export class PostsRepository {
  protected readonly prisma = prisma;

  public async criar(dados: CriarPublicacaoRepositoryDto): Promise<PublicacaoComRelacoes> {
    return this.prisma.publicacao.create({
      data: dados,
      include: publicacaoInclude,
    });
  }

  public async buscarPorId(id: string): Promise<PublicacaoComRelacoes | null> {
    return this.prisma.publicacao.findUnique({
      where: { id },
      include: publicacaoInclude,
    });
  }

  public async listar(filtros: ListarPublicacoesDto): Promise<PublicacaoComRelacoes[]> {
    return this.prisma.publicacao.findMany({
      where: this.criarWhereListagem(filtros),
      include: publicacaoInclude,
      orderBy: {
        dataCriacao: "desc",
      },
      skip: (filtros.pagina - 1) * filtros.limite,
      take: filtros.limite,
    });
  }

  public async contar(filtros: ListarPublicacoesDto): Promise<number> {
    return this.prisma.publicacao.count({
      where: this.criarWhereListagem(filtros),
    });
  }

  public async buscarDisciplinaPorId(id: string): Promise<Disciplina | null> {
    return this.prisma.disciplina.findUnique({
      where: { id },
    });
  }

  private criarWhereListagem(filtros: ListarPublicacoesDto): Prisma.PublicacaoWhereInput {
    const where: Prisma.PublicacaoWhereInput = {
      status: "APROVADA",
    };

    if (filtros.disciplinaId) {
      where.disciplinaId = filtros.disciplinaId;
    }

    return where;
  }
}
