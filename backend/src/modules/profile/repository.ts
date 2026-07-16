import type { Prisma } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";

const usuarioPerfilSelect = {
  id: true,
  nomeCompleto: true,
  email: true,
  fotoPerfil: true,
  escola: true,
  turma: true,
} satisfies Prisma.UsuarioSelect;

const usuarioPerfilPublicoSelect = {
  id: true,
  nomeCompleto: true,
  fotoPerfil: true,
  perfil: true,
  turma: true,
  dataCriacao: true,
  disciplina: {
    select: {
      id: true,
      nome: true,
    },
  },
} satisfies Prisma.UsuarioSelect;

const publicacaoPerfilSelect = {
  id: true,
  titulo: true,
  descricao: true,
  imagemUrl: true,
  status: true,
  quantidadeComentarios: true,
  quantidadeCurtidas: true,
  dataCriacao: true,
} satisfies Prisma.PublicacaoSelect;

const respostaPontuacaoSelect = {
  alunoId: true,
  nota: true,
  missao: {
    select: {
      pontuacao: true,
    },
  },
} satisfies Prisma.RespostaMissaoSelect;

export type UsuarioPerfil = Prisma.UsuarioGetPayload<{
  select: typeof usuarioPerfilSelect;
}>;

export type UsuarioPerfilPublico = Prisma.UsuarioGetPayload<{
  select: typeof usuarioPerfilPublicoSelect;
}>;

export type PublicacaoPerfil = Prisma.PublicacaoGetPayload<{
  select: typeof publicacaoPerfilSelect;
}>;

export type RespostaPontuacao = Prisma.RespostaMissaoGetPayload<{
  select: typeof respostaPontuacaoSelect;
}>;

export class ProfileRepository {
  protected readonly prisma = prisma;

  public async buscarUsuarioPorId(id: string): Promise<UsuarioPerfil | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: usuarioPerfilSelect,
    });
  }

  public async buscarUsuarioPublicoPorId(id: string): Promise<UsuarioPerfilPublico | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: usuarioPerfilPublicoSelect,
    });
  }

  public async listarRespostasAvaliadas(): Promise<RespostaPontuacao[]> {
    return this.prisma.respostaMissao.findMany({
      where: {
        status: "AVALIADA",
      },
      select: respostaPontuacaoSelect,
    });
  }

  public async contarPublicacoes(usuarioId: string): Promise<number> {
    return this.prisma.publicacao.count({
      where: { usuarioId },
    });
  }

  public async contarComentarios(usuarioId: string): Promise<number> {
    return this.prisma.comentario.count({
      where: { usuarioId },
    });
  }

  public async somarCurtidasRecebidas(usuarioId: string): Promise<number> {
    const resultado = await this.prisma.publicacao.aggregate({
      where: { usuarioId },
      _sum: {
        quantidadeCurtidas: true,
      },
    });

    return resultado._sum.quantidadeCurtidas ?? 0;
  }

  public async contarMissoesRespondidas(alunoId: string): Promise<number> {
    return this.prisma.respostaMissao.count({
      where: { alunoId },
    });
  }

  public async contarMissoesAvaliadas(alunoId: string): Promise<number> {
    return this.prisma.respostaMissao.count({
      where: {
        alunoId,
        status: "AVALIADA",
      },
    });
  }

  public async calcularMediaNotas(alunoId: string): Promise<number | null> {
    const resultado = await this.prisma.respostaMissao.aggregate({
      where: {
        alunoId,
        status: "AVALIADA",
      },
      _avg: {
        nota: true,
      },
    });

    return resultado._avg.nota;
  }

  public async listarPublicacoesRecentes(usuarioId: string): Promise<PublicacaoPerfil[]> {
    return this.prisma.publicacao.findMany({
      where: { usuarioId },
      select: publicacaoPerfilSelect,
      orderBy: {
        dataCriacao: "desc",
      },
      take: 5,
    });
  }

  public async listarPublicacoesPublicasRecentes(usuarioId: string): Promise<PublicacaoPerfil[]> {
    return this.prisma.publicacao.findMany({
      where: { usuarioId, status: "APROVADA" },
      select: publicacaoPerfilSelect,
      orderBy: {
        dataCriacao: "desc",
      },
      take: 5,
    });
  }
}
