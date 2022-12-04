import { Request, Response, NextFunction } from "express";
import log from "../utils/logger";

export default function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.on("finish", () => {
    const type = req.method;
    const sender = req.socket.remoteAddress;
    const status = res.statusCode;
    const time = res.getHeader("x-response-time");
    const path = req.originalUrl;

    log.info(
      `${type} REQUEST FROM [${sender}] RESPONSE ${status} (${time}) ${path}`
    );
  });

  next();
}
