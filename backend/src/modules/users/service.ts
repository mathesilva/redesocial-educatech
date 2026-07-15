import bcrypt from "bcrypt";

import { ConflictError, NotFoundError } from "../../shared/errors/index.js";
import type {
  BuscarUsuariosDto,
  BuscarUsuariosRespostaDto,
  CadastrarUsuarioDto,
  UsuarioBuscaDto,
  UsuarioRespostaDto,
} from "./dto.js";
import { UsersRepository } from "./repository.js";
import type { RespostaPontuacao, UsuarioBusca } from "./repository.js";

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

  public async buscar(filtros: BuscarUsuariosDto): Promise<BuscarUsuariosRespostaDto> {
    const [usuarios, total, respostasAvaliadas] = await Promise.all([
      this.repository.buscarUsuarios(filtros),
      this.repository.contarUsuarios(filtros),
      this.repository.listarRespostasAvaliadas(),
    ]);

    const pontuacaoPorAluno = this.calcularPontuacaoPorAluno(respostasAvaliadas);

    return {
      itens: usuarios.map((usuario) => this.mapearUsuarioBusca(usuario, pontuacaoPorAluno)),
      paginacao: {
        pagina: filtros.pagina,
        limite: filtros.limite,
        total,
        totalPaginas: Math.ceil(total / filtros.limite),
      },
    };
  }

  private calcularPontuacaoPorAluno(respostas: RespostaPontuacao[]): Map<string, number> {
    const pontuacaoPorAluno = new Map<string, number>();

    for (const resposta of respostas) {
      const pontuacaoResposta = (resposta.missao.pontuacao * (resposta.nota ?? 0)) / 100;
      const pontuacaoAtual = pontuacaoPorAluno.get(resposta.alunoId) ?? 0;

      pontuacaoPorAluno.set(resposta.alunoId, pontuacaoAtual + pontuacaoResposta);
    }

    return pontuacaoPorAluno;
  }

  private mapearUsuarioBusca(
    usuario: UsuarioBusca,
    pontuacaoPorAluno: Map<string, number>,
  ): UsuarioBuscaDto {
    const pontuacao = pontuacaoPorAluno.get(usuario.id) ?? 0;

    return {
      id: usuario.id,
      nomeCompleto: usuario.nomeCompleto,
      fotoPerfil: usuario.fotoPerfil,
      perfil: usuario.perfil,
      turma: usuario.turma,
      disciplina: usuario.disciplina,
      pontuacao,
      nivel: Math.floor(pontuacao / 100) + 1,
    };
  }
}
