import { Request, Response, NextFunction } from "express";
import Status from "../utils/statusCodes";
import log from "./../utils/logger";

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
  } else {
    const ret = new ApiError(Status.Error, "Internal server error");
    res.status(ret.status).json(ret);
  }
}

export class ApiError {
  status: Status;
  message: string;

  constructor(status: Status, message: string) {
    this.status = status;
    this.message = message;
  }
}

export default errorHandler;
