import type { FastifyInstance } from "fastify";

import { AuthController } from "./controller.js";
import { autenticar } from "./middleware.js";

export function authRoutes(app: FastifyInstance): void {
  const controller = new AuthController();

  app.post("/api/autenticacao/login", controller.login);
  app.get("/api/autenticacao/me", { preHandler: autenticar(app) }, controller.me);
}
