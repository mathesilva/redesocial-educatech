import { PerfilUsuario } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import { autenticar, permitirPerfis } from "../auth/index.js";
import { PostsController } from "./controller.js";

export function postsRoutes(app: FastifyInstance): void {
  const controller = new PostsController();
  const preHandler = autenticar(app);

  app.post("/api/publicacoes", { preHandler }, controller.criar);
  app.get("/api/publicacoes", { preHandler }, controller.listar);
  app.get("/api/publicacoes/:id", { preHandler }, controller.buscarPorId);
  app.delete(
    "/api/publicacoes/:id",
    { preHandler: [preHandler, permitirPerfis([PerfilUsuario.PROFESSOR])] },
    controller.excluir,
  );
}
