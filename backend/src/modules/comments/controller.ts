import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import type { UsuarioComentarioDto } from "./dto.js";
import { criarComentarioSchema, publicacaoComentariosParamsSchema } from "./schemas.js";
import { CommentsService } from "./service.js";

export class CommentsController {
  public readonly service = new CommentsService();

  public criar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { publicacaoId } = publicacaoComentariosParamsSchema.parse(request.params);
    const dados = criarComentarioSchema.parse(request.body);
    const usuario = request.usuarioAutenticado as UsuarioComentarioDto;
    const comentario = await this.service.criar(publicacaoId, dados, usuario);

    return reply.status(201).send(respostaSucesso("Comentario criado.", comentario));
  };

  public listarPorPublicacao = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const { publicacaoId } = publicacaoComentariosParamsSchema.parse(request.params);
    const comentarios = await this.service.listarPorPublicacao(publicacaoId);

    return reply.status(200).send(respostaSucesso("Comentarios encontrados.", comentarios));
  };
}
