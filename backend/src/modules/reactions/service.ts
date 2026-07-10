import { NotFoundError } from "../../shared/errors/index.js";
import type { ToggleReacaoRespostaDto, UsuarioReacaoDto } from "./dto.js";
import { ReactionsRepository } from "./repository.js";

export class ReactionsService {
  public readonly repository = new ReactionsRepository();

  public async toggle(
    publicacaoId: string,
    usuario: UsuarioReacaoDto,
  ): Promise<ToggleReacaoRespostaDto> {
    await this.validarPublicacao(publicacaoId);

    const reacaoExistente = await this.repository.buscarPorUsuarioEPublicacao(
      usuario.id,
      publicacaoId,
    );

    if (reacaoExistente) {
      const publicacao = await this.repository.removerCurtida(usuario.id, publicacaoId);

      return {
        quantidadeCurtidas: publicacao.quantidadeCurtidas,
        usuarioCurtiu: false,
      };
    }

    const publicacao = await this.repository.criarCurtida(usuario.id, publicacaoId);

    return {
      quantidadeCurtidas: publicacao.quantidadeCurtidas,
      usuarioCurtiu: true,
    };
  }

  public async obterResumo(
    publicacaoId: string,
    usuario: UsuarioReacaoDto,
  ): Promise<ToggleReacaoRespostaDto> {
    await this.validarPublicacao(publicacaoId);

    return this.repository.obterResumo(usuario.id, publicacaoId);
  }

  private async validarPublicacao(publicacaoId: string): Promise<void> {
    const publicacao = await this.repository.buscarPublicacaoPorId(publicacaoId);

    if (!publicacao) {
      throw new NotFoundError("Publicacao nao encontrada.");
    }
  }
}
