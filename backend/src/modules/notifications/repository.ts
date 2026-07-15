import type { Notificacao } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";

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

  public async marcarComoLida(id: string): Promise<Notificacao> {
    return this.prisma.notificacao.update({
      where: { id },
      data: {
        lida: true,
      },
    });
  }
}
