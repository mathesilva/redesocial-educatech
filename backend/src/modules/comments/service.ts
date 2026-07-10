import { NotFoundError } from "../../shared/errors/index.js";
import type {
  ComentarioRespostaDto,
  CriarComentarioDto,
  UsuarioComentarioDto,
} from "./dto.js";
import { CommentsRepository } from "./repository.js";
import type { ComentarioComAutor } from "./repository.js";

export class CommentsService {
  public readonly repository = new CommentsRepository();

  public async criar(
    publicacaoId: string,
    dados: CriarComentarioDto,
    usuario: UsuarioComentarioDto,
  ): Promise<ComentarioRespostaDto> {
    await this.validarPublicacao(publicacaoId);

    const comentario = await this.repository.criar({
      conteudo: dados.conteudo,
      usuarioId: usuario.id,
      publicacaoId,
    });

    return this.mapearComentario(comentario);
  }

  public async listarPorPublicacao(publicacaoId: string): Promise<ComentarioRespostaDto[]> {
    await this.validarPublicacao(publicacaoId);

    const comentarios = await this.repository.listarPorPublicacao(publicacaoId);

    return comentarios.map((comentario) => this.mapearComentario(comentario));
  }

  private async validarPublicacao(publicacaoId: string): Promise<void> {
    const publicacao = await this.repository.buscarPublicacaoPorId(publicacaoId);

    if (!publicacao) {
      throw new NotFoundError("Publicacao nao encontrada.");
    }
  }

  private mapearComentario(comentario: ComentarioComAutor): ComentarioRespostaDto {
    return {
      id: comentario.id,
      conteudo: comentario.conteudo,
      autor: {
        id: comentario.usuario.id,
        nomeCompleto: comentario.usuario.nomeCompleto,
        perfil: comentario.usuario.perfil,
      },
      dataCriacao: comentario.dataCriacao,
    };
  }
}
