import asyncHandler from "express-async-handler";
import checkAccessToken from "./middleware/checkAccessToken";
import compression from "compression";
import config from "./utils/config";
import contact from "./controllers/contact.controller";
import cookies from "cookie-parser";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import express, { Request, Response } from "express";
import helmet from "helmet";
import jsdoc from "swagger-jsdoc";
import logger from "./utils/logger";
import requestLogger from "./middleware/requestLogger";
import responseTime from "response-time";
import Status from "./utils/statusCodes";
import swagger from "swagger-ui-express";

const app = express();

app.use(express.json());
app.use(cors(config.cors));
app.use(cookies());
app.use(compression());
app.use(helmet());
app.use(responseTime());
app.use(requestLogger);
app.use(asyncHandler(checkAccessToken));

app.use("/users", require("./routes/user.routes"));
app.use("/news", require("./routes/news.routes"));
app.use("/contact", asyncHandler(contact));

app.get("/healthcheck", (req: Request, res: Response) =>
  res.sendStatus(Status.OK)
);

//if (!config.isProduction) {
const docs = jsdoc(require("./swagger.json"));
app.use("/", swagger.serve, swagger.setup(docs));
//}

app.use(errorHandler);

app.listen(config.server.port, () => {
  logger.info(`Server started on port ${config.server.port}`);
});
