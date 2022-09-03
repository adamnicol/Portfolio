import express, { Request, Response } from "express";
import logger, { requestLogger } from "./utils/logger";
import connect from "./database";
import status from "./utils/statusCodes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.use("/api/users", require("./routes/users"));
app.use("/api/news", require("./routes/news"));

app.get("/api/status", (req: Request, res: Response) =>
  res.sendStatus(status.OK)
);

app.listen(3001, () => {
  logger.info("Server started");
  connect();
});
