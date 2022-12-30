const config = {
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:3001",
  SENTRY_ENABLED: Boolean(process.env.REACT_APP_SENTRY_ENABLED) || false,
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN || "",
  SENTRY_TRACE_RATE: Number(process.env.REACT_APP_SENTRY_TRACE_RATE) || 1.0,
};

export default config;
