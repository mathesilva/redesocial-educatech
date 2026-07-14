import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import type { UsuarioAutenticadoPerfilDto } from "./dto.js";
import { ProfileService } from "./service.js";

export class ProfileController {
  public readonly service = new ProfileService();

  public buscarPerfil = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const usuario = request.usuarioAutenticado as UsuarioAutenticadoPerfilDto;
    const perfil = await this.service.buscarPerfil(usuario);

    return reply.status(200).send(respostaSucesso("Perfil encontrado.", perfil));
  };
}
