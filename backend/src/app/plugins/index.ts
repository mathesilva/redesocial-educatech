import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";

import { env } from "../../config/env.js";

export function registerPlugins(app: FastifyInstance): void {
  void app.register(fastifyCors, {
    origin: true,
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  });

  void app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });
}
