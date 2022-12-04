import config from "../utils/config";
import send from "../utils/mailer";
import Status from "../utils/statusCodes";
import { ContactSchema } from "../schemas/contact.schema";
import { NextFunction, Request, Response } from "express";

export default function contact(
  req: Request<never, never, ContactSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  const { name, email, message } = req.body;
  send({
    to: config.server.contactEmail,
    from: `${name} <${config.mail.from}>`,
    replyTo: `${name} <${email}>`,
    subject: "Hello",
    text: message,
  })
    .then(() => res.sendStatus(Status.OK))
    .catch((e) => next(e));
}
