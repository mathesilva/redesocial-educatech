import type { Disciplina, Usuario } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";
import type { CriarUsuarioDto } from "./dto.js";

export class UsersRepository {
  protected readonly prisma = prisma;

  public async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  public async buscarDisciplina(id: string): Promise<Disciplina | null> {
    return this.prisma.disciplina.findUnique({
      where: { id },
    });
  }

  public async criarUsuario(dados: CriarUsuarioDto): Promise<Usuario> {
    return this.prisma.usuario.create({
      data: dados,
    });
  }
}
