import * as Sentry from "@sentry/react";
import config from "../utils/config";

const options: Sentry.BrowserOptions = {
  dsn: config.SENTRY_DSN,
  enabled: config.SENTRY_ENABLED,
  tracesSampleRate: config.SENTRY_TRACE_RATE,
};

export const sentry = {
  init() {
    if (process.env.NODE_ENV === "production") {
      Sentry.init(options);
    }
  },
};
