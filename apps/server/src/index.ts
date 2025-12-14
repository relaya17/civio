import "dotenv/config";

import { createServer } from "./server.js";
import { env } from "./lib/env.js";
import { logger } from "./lib/logger.js";
import { connectMongo } from "./lib/mongo.js";

const app = createServer();

if (env.MONGODB_URI) {
  connectMongo({ mongoUri: env.MONGODB_URI }).catch((err: unknown) => {
    logger.error({ err }, "failed to connect mongo");
  });
} else {
  logger.warn({ mongo: false }, "MONGODB_URI is not set; running without database");
}

app.listen(env.PORT, "0.0.0.0", () => {
  logger.info({ port: env.PORT }, "server listening");
});


