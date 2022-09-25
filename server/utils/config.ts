import dotenv from "dotenv";

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || "";
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "";
const JWT_ISSUER = process.env.JWT_ISSUER || "";

const config = {
  server: {
    hostName: SERVER_HOSTNAME,
    port: Number(SERVER_PORT),
  },
  cors: {
    credentials: true,
    origin: CORS_ORIGIN,
  },
  database: {
    connectionString: CONNECTION_STRING,
  },
  auth: {
    saltRounds: 10,
    publicKey: JWT_PUBLIC_KEY,
    privateKey: JWT_PRIVATE_KEY,
    issuer: JWT_ISSUER,
    accessTokenTTL: "15m",
    refreshTokenTTL: "24h",
  },
  cookieOptions: {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  },
  loginLimit: {
    max: 5,
    windowMs: 20 * 60 * 1000,
  },
  registrationLimit: {
    max: 2,
    windowMs: 60 * 60 * 1000,
  },
};

export default config;
