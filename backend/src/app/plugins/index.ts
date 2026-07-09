import type { FastifyInstance } from "fastify";

/**
 * Plugin registration entry point.
 * Future plugins (JWT, CORS, Prisma, etc.) will be registered here.
 */
export function registerPlugins(app: FastifyInstance): void {
  void app;
  // Plugins will be registered in future iterations.
}
