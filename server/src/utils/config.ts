const NODE_ENV = process.env.NODE_ENV || "development";
const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = Number(process.env.PORT) || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "";
const API_URL = process.env.API_URL || "http://localhost:3001";
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || "";
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "";
const JWT_ISSUER = process.env.JWT_ISSUER || "";
const SMTP_SERVER = process.env.SMTP_SERVER || "";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 25;
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";
const SMTP_FROM = process.env.SMTP_FROM || "";
const SENTRY_DSN = process.env.SENTRY_DSN || "";
const SENTRY_ENABLED = Boolean(process.env.SENTRY_ENABLED) || true;
const SENTRY_TRACE_RATE = Number(process.env.SENTRY_TRACE_RATE) || 1.0;

const config = {
  isDevelopment: NODE_ENV === "development",
  isProduction: NODE_ENV === "production",
  server: {
    hostName: HOSTNAME,
    port: PORT,
    url: API_URL,
    contactEmail: CONTACT_EMAIL,
  },
  cors: {
    credentials: true,
    origin: CORS_ORIGIN.split(","),
  },
  mail: {
    hostname: SMTP_SERVER,
    port: SMTP_PORT,
    username: SMTP_USER,
    password: SMTP_PASSWORD,
    from: SMTP_FROM,
  },
  sentry: {
    dsn: SENTRY_DSN,
    enabled: SENTRY_ENABLED,
    tracesSampleRate: SENTRY_TRACE_RATE,
  },
  auth: {
    saltRounds: 10,
    publicKey: JWT_PUBLIC_KEY,
    privateKey: JWT_PRIVATE_KEY,
    issuer: JWT_ISSUER,
    accessTokenTTL: "15m",
    refreshTokenTTL: "24h",
    activationTokenTTL: "24h",
    cookies: {
      httpOnly: true,
      secure: true,
      sameSite: true,
    },
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
