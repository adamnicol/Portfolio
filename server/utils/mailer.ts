import config from "./config";
import mailer from "nodemailer";

function send(to: string, subject: string, text: string, from?: string) {
  const mail = {
    to,
    from: config.mail.from,
    subject,
    text,
    replyTo: from,
  };

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

export default send;
