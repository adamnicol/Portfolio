import asyncHandler from 'express-async-handler';
import contact from '../controllers/contact.controller';
import express, { Request, Response } from 'express';
import newsRouter from './news.routes';
import Status from '../utils/statusCodes';
import userRouter from './user.routes';

const routes = express.Router();

routes.use("/users", userRouter);
routes.use("/news", newsRouter);
routes.use("/contact", asyncHandler(contact));

routes.get("/healthcheck", (req: Request, res: Response) =>
  res.sendStatus(Status.OK)
);

export default routes;