import type { FastifyInstance } from "fastify";

import { autenticar } from "../auth/index.js";
import { UsersController } from "./controller.js";

export function usersRoutes(app: FastifyInstance): void {
  const controller = new UsersController();

  app.post("/api/usuarios", controller.cadastrar);
  app.get("/api/usuarios", { preHandler: autenticar(app) }, controller.buscar);
}
