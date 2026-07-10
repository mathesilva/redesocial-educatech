import type { Publicacao, Reacao } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";

export class ReactionsRepository {
  protected readonly prisma = prisma;

  public async buscarPublicacaoPorId(id: string): Promise<Publicacao | null> {
    return this.prisma.publicacao.findUnique({
      where: { id },
    });
  }

  public async buscarPorUsuarioEPublicacao(
    usuarioId: string,
    publicacaoId: string,
  ): Promise<Reacao | null> {
    return this.prisma.reacao.findUnique({
      where: {
        usuarioId_publicacaoId: {
          usuarioId,
          publicacaoId,
        },
      },
    });
  }

  public async criarCurtida(usuarioId: string, publicacaoId: string): Promise<Publicacao> {
    const [, publicacao] = await this.prisma.$transaction([
      this.prisma.reacao.create({
        data: {
          usuarioId,
          publicacaoId,
          tipo: "CURTIDA",
        },
      }),
      this.prisma.publicacao.update({
        where: { id: publicacaoId },
        data: {
          quantidadeCurtidas: {
            increment: 1,
          },
        },
      }),
    ]);

    return publicacao;
  }

  public async removerCurtida(usuarioId: string, publicacaoId: string): Promise<Publicacao> {
    const [, publicacao] = await this.prisma.$transaction([
      this.prisma.reacao.delete({
        where: {
          usuarioId_publicacaoId: {
            usuarioId,
            publicacaoId,
          },
        },
      }),
      this.prisma.publicacao.update({
        where: { id: publicacaoId },
        data: {
          quantidadeCurtidas: {
            decrement: 1,
          },
        },
      }),
    ]);

    return publicacao;
  }

  public async obterResumo(
    usuarioId: string,
    publicacaoId: string,
  ): Promise<{ quantidadeCurtidas: number; usuarioCurtiu: boolean }> {
    const [publicacao, reacao] = await this.prisma.$transaction([
      this.prisma.publicacao.findUniqueOrThrow({
        where: { id: publicacaoId },
        select: {
          quantidadeCurtidas: true,
        },
      }),
      this.prisma.reacao.findUnique({
        where: {
          usuarioId_publicacaoId: {
            usuarioId,
            publicacaoId,
          },
        },
      }),
    ]);

    return {
      quantidadeCurtidas: publicacao.quantidadeCurtidas,
      usuarioCurtiu: Boolean(reacao),
    };
  }
}
