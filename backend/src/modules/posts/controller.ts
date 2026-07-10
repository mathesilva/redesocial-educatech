import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import type { UsuarioPublicacaoDto } from "./dto.js";
import {
  buscarPublicacaoPorIdSchema,
  criarPublicacaoSchema,
  listarPublicacoesSchema,
} from "./schemas.js";
import { PostsService } from "./service.js";

export class PostsController {
  public readonly service = new PostsService();

  public criar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const dados = criarPublicacaoSchema.parse(request.body);
    const usuario = request.usuarioAutenticado as UsuarioPublicacaoDto;
    const publicacao = await this.service.criar(dados, usuario);

    return reply.status(201).send(respostaSucesso("Publicacao criada.", publicacao));
  };

  public listar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const dados = listarPublicacoesSchema.parse(request.query);
    const publicacoes = await this.service.listar(dados);

    return reply.status(200).send(respostaSucesso("Publicacoes encontradas.", publicacoes));
  };

  public buscarPorId = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { id } = buscarPublicacaoPorIdSchema.parse(request.params);
    const publicacao = await this.service.buscarPorId(id);

    return reply.status(200).send(respostaSucesso("Publicacao encontrada.", publicacao));
  };
}
