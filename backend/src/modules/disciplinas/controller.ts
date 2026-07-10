import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import {
  buscarDisciplinaPorIdSchema,
  cadastrarDisciplinaSchema,
  listarDisciplinasSchema,
} from "./schemas.js";
import { DisciplinasService } from "./service.js";

export class DisciplinasController {
  public readonly service = new DisciplinasService();

  public cadastrar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const dados = cadastrarDisciplinaSchema.parse(request.body);
    const disciplina = await this.service.cadastrar(dados);

    return reply.status(201).send(respostaSucesso("Disciplina criada.", disciplina));
  };

  public listar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const dados = listarDisciplinasSchema.parse(request.query);
    const disciplinas = await this.service.listar(dados);

    return reply.status(200).send(respostaSucesso("Disciplinas encontradas.", disciplinas));
  };

  public buscarPorId = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { id } = buscarDisciplinaPorIdSchema.parse(request.params);
    const disciplina = await this.service.buscarPorId(id);

    return reply.status(200).send(respostaSucesso("Disciplina encontrada.", disciplina));
  };
}
