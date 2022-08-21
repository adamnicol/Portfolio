const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_STRING, () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(cors);

app.listen(3001, () => {
  console.log("Server started");
});
