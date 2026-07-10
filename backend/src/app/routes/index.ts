import type { FastifyInstance } from "fastify";

import { authRoutes } from "../../modules/auth/index.js";
import { disciplinasRoutes } from "../../modules/disciplinas/index.js";
import { postsRoutes } from "../../modules/posts/index.js";
import { usersRoutes } from "../../modules/users/index.js";
import { healthRoutes } from "./health.routes.js";

export async function registerRoutes(app: FastifyInstance): Promise<void> {
  await app.register(healthRoutes);
  await app.register(authRoutes);
  await app.register(disciplinasRoutes);
  await app.register(postsRoutes);
  await app.register(usersRoutes);
}
