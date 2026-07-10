import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";

import { env } from "../../config/env.js";

export function registerPlugins(app: FastifyInstance): void {
  void app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });
}
