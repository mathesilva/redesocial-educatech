import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import { listarRankingSchema } from "./schemas.js";
import { RankingService } from "./service.js";

export class RankingController {
  public readonly service = new RankingService();

  public listar = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const filtros = listarRankingSchema.parse(request.query);
    const ranking = await this.service.listar(filtros);

    return reply.status(200).send(respostaSucesso("Ranking encontrado.", ranking));
  };
}
