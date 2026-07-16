import { PerfilUsuario } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import { autenticar, permitirPerfis } from "../auth/index.js";
import { NotificationsController } from "./controller.js";

export function notificationsRoutes(app: FastifyInstance): void {
  const controller = new NotificationsController();
  const autenticarUsuario = autenticar(app);
  const permitirProfessor = permitirPerfis([PerfilUsuario.PROFESSOR]);

  app.get("/api/notificacoes", { preHandler: autenticarUsuario }, controller.listar);
  app.post(
    "/api/notificacoes",
    { preHandler: [autenticarUsuario, permitirProfessor] },
    controller.criar,
  );
  app.patch(
    "/api/notificacoes/:id/lida",
    { preHandler: autenticarUsuario },
    controller.marcarComoLida,
  );
  app.patch(
    "/api/notificacoes/:id",
    { preHandler: [autenticarUsuario, permitirProfessor] },
    controller.atualizar,
  );
  app.delete(
    "/api/notificacoes/:id",
    { preHandler: [autenticarUsuario, permitirProfessor] },
    controller.excluir,
  );
}
