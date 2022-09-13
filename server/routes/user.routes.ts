import express from "express";
import * as controller from "../controllers/user.controller";
import validate from "../middleware/validateSchema";
import { createUserSchema, loginSchema } from "../schemas/user.schema";

const router = express.Router();

// Registers a new user account.
router.post("/register", validate(createUserSchema), controller.register);

// Authenticates a user and generates a JWT token if successful.
router.post("/login", validate(loginSchema), controller.login);

// Logs the user out and clears the JWT token.
router.post("/logout", controller.logout);

module.exports = router;
