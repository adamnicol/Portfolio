import asyncHandler from 'express-async-handler';
import contact from '../controllers/contact.controller';
import express, { Request, Response } from 'express';
import newsRouter from './news.routes';
import tunnel from '../controllers/sentry.controller';
import Status from '../utils/statusCodes';
import userRouter from './user.routes';

const routes = express.Router();

routes.use("/users", userRouter);
routes.use("/news", newsRouter);
routes.use("/contact", asyncHandler(contact));
routes.use("/sentry", express.text(), asyncHandler(tunnel));

routes.get("/healthcheck", (req: Request, res: Response) =>
  res.sendStatus(Status.OK)
);

export default routes;