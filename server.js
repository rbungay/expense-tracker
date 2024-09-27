import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();

mongoose.connect(process.env.MONDODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB ", mongoose.connection.name);
});

//this renders at starting area
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

//this renders when someone wants to create a new expense
app.get("/newexpense", (req, res) => {
  res.render("trackers/newexpense.ejs");
});

//this renders when someone wants to view all expenses
app.get("/viewall", (req, res) => {
  res.render("trackers/viewallexpense.ejs");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
