import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./utils/logger";

dotenv.config();

// Connection string set in .env file.
const connectionString = process.env.MONGO_CONNECTION_STRING;

export function connect() {
  if (connectionString) {
    mongoose
      .connect(connectionString)
      .then(() => {
        logger.info("Connected to MongoDB");
      })
      .catch((e: Error) => {
        logger.fatal(e.message);
        process.exit(1);
      });
  } else {
    logger.fatal("Connection string not set");
    process.exit(1);
  }
}
