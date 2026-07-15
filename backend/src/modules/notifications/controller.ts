import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import type { UsuarioNotificacaoDto } from "./dto.js";
import { marcarNotificacaoLidaParamsSchema } from "./schemas.js";
import { NotificationsService } from "./service.js";

export class NotificationsController {
  public readonly service = new NotificationsService();

  public listar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const usuario = request.usuarioAutenticado as UsuarioNotificacaoDto;
    const notificacoes = await this.service.listar(usuario);

    return reply.status(200).send(respostaSucesso("Notificacoes encontradas.", notificacoes));
  };

  public marcarComoLida = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const { id } = marcarNotificacaoLidaParamsSchema.parse(request.params);
    const usuario = request.usuarioAutenticado as UsuarioNotificacaoDto;
    const notificacao = await this.service.marcarComoLida(id, usuario);

    return reply.status(200).send(respostaSucesso("Notificacao marcada como lida.", notificacao));
  };
}
