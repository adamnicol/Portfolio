import mongoose from "mongoose";
import config from "./utils/config";
import log from "./utils/logger";

export default function connect() {
  if (config.database.connectionString) {
    mongoose
      .connect(config.database.connectionString)
      .then(() => {
        log.info("Connected to MongoDB");
      })
      .catch((e: Error) => {
        log.fatal(e.message);
        process.exit(1);
      });
  } else {
    log.fatal("Connection string not set");
    process.exit(1);
  }
}
