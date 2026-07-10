import type { FastifyInstance } from "fastify";

import { autenticar } from "../auth/index.js";
import { ReactionsController } from "./controller.js";

export function reactionsRoutes(app: FastifyInstance): void {
  const controller = new ReactionsController();
  const preHandler = autenticar(app);

  app.post("/api/publicacoes/:publicacaoId/reacoes", { preHandler }, controller.toggle);
  app.get("/api/publicacoes/:publicacaoId/reacoes", { preHandler }, controller.obterResumo);
}
