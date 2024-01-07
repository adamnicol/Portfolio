import * as Sentry from "@sentry/node";
import checkAccessToken from "./middleware/checkAccessToken";
import compression from "compression";
import config from "./utils/config";
import cookies from "cookie-parser";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import express from "express";
import helmet from "helmet";
import log from "./utils/logger";
import requestLogger from "./middleware/requestLogger";
import responseTime from "response-time";
import routes from "./routes";
import swagger from "./middleware/swagger";

const app = express();

Sentry.init(config.sentry);

app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(cors(config.cors));
app.use(cookies());
app.use(compression());
app.use(helmet());
app.use(responseTime());
app.use(requestLogger);
app.use(checkAccessToken());
app.use(routes);
app.use(express.static(__dirname + "/public"));
app.use(swagger());
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(config.server.port, () => {
  log.info(`Server started on port ${config.server.port}`);
});
