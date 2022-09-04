import express from "express";
import * as controller from "../controllers/news.controller";
import validate from "../middleware/validateSchema";
import schema from "../schemas/news.schema";

const router = express.Router();

router.get("/", controller.getAll);

router.post("/create", validate(schema), controller.create);

module.exports = router;
