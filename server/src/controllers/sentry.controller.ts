import fetch from "node-fetch";
import { Request, Response } from "express";

export default async function tunnel(req: Request, res: Response) {
  const envelope = req.body;
  const pieces = envelope.split("\n");
  const header = JSON.parse(pieces[0]);

  const { host, pathname } = new URL(header.dsn);

  // Remove leading slash
  const projectId = pathname.substring(1);

  const url = `https://${host}/api/${projectId}/envelope/`;
  const response = await fetch(url, { method: "POST", body: envelope });

  // Relay response to the front end.
  response.headers.forEach((value: string, name: string) => {
    res.setHeader(name, value);
  });

  res.status(response.status).send(response.body);
}
