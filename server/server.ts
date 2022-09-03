import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const database = require("./database");

app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/users"));
app.use("/api/news", require("./routes/news"));

app.get("/api/status", (req: Request, res: Response) => res.sendStatus(200));

app.listen(3001, () => {
  console.log("Server started");
  database.connect();
});
