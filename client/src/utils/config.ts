const config = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  SENTRY_ENABLED: Boolean(import.meta.env.VITE_SENTRY_ENABLED) || false,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || "",
  SENTRY_TRACE_RATE: Number(import.meta.env.VITE_SENTRY_TRACE_RATE) || 1.0,
  RECAPTCHA_SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY || "",
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "",
};

export default config;
