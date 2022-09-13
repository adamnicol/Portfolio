import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "";
const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || "";

const config = {
  server: {
    port: Number(SERVER_PORT),
  },
  database: {
    connectionString: MONGO_CONNECTION_STRING,
  },
  auth: {
    saltRounds: 10,
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY,
  },
};

export default config;
