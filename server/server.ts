import express, { Request, Response } from "express";
import Status from "./utils/statusCodes";
import logger from "./utils/logger";
import cors from "cors";

const app = express();
const database = require("./database");
const pino = require("express-pino-logger");

app.use(express.json());
app.use(cors());
//app.use(pino({ logger }));

app.use("/api/users", require("./routes/users"));
app.use("/api/news", require("./routes/news"));

app.get("/api/status", (request: Request, response: Response) =>
  response.sendStatus(Status.OK)
);

app.listen(3001, () => {
  logger.info("Server started");
  database.connect();
});
