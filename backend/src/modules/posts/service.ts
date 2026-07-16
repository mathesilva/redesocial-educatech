import { ForbiddenError, NotFoundError } from "../../shared/errors/index.js";
import type {
  CriarPublicacaoDto,
  ListarPublicacoesDto,
  ListarPublicacoesRespostaDto,
  PublicacaoRespostaDto,
  UsuarioPublicacaoDto,
} from "./dto.js";
import { PostsRepository } from "./repository.js";
import type { PublicacaoComRelacoes } from "./repository.js";

export class PostsService {
  public readonly repository = new PostsRepository();

  public async criar(
    dados: CriarPublicacaoDto,
    usuario: UsuarioPublicacaoDto,
  ): Promise<PublicacaoRespostaDto> {
    const disciplina = await this.repository.buscarDisciplinaPorId(dados.disciplinaId);

    if (!disciplina) {
      throw new NotFoundError("Disciplina nao encontrada.");
    }

    const publicacao = await this.repository.criar({
      titulo: dados.titulo,
      descricao: dados.descricao,
      imagemUrl: dados.imagemUrl ?? null,
      status: "APROVADA",
      usuarioId: usuario.id,
      disciplinaId: dados.disciplinaId,
    });

    return this.mapearPublicacao(publicacao);
  }

  public async listar(dados: ListarPublicacoesDto): Promise<ListarPublicacoesRespostaDto> {
    const [publicacoes, total] = await Promise.all([
      this.repository.listar(dados),
      this.repository.contar(dados),
    ]);

    return {
      itens: publicacoes.map((publicacao) => this.mapearPublicacao(publicacao)),
      paginacao: {
        pagina: dados.pagina,
        limite: dados.limite,
        total,
        totalPaginas: Math.ceil(total / dados.limite),
      },
    };
  }

  public async buscarPorId(id: string): Promise<PublicacaoRespostaDto> {
    const publicacao = await this.repository.buscarPorId(id);

    if (!publicacao) {
      throw new NotFoundError("Publicacao nao encontrada.");
    }

    return this.mapearPublicacao(publicacao);
  }

  public async excluir(id: string, usuario: UsuarioPublicacaoDto): Promise<void> {
    if (usuario.perfil !== "PROFESSOR") {
      throw new ForbiddenError("Somente professores podem moderar publicacoes.");
    }

    const publicacao = await this.repository.buscarPorId(id);

    if (!publicacao) {
      throw new NotFoundError("Publicacao nao encontrada.");
    }

    // Notifica o autor, exceto quando o proprio professor remove sua publicacao.
    const notificarAutor = publicacao.usuario.id !== usuario.id;
    const notificacao = notificarAutor
      ? {
          usuarioId: publicacao.usuario.id,
          titulo: "Publicação removida",
          mensagem: `Sua publicação "${publicacao.titulo}" foi removida por um professor por não estar de acordo com as diretrizes da comunidade.`,
          tipo: "PUBLICACAO_REPROVADA" as const,
        }
      : undefined;

    await this.repository.excluirComNotificacao(id, notificacao);
  }

  private mapearPublicacao(publicacao: PublicacaoComRelacoes): PublicacaoRespostaDto {
    return {
      id: publicacao.id,
      titulo: publicacao.titulo,
      descricao: publicacao.descricao,
      imagemUrl: publicacao.imagemUrl,
      status: publicacao.status,
      autor: {
        id: publicacao.usuario.id,
        nomeCompleto: publicacao.usuario.nomeCompleto,
        perfil: publicacao.usuario.perfil,
      },
      disciplina: {
        id: publicacao.disciplina.id,
        nome: publicacao.disciplina.nome,
      },
      dataCriacao: publicacao.dataCriacao,
    };
  }
}
