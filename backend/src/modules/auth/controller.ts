import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import type { UsuarioAutenticadoDto } from "./dto.js";
import { loginSchema } from "./schemas.js";
import { AuthService } from "./service.js";

export class AuthController {
  public readonly service = new AuthService();

  public login = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const dados = loginSchema.parse(request.body);
    const login = await this.service.login(dados, (payload, opcoes) =>
      reply.jwtSign(payload, opcoes),
    );

    return reply.status(200).send(respostaSucesso("Login realizado com sucesso.", login));
  };

  public me = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const usuario = request.usuarioAutenticado as UsuarioAutenticadoDto;

    return reply.status(200).send(respostaSucesso("Usuario autenticado.", usuario));
  };
}
