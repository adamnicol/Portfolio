import express, { Request, Response } from "express";
import requestLogger from "./middleware/requestLogger";
import checkAccessToken from "./middleware/checkAccessToken";
import errorHandler from "./middleware/errorHandler";
import asyncHandler from "express-async-handler";
import responseTime from "response-time";
import logger from "./utils/logger";
import Status from "./utils/statusCodes";
import config from "./utils/config";
import cors from "cors";
import cookies from "cookie-parser";
import connect from "./database";

const app = express();

app.use(express.json());
app.use(cors(config.cors));
app.use(cookies());
app.use(responseTime());
app.use(requestLogger);
app.use(asyncHandler(checkAccessToken));

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/news", require("./routes/news.routes"));

app.get("/api/status", (req: Request, res: Response) =>
  res.sendStatus(Status.OK)
);

app.use(errorHandler);

app.listen(config.server.port, () => {
  logger.info(`Server started on port ${config.server.port}`);
  connect();
});
