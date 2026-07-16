import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import { buscarUsuariosSchema, cadastrarUsuarioSchema } from "./schemas.js";
import { UsersService } from "./service.js";

export class UsersController {
  public readonly service = new UsersService();

  public cadastrar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const dados = cadastrarUsuarioSchema.parse(request.body);
    const usuario = await this.service.cadastrar(dados);

    return reply.status(201).send(respostaSucesso("Usuário cadastrado com sucesso.", usuario));
  };

  public buscar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const filtros = buscarUsuariosSchema.parse(request.query);
    const resultado = await this.service.buscar(filtros);

    return reply.status(200).send(respostaSucesso("Usuarios encontrados.", resultado));
  };
}
