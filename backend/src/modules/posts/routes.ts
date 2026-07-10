import type { FastifyInstance } from "fastify";

import { autenticar } from "../auth/index.js";
import { PostsController } from "./controller.js";

export function postsRoutes(app: FastifyInstance): void {
  const controller = new PostsController();
  const preHandler = autenticar(app);

  app.post("/api/publicacoes", { preHandler }, controller.criar);
  app.get("/api/publicacoes", { preHandler }, controller.listar);
  app.get("/api/publicacoes/:id", { preHandler }, controller.buscarPorId);
}
