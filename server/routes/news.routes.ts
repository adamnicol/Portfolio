import express from "express";
import * as controller from "../controllers/news.controller";
import validate from "../middleware/validateSchema";
import schema from "../schemas/news.schema";

const router = express.Router();

router.get("/all", controller.getAll);
router.get("/top/:count?", controller.getTop);
router.get("/tags", controller.getTags);
router.get("/:tag", controller.getByTag);
router.get("/post/:id", controller.getById);
router.get("/count/all", controller.count);
router.get("/count/:tag", controller.countByTag);

router.post("/post", validate(schema), controller.post);

module.exports = router;
