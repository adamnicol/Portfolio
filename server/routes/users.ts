import express from "express";
import * as controller from "../controllers/user.controller";
import validate from "../middleware/validateSchema";
import schema from "../schemas/user.schema";

const router = express.Router();

router.post("/create", validate(schema), controller.create);

module.exports = router;
