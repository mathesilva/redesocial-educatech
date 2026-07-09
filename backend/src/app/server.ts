import Fastify from "fastify";

import { env } from "../config/env.js";
import { registerPlugins } from "./plugins/index.js";
import { registerRoutes } from "./routes/index.js";

export async function buildServer() {
  const app = Fastify({
    logger: env.NODE_ENV !== "test",
  });

  registerPlugins(app);
  await registerRoutes(app);

  return app;
}
