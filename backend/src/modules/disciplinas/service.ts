import { ConflictError, NotFoundError } from "../../shared/errors/index.js";
import type {
  CadastrarDisciplinaDto,
  DisciplinaRespostaDto,
  ListarDisciplinasDto,
  ListarDisciplinasRespostaDto,
} from "./dto.js";
import { DisciplinasRepository } from "./repository.js";

export class DisciplinasService {
  public readonly repository = new DisciplinasRepository();

  public async cadastrar(dados: CadastrarDisciplinaDto): Promise<DisciplinaRespostaDto> {
    const disciplinaExistente = await this.repository.buscarPorNome(dados.nome);

    if (disciplinaExistente) {
      throw new ConflictError("Disciplina ja cadastrada.");
    }

    const disciplina = await this.repository.criar({
      nome: dados.nome,
      descricao: dados.descricao ?? null,
    });

    return this.mapearDisciplina(disciplina);
  }

  public async listar(dados: ListarDisciplinasDto): Promise<ListarDisciplinasRespostaDto> {
    const [disciplinas, total] = await Promise.all([
      this.repository.listar(dados.pagina, dados.limite),
      this.repository.contar(),
    ]);

    return {
      itens: disciplinas.map((disciplina) => this.mapearDisciplina(disciplina)),
      paginacao: {
        pagina: dados.pagina,
        limite: dados.limite,
        total,
        totalPaginas: Math.ceil(total / dados.limite),
      },
    };
  }

  public async buscarPorId(id: string): Promise<DisciplinaRespostaDto> {
    const disciplina = await this.repository.buscarPorId(id);

    if (!disciplina) {
      throw new NotFoundError("Disciplina nao encontrada.");
    }

    return this.mapearDisciplina(disciplina);
  }

  private mapearDisciplina(disciplina: {
    id: string;
    nome: string;
    descricao: string | null;
  }): DisciplinaRespostaDto {
    return {
      id: disciplina.id,
      nome: disciplina.nome,
      descricao: disciplina.descricao,
    };
  }
}
