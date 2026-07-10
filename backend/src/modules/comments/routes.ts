import type { FastifyInstance } from "fastify";

import { autenticar } from "../auth/index.js";
import { CommentsController } from "./controller.js";

export function commentsRoutes(app: FastifyInstance): void {
  const controller = new CommentsController();
  const preHandler = autenticar(app);

  app.post("/api/publicacoes/:publicacaoId/comentarios", { preHandler }, controller.criar);
  app.get(
    "/api/publicacoes/:publicacaoId/comentarios",
    { preHandler },
    controller.listarPorPublicacao,
  );
}
