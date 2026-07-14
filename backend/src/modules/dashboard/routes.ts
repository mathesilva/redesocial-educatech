import { PerfilUsuario } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import { autenticar, permitirPerfis } from "../auth/index.js";
import { DashboardController } from "./controller.js";

export function dashboardRoutes(app: FastifyInstance): void {
  const controller = new DashboardController();
  const autenticarUsuario = autenticar(app);

  app.get(
    "/api/dashboard/professor",
    { preHandler: [autenticarUsuario, permitirPerfis([PerfilUsuario.PROFESSOR])] },
    controller.buscarDashboardProfessor,
  );
}
