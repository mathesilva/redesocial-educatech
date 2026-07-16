import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import type { UsuarioAutenticadoPerfilDto } from "./dto.js";
import { buscarPerfilPublicoParamsSchema } from "./schemas.js";
import { ProfileService } from "./service.js";

export class ProfileController {
  public readonly service = new ProfileService();

  public buscarPerfil = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const usuario = request.usuarioAutenticado as UsuarioAutenticadoPerfilDto;
    const perfil = await this.service.buscarPerfil(usuario);

    return reply.status(200).send(respostaSucesso("Perfil encontrado.", perfil));
  };

  public buscarPerfilPublico = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const { id } = buscarPerfilPublicoParamsSchema.parse(request.params);
    const perfil = await this.service.buscarPerfilPublico(id);

    return reply.status(200).send(respostaSucesso("Perfil encontrado.", perfil));
  };
}
