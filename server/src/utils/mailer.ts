import config from "./config";
import fs from "fs-extra";
import handlebars from "handlebars";
import mailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export function sendTemplate(
  to: string,
  subject: string,
  template: string,
  data: object
) {
  const source = fs.readFileSync(template, "utf8");
  const compiled = handlebars.compile(source);
  const mail: MailOptions = {
    to,
    subject,
    html: compiled(data),
    from: config.mail.from,
  };

  return send(mail);
}

export default function send(mail: MailOptions) {
  if (!mail.from) {
    mail.from = config.mail.from;
  }

  if (config.isProduction) {
    mail.bcc = config.server.contactEmail;
  }

  const transporter = mailer.createTransport({
    host: config.mail.hostname,
    port: config.mail.port,
    logger: config.isDevelopment,
    auth: {
      user: config.mail.username,
      pass: config.mail.password,
    },
  });

  return transporter.sendMail(mail);
}
