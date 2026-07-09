import bcrypt from "bcrypt";

import { ConflictError, NotFoundError } from "../../shared/errors/index.js";
import type { CadastrarUsuarioDto, UsuarioRespostaDto } from "./dto.js";
import { UsersRepository } from "./repository.js";

export class UsersService {
  public readonly repository = new UsersRepository();

  public async cadastrar(dados: CadastrarUsuarioDto): Promise<UsuarioRespostaDto> {
    const usuarioExistente = await this.repository.buscarPorEmail(dados.email);

    if (usuarioExistente) {
      throw new ConflictError("E-mail ja cadastrado.");
    }

    let turma: string | null = null;
    let disciplinaId: string | null = null;

    if (dados.perfil === "ALUNO") {
      turma = dados.turma ?? null;
    }

    if (dados.perfil === "PROFESSOR") {
      disciplinaId = dados.disciplinaId ?? null;
      const disciplina = disciplinaId
        ? await this.repository.buscarDisciplina(disciplinaId)
        : null;

      if (!disciplina) {
        throw new NotFoundError("Disciplina nao encontrada.");
      }
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const usuario = await this.repository.criarUsuario({
      nomeCompleto: dados.nomeCompleto,
      email: dados.email,
      senha: senhaHash,
      perfil: dados.perfil,
      escola: dados.escola,
      turma,
      disciplinaId,
    });

    return {
      id: usuario.id,
      nomeCompleto: usuario.nomeCompleto,
      email: usuario.email,
      fotoPerfil: usuario.fotoPerfil,
      perfil: usuario.perfil,
      escola: usuario.escola,
      turma: usuario.turma,
      disciplinaId: usuario.disciplinaId,
      pontuacao: usuario.pontuacao,
      nivel: usuario.nivel,
      dataCriacao: usuario.dataCriacao,
      dataAtualizacao: usuario.dataAtualizacao,
    };
  }
}
