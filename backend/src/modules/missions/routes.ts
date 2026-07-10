import { PerfilUsuario } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import { autenticar, permitirPerfis } from "../auth/index.js";
import { MissionsController } from "./controller.js";

export function missionsRoutes(app: FastifyInstance): void {
  const controller = new MissionsController();
  const autenticarUsuario = autenticar(app);

  app.post(
    "/api/missoes",
    { preHandler: [autenticarUsuario, permitirPerfis([PerfilUsuario.PROFESSOR])] },
    controller.criar,
  );
  app.get("/api/missoes", { preHandler: autenticarUsuario }, controller.listar);
  app.get("/api/missoes/:id", { preHandler: autenticarUsuario }, controller.buscarPorId);
}
