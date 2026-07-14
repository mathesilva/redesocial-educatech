import type { FastifyInstance } from "fastify";

import { autenticar } from "../auth/index.js";
import { ProfileController } from "./controller.js";

export function profileRoutes(app: FastifyInstance): void {
  const controller = new ProfileController();
  const autenticarUsuario = autenticar(app);

  app.get("/api/perfil", { preHandler: autenticarUsuario }, controller.buscarPerfil);
}
