import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();

mongoose.connect(process.env.MONDODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB ", mongoose.connection.name);
});

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
