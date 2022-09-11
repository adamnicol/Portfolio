import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "";
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || "";
const JWT_EXPIRES = process.env.JWT_EXPIRES || 15; // Minutes

const config = {
  server: {
    port: Number(SERVER_PORT),
  },
  database: {
    connectionString: MONGO_CONNECTION_STRING,
  },
  auth: {
    saltRounds: 10,
    publicKey: JWT_PUBLIC_KEY,
    privateKey: JWT_PRIVATE_KEY,
    tokenExpires: Number(JWT_EXPIRES),
  },
};

export default config;
