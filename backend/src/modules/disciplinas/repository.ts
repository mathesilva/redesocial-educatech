import type { Disciplina } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";
import type { CriarDisciplinaDto } from "./dto.js";

export class DisciplinasRepository {
  protected readonly prisma = prisma;

  public async buscarPorId(id: string): Promise<Disciplina | null> {
    return this.prisma.disciplina.findUnique({
      where: { id },
    });
  }

  public async buscarPorNome(nome: string): Promise<Disciplina | null> {
    return this.prisma.disciplina.findUnique({
      where: { nome },
    });
  }

  public async listar(pagina: number, limite: number): Promise<Disciplina[]> {
    return this.prisma.disciplina.findMany({
      orderBy: {
        nome: "asc",
      },
      skip: (pagina - 1) * limite,
      take: limite,
    });
  }

  public async criar(dados: CriarDisciplinaDto): Promise<Disciplina> {
    return this.prisma.disciplina.create({
      data: dados,
    });
  }

  public async contar(): Promise<number> {
    return this.prisma.disciplina.count();
  }
}
