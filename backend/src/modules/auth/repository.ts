import type { Usuario } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";

export class AuthRepository {
  protected readonly prisma = prisma;

  public async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  public async buscarPorId(id: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }
}
