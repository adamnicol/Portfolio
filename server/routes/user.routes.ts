import express from "express";
import * as controller from "../controllers/user.controller";
import validateSchema from "../middleware/validateSchema";
import { createUserSchema, loginSchema } from "../schemas/user.schema";

const router = express.Router();

// Registers a new user account.
router.post("/register", validateSchema(createUserSchema), controller.register);

// Authenticates a user and returns a JWT token if successful.
router.post("/login", validateSchema(loginSchema), controller.login);

module.exports = router;
