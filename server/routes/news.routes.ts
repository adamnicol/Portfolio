import express from "express";
import * as controller from "../controllers/news.controller";
import validate from "../middleware/validateSchema";
import schema from "../schemas/news.schema";

const router = express.Router();

router.get("/", controller.get);
router.get("/count", controller.count);

router.post("/post", validate(schema), controller.post);

module.exports = router;
