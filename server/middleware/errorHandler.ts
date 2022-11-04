import config from "../utils/config";
import log from "./../utils/logger";
import Status from "../utils/statusCodes";
import { NextFunction, Request, Response } from "express";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  log.error(err.message);

  if (res.headersSent) {
    next(err);
  } else if (err instanceof ApiError) {
    res.status(err.status).json(err);
  } else if (config.isProduction) {
    const ret = new ApiError(Status.Error, "Internal server error");
    res.status(ret.status).json(ret);
  } else {
    res.status(Status.Error).json(err);
  }
}

export class ApiError {
  status: Status;
  message?: string;

  constructor(status: Status, message?: string) {
    this.status = status;
    this.message = message;
  }
}

export default errorHandler;
