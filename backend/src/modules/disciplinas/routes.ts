import type { FastifyInstance } from "fastify";

import { DisciplinasController } from "./controller.js";

export function disciplinasRoutes(app: FastifyInstance): void {
  const controller = new DisciplinasController();

  app.post("/api/disciplinas", controller.cadastrar);
  app.get("/api/disciplinas", controller.listar);
  app.get("/api/disciplinas/:id", controller.buscarPorId);
}
