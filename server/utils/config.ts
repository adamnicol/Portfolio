import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const config = {
  server: {
    port: Number(SERVER_PORT),
  },
  database: {
    connectionString: MONGO_CONNECTION_STRING,
  },
};

export default config;
