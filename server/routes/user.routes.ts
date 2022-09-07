import express from "express";
import * as controller from "../controllers/user.controller";
import validate from "../middleware/validateSchema";
import schema from "../schemas/user.schema";

const router = express.Router();

router.post("/register", validate(schema), controller.register);

module.exports = router;
