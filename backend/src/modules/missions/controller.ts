import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import type { UsuarioMissaoDto } from "./dto.js";
import {
  buscarMissaoPorIdSchema,
  buscarRespostaMissaoParamsSchema,
  criarMissaoSchema,
  criarRespostaMissaoSchema,
  listarMissoesSchema,
} from "./schemas.js";
import { MissionsService } from "./service.js";

export class MissionsController {
  public readonly service = new MissionsService();

  public criar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const dados = criarMissaoSchema.parse(request.body);
    const usuario = request.usuarioAutenticado as UsuarioMissaoDto;
    const missao = await this.service.criar(dados, usuario);

    return reply.status(201).send(respostaSucesso("Missao criada.", missao));
  };

  public listar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const dados = listarMissoesSchema.parse(request.query);
    const missoes = await this.service.listar(dados);

    return reply.status(200).send(respostaSucesso("Missoes encontradas.", missoes));
  };

  public buscarPorId = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { id } = buscarMissaoPorIdSchema.parse(request.params);
    const missao = await this.service.buscarPorId(id);

    return reply.status(200).send(respostaSucesso("Missao encontrada.", missao));
  };

  public responder = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { missaoId } = buscarRespostaMissaoParamsSchema.parse(request.params);
    const dados = criarRespostaMissaoSchema.parse(request.body);
    const usuario = request.usuarioAutenticado as UsuarioMissaoDto;
    const resposta = await this.service.responder(missaoId, dados, usuario);

    return reply.status(201).send(respostaSucesso("Resposta enviada.", resposta));
  };

  public buscarMinhaResposta = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const { missaoId } = buscarRespostaMissaoParamsSchema.parse(request.params);
    const usuario = request.usuarioAutenticado as UsuarioMissaoDto;
    const resposta = await this.service.buscarMinhaResposta(missaoId, usuario);

    return reply.status(200).send(respostaSucesso("Resposta encontrada.", resposta));
  };
}
