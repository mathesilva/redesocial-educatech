import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import type { UsuarioReacaoDto } from "./dto.js";
import { publicacaoReacoesParamsSchema } from "./schemas.js";
import { ReactionsService } from "./service.js";

export class ReactionsController {
  public readonly service = new ReactionsService();

  public toggle = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { publicacaoId } = publicacaoReacoesParamsSchema.parse(request.params);
    const usuario = request.usuarioAutenticado as UsuarioReacaoDto;
    const reacao = await this.service.toggle(publicacaoId, usuario);
    const mensagem = reacao.usuarioCurtiu ? "Reacao criada." : "Reacao removida.";

    return reply.status(200).send(respostaSucesso(mensagem, reacao));
  };

  public obterResumo = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { publicacaoId } = publicacaoReacoesParamsSchema.parse(request.params);
    const usuario = request.usuarioAutenticado as UsuarioReacaoDto;
    const resumo = await this.service.obterResumo(publicacaoId, usuario);

    return reply.status(200).send(respostaSucesso("Reacoes encontradas.", resumo));
  };
}
