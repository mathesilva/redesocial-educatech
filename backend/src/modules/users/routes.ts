import type { FastifyInstance } from "fastify";

import { UsersController } from "./controller.js";

export function usersRoutes(app: FastifyInstance): void {
  const controller = new UsersController();

  app.post("/api/usuarios", controller.cadastrar);
}
