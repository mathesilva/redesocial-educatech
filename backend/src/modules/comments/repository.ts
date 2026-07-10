import type { Prisma, Publicacao } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";
import type { CriarComentarioRepositoryDto } from "./dto.js";

const comentarioInclude = {
  usuario: {
    select: {
      id: true,
      nomeCompleto: true,
      perfil: true,
    },
  },
} satisfies Prisma.ComentarioInclude;

export type ComentarioComAutor = Prisma.ComentarioGetPayload<{
  include: typeof comentarioInclude;
}>;

export class CommentsRepository {
  protected readonly prisma = prisma;

  public async buscarPublicacaoPorId(id: string): Promise<Publicacao | null> {
    return this.prisma.publicacao.findUnique({
      where: { id },
    });
  }

  public async criar(dados: CriarComentarioRepositoryDto): Promise<ComentarioComAutor> {
    const [comentario] = await this.prisma.$transaction([
      this.prisma.comentario.create({
        data: dados,
        include: comentarioInclude,
      }),
      this.prisma.publicacao.update({
        where: { id: dados.publicacaoId },
        data: {
          quantidadeComentarios: {
            increment: 1,
          },
        },
      }),
    ]);

    return comentario;
  }

  public async listarPorPublicacao(publicacaoId: string): Promise<ComentarioComAutor[]> {
    return this.prisma.comentario.findMany({
      where: { publicacaoId },
      include: comentarioInclude,
      orderBy: {
        dataCriacao: "asc",
      },
    });
  }
}
