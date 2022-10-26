import config from "../utils/config";
import send from "../utils/mailer";
import Status from "../utils/statusCodes";
import { ContactSchema } from "../schemas/contact.schema";
import { NextFunction, Request, Response } from "express";

export default function contact(
  req: Request<{}, {}, ContactSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  const { from, content } = req.body;
  send(config.server.contactEmail, "Contact", content, from)
    .then(() => res.sendStatus(Status.OK))
    .catch((e) => next(e));
}
