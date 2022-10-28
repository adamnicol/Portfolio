import config from "./config";
import mailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export default function send(mail: Mail.Options) {
  if (!mail.from) {
    mail.from = config.mail.from;
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
