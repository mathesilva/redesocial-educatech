import type { Disciplina, Prisma, Usuario } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";
import type { BuscarUsuariosDto, CriarUsuarioDto } from "./dto.js";

const usuarioBuscaSelect = {
  id: true,
  nomeCompleto: true,
  fotoPerfil: true,
  perfil: true,
  turma: true,
  disciplina: {
    select: {
      id: true,
      nome: true,
    },
  },
} satisfies Prisma.UsuarioSelect;

export type UsuarioBusca = Prisma.UsuarioGetPayload<{
  select: typeof usuarioBuscaSelect;
}>;

const respostaPontuacaoSelect = {
  alunoId: true,
  nota: true,
  missao: {
    select: {
      pontuacao: true,
    },
  },
} satisfies Prisma.RespostaMissaoSelect;

export type RespostaPontuacao = Prisma.RespostaMissaoGetPayload<{
  select: typeof respostaPontuacaoSelect;
}>;

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

  public async buscarUsuarios(filtros: BuscarUsuariosDto): Promise<UsuarioBusca[]> {
    return this.prisma.usuario.findMany({
      where: this.criarWhereBusca(filtros.busca),
      select: usuarioBuscaSelect,
      orderBy: { nomeCompleto: "asc" },
      skip: (filtros.pagina - 1) * filtros.limite,
      take: filtros.limite,
    });
  }

  public async contarUsuarios(filtros: BuscarUsuariosDto): Promise<number> {
    return this.prisma.usuario.count({
      where: this.criarWhereBusca(filtros.busca),
    });
  }

  public async listarRespostasAvaliadas(): Promise<RespostaPontuacao[]> {
    return this.prisma.respostaMissao.findMany({
      where: { status: "AVALIADA" },
      select: respostaPontuacaoSelect,
    });
  }

  private criarWhereBusca(busca?: string): Prisma.UsuarioWhereInput {
    if (!busca) {
      return {};
    }

    return {
      nomeCompleto: {
        contains: busca,
        mode: "insensitive",
      },
    };
  }
}
