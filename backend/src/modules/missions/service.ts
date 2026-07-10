import { BadRequestError, ForbiddenError, NotFoundError } from "../../shared/errors/index.js";
import type {
  CriarMissaoDto,
  ListarMissoesDto,
  ListarMissoesRespostaDto,
  MissaoRespostaDto,
  UsuarioMissaoDto,
} from "./dto.js";
import { MissionsRepository } from "./repository.js";
import type { MissaoComRelacoes } from "./repository.js";

export class MissionsService {
  public readonly repository = new MissionsRepository();

  public async criar(dados: CriarMissaoDto, usuario: UsuarioMissaoDto): Promise<MissaoRespostaDto> {
    if (usuario.perfil !== "PROFESSOR") {
      throw new ForbiddenError("Somente professores podem criar missoes.");
    }

    if (dados.prazo <= new Date()) {
      throw new BadRequestError("Prazo deve ser uma data futura.");
    }

    const [disciplina, professor] = await Promise.all([
      this.repository.buscarDisciplinaPorId(dados.disciplinaId),
      this.repository.buscarProfessorPorId(usuario.id),
    ]);

    if (!disciplina) {
      throw new NotFoundError("Disciplina nao encontrada.");
    }

    if (!professor || professor.perfil !== "PROFESSOR") {
      throw new ForbiddenError("Professor autenticado invalido.");
    }

    const missao = await this.repository.criar({
      titulo: dados.titulo,
      descricao: dados.descricao,
      criteriosAvaliacao: dados.criteriosAvaliacao ?? null,
      prazo: dados.prazo,
      pontuacao: dados.pontuacao,
      dificuldade: dados.dificuldade,
      professorId: usuario.id,
      disciplinaId: dados.disciplinaId,
    });

    return this.mapearMissao(missao);
  }

  public async listar(dados: ListarMissoesDto): Promise<ListarMissoesRespostaDto> {
    const [missoes, total] = await Promise.all([
      this.repository.listar(dados),
      this.repository.contar(dados),
    ]);

    return {
      itens: missoes.map((missao) => this.mapearMissao(missao)),
      paginacao: {
        pagina: dados.pagina,
        limite: dados.limite,
        total,
        totalPaginas: Math.ceil(total / dados.limite),
      },
    };
  }

  public async buscarPorId(id: string): Promise<MissaoRespostaDto> {
    const missao = await this.repository.buscarPorId(id);

    if (!missao) {
      throw new NotFoundError("Missao nao encontrada.");
    }

    return this.mapearMissao(missao);
  }

  private mapearMissao(missao: MissaoComRelacoes): MissaoRespostaDto {
    return {
      id: missao.id,
      titulo: missao.titulo,
      descricao: missao.descricao,
      criteriosAvaliacao: missao.criteriosAvaliacao,
      prazo: missao.prazo,
      pontuacao: missao.pontuacao,
      dificuldade: missao.dificuldade,
      professor: {
        id: missao.professor.id,
        nomeCompleto: missao.professor.nomeCompleto,
        perfil: missao.professor.perfil,
      },
      disciplina: {
        id: missao.disciplina.id,
        nome: missao.disciplina.nome,
      },
      dataCriacao: missao.dataCriacao,
    };
  }
}
