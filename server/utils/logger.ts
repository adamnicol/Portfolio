import pino from "pino";
import expressPinoLogger from "express-pino-logger";
import { Request, Response } from "express";

const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
      ignore: "pid,hostname",
    },
  },
});

export const requestLogger = expressPinoLogger({
  logger,
  serializers: {
    req: (req: Request) => ({
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params,
    }),
    res: (res: Response) => ({
      statusCode: res.statusCode,
    }),
  },
});

export default logger;
