import { ForbiddenError, NotFoundError } from "../../shared/errors/index.js";
import type { NotificacaoRespostaDto, UsuarioNotificacaoDto } from "./dto.js";
import { NotificationsRepository } from "./repository.js";

export class NotificationsService {
  public readonly repository = new NotificationsRepository();

  public async listar(usuario: UsuarioNotificacaoDto): Promise<NotificacaoRespostaDto[]> {
    const notificacoes = await this.repository.listarPorUsuario(usuario.id);

    return notificacoes.map((notificacao) => this.mapearNotificacao(notificacao));
  }

  public async marcarComoLida(
    id: string,
    usuario: UsuarioNotificacaoDto,
  ): Promise<NotificacaoRespostaDto> {
    const notificacao = await this.repository.buscarPorId(id);

    if (!notificacao) {
      throw new NotFoundError("Notificacao nao encontrada.");
    }

    if (notificacao.usuarioId !== usuario.id) {
      throw new ForbiddenError("Notificacao pertence a outro usuario.");
    }

    const notificacaoAtualizada = await this.repository.marcarComoLida(id);

    return this.mapearNotificacao(notificacaoAtualizada);
  }

  private mapearNotificacao(notificacao: NotificacaoRespostaDto): NotificacaoRespostaDto {
    return {
      id: notificacao.id,
      titulo: notificacao.titulo,
      mensagem: notificacao.mensagem,
      tipo: notificacao.tipo,
      lida: notificacao.lida,
      dataCriacao: notificacao.dataCriacao,
    };
  }
}
