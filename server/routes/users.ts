import express from "express";

const controller = require("../controllers/user.controller");
const router = express.Router();

router.post("/create", controller.create);

module.exports = router;
