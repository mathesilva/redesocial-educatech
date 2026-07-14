import type { FastifyReply, FastifyRequest } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";
import type { UsuarioDashboardDto } from "./dto.js";
import { DashboardService } from "./service.js";

export class DashboardController {
  public readonly service = new DashboardService();

  public buscarDashboardProfessor = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const usuario = request.usuarioAutenticado as UsuarioDashboardDto;
    const dashboard = await this.service.buscarDashboardProfessor(usuario);

    return reply.status(200).send(respostaSucesso("Dashboard encontrado.", dashboard));
  };
}
