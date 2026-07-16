import { ForbiddenError, NotFoundError } from "../../shared/errors/index.js";
import type {
  AtualizarNotificacaoDto,
  CriarNotificacaoDto,
  NotificacaoRespostaDto,
  UsuarioNotificacaoDto,
} from "./dto.js";
import { NotificationsRepository } from "./repository.js";

export class NotificationsService {
  public readonly repository = new NotificationsRepository();

  public async listar(usuario: UsuarioNotificacaoDto): Promise<NotificacaoRespostaDto[]> {
    const notificacoes = await this.repository.listarPorUsuario(usuario.id);

    return notificacoes.map((notificacao) => this.mapearNotificacao(notificacao));
  }

  public async criar(
    dados: CriarNotificacaoDto,
    usuario: UsuarioNotificacaoDto,
  ): Promise<NotificacaoRespostaDto> {
    this.validarProfessor(usuario);

    const usuarioDestino = await this.repository.buscarUsuarioPorId(dados.usuarioId);

    if (!usuarioDestino) {
      throw new NotFoundError("Usuario nao encontrado.");
    }

    const notificacao = await this.repository.criar(dados);

    return this.mapearNotificacao(notificacao);
  }

  public async atualizar(
    id: string,
    dados: AtualizarNotificacaoDto,
    usuario: UsuarioNotificacaoDto,
  ): Promise<NotificacaoRespostaDto> {
    this.validarProfessor(usuario);

    const notificacaoExistente = await this.repository.buscarPorId(id);

    if (!notificacaoExistente) {
      throw new NotFoundError("Notificacao nao encontrada.");
    }

    const notificacaoAtualizada = await this.repository.atualizar(id, {
      ...(dados.titulo !== undefined && { titulo: dados.titulo }),
      ...(dados.mensagem !== undefined && { mensagem: dados.mensagem }),
      ...(dados.tipo !== undefined && { tipo: dados.tipo }),
    });

    return this.mapearNotificacao(notificacaoAtualizada);
  }

  public async excluir(id: string, usuario: UsuarioNotificacaoDto): Promise<void> {
    this.validarProfessor(usuario);

    const notificacaoExistente = await this.repository.buscarPorId(id);

    if (!notificacaoExistente) {
      throw new NotFoundError("Notificacao nao encontrada.");
    }

    await this.repository.excluir(id);
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

  private validarProfessor(usuario: UsuarioNotificacaoDto): void {
    if (usuario.perfil !== "PROFESSOR") {
      throw new ForbiddenError("Somente professores podem gerenciar notificacoes.");
    }
  }

  private mapearNotificacao(notificacao: NotificacaoRespostaDto): NotificacaoRespostaDto {
    return {
      id: notificacao.id,
      titulo: notificacao.titulo,
      mensagem: notificacao.mensagem,
      tipo: notificacao.tipo,
      lida: notificacao.lida,
      missaoId: notificacao.missaoId,
      dataCriacao: notificacao.dataCriacao,
    };
  }
}
