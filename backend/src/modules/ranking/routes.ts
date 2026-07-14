import type { FastifyInstance } from "fastify";

import { RankingController } from "./controller.js";

export function rankingRoutes(app: FastifyInstance): void {
  const controller = new RankingController();

  app.get("/api/ranking", controller.listar);
}
