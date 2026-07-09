import { buildServer } from "./app/server.js";
import { env } from "./config/env.js";

async function bootstrap(): Promise<void> {
  const app = await buildServer();

  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    app.log.info(`Server running on http://localhost:${String(env.PORT)}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void bootstrap();
