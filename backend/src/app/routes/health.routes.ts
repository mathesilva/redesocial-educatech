import type { FastifyInstance } from "fastify";

import { respostaSucesso } from "../../shared/http/index.js";

export function healthRoutes(app: FastifyInstance): void {
  app.get("/health", () => {
    return respostaSucesso("API funcionando corretamente.", {
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  });
}
