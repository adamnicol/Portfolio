import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "";
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || "";
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "";
const JWT_ISSUER = process.env.JWT_ISSUER || "";
const SMTP_SERVER = process.env.SMTP_SERVER || "";
const SMTP_PORT = process.env.SMTP_PORT || 25;
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";
const SMTP_FROM = process.env.SMTP_FROM || "";

const config = {
  isDevelopment: NODE_ENV === "development",
  isProduction: NODE_ENV === "production",
  server: {
    hostName: HOSTNAME,
    port: Number(PORT),
    contactEmail: CONTACT_EMAIL,
  },
  cors: {
    credentials: true,
    origin: CORS_ORIGIN,
  },
  mail: {
    hostname: SMTP_SERVER,
    port: Number(SMTP_PORT),
    username: SMTP_USER,
    password: SMTP_PASSWORD,
    from: SMTP_FROM,
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
