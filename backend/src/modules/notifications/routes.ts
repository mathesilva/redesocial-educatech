import type { FastifyInstance } from "fastify";

import { autenticar } from "../auth/index.js";
import { NotificationsController } from "./controller.js";

export function notificationsRoutes(app: FastifyInstance): void {
  const controller = new NotificationsController();
  const autenticarUsuario = autenticar(app);

  app.get("/api/notificacoes", { preHandler: autenticarUsuario }, controller.listar);
  app.patch(
    "/api/notificacoes/:id/lida",
    { preHandler: autenticarUsuario },
    controller.marcarComoLida,
  );
}
