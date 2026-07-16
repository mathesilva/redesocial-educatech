import type { Notificacao, TipoNotificacao, Usuario } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";

export interface CriarNotificacaoRepositoryDto {
  usuarioId: string;
  titulo: string;
  mensagem: string;
  tipo: TipoNotificacao;
}

export interface AtualizarNotificacaoRepositoryDto {
  titulo?: string;
  mensagem?: string;
  tipo?: TipoNotificacao;
}

export class NotificationsRepository {
  protected readonly prisma = prisma;

  public async listarPorUsuario(usuarioId: string): Promise<Notificacao[]> {
    return this.prisma.notificacao.findMany({
      where: {
        usuarioId,
      },
      orderBy: {
        dataCriacao: "desc",
      },
    });
  }

  public async buscarPorId(id: string): Promise<Notificacao | null> {
    return this.prisma.notificacao.findUnique({
      where: { id },
    });
  }

  public async buscarUsuarioPorId(id: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  public async criar(dados: CriarNotificacaoRepositoryDto): Promise<Notificacao> {
    return this.prisma.notificacao.create({
      data: dados,
    });
  }

  public async atualizar(
    id: string,
    dados: AtualizarNotificacaoRepositoryDto,
  ): Promise<Notificacao> {
    return this.prisma.notificacao.update({
      where: { id },
      data: dados,
    });
  }

  public async excluir(id: string): Promise<void> {
    await this.prisma.notificacao.delete({
      where: { id },
    });
  }

  public async marcarComoLida(id: string): Promise<Notificacao> {
    return this.prisma.notificacao.update({
      where: { id },
      data: {
        lida: true,
      },
    });
  }
}
