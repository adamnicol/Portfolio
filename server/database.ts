import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connection string set in .env file.
const connectionString = process.env.MONGO_CONNECTION_STRING;

export function connect() {
  if (connectionString) {
    mongoose
      .connect(connectionString)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((e: Error) => {
        console.error(e.message);
        process.exit(1);
      });
  } else {
    console.error("Connection string not set");
    process.exit(1);
  }
}
