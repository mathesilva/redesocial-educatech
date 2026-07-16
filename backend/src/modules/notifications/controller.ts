import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import type { UsuarioNotificacaoDto } from "./dto.js";
import {
  atualizarNotificacaoSchema,
  criarNotificacaoSchema,
  notificacaoIdParamsSchema,
} from "./schemas.js";
import { NotificationsService } from "./service.js";

export class NotificationsController {
  public readonly service = new NotificationsService();

  public listar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const usuario = request.usuarioAutenticado as UsuarioNotificacaoDto;
    const notificacoes = await this.service.listar(usuario);

    return reply.status(200).send(respostaSucesso("Notificacoes encontradas.", notificacoes));
  };

  public criar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const dados = criarNotificacaoSchema.parse(request.body);
    const usuario = request.usuarioAutenticado as UsuarioNotificacaoDto;
    const notificacao = await this.service.criar(dados, usuario);

    return reply.status(201).send(respostaSucesso("Notificacao criada.", notificacao));
  };

  public atualizar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { id } = notificacaoIdParamsSchema.parse(request.params);
    const dados = atualizarNotificacaoSchema.parse(request.body);
    const usuario = request.usuarioAutenticado as UsuarioNotificacaoDto;
    const notificacao = await this.service.atualizar(id, dados, usuario);

    return reply.status(200).send(respostaSucesso("Notificacao atualizada.", notificacao));
  };

  public excluir = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { id } = notificacaoIdParamsSchema.parse(request.params);
    const usuario = request.usuarioAutenticado as UsuarioNotificacaoDto;
    await this.service.excluir(id, usuario);

    return reply.status(200).send(respostaSucesso("Notificacao excluida.", null));
  };

  public marcarComoLida = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const { id } = notificacaoIdParamsSchema.parse(request.params);
    const usuario = request.usuarioAutenticado as UsuarioNotificacaoDto;
    const notificacao = await this.service.marcarComoLida(id, usuario);

    return reply.status(200).send(respostaSucesso("Notificacao marcada como lida.", notificacao));
  };
}
