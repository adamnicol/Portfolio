import express, { Request, Response } from "express";
import Status from "./utils/statusCodes";
import cors from "cors";

const app = express();
const database = require("./database");

app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/users"));
app.use("/api/news", require("./routes/news"));

app.get("/api/status", (request: Request, response: Response) =>
  response.sendStatus(Status.OK)
);

app.listen(3001, () => {
  console.log("Server started");
  database.connect();
});
