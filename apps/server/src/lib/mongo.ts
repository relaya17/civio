import mongoose from "mongoose";
import { logger } from "./logger.js";

export async function connectMongo(params: { mongoUri: string }) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(params.mongoUri, {
    serverSelectionTimeoutMS: 5_000,
  });
  logger.info({ mongo: true }, "mongo connected");
}

export function isMongoConnected() {
  // 1 = connected
  return mongoose.connection.readyState === 1;
}


