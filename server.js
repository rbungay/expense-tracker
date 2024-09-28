import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Tracker from "./models/tracker.js";
import morgan from "morgan";
import methodOverride from "method-override";
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

mongoose.connect(process.env.MONDODB_URI);

//connecting do backend server
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB ", mongoose.connection.name);
});

//this renders at starting area
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

//this renders when someone wants to create a new expense and post expense
app.get("/newexpense", (req, res) => {
  res.render("trackers/newexpense.ejs");
});

app.post("/newexpense", async (req, res) => {
  console.log(req.body);
  await Tracker.create(req.body);

  res.redirect("/newexpense");
});

//this renders when someone wants to view all expenses
app.get("/viewall", async (req, res) => {
  const trackers = await Tracker.find({});
  res.render("trackers/viewallexpense.ejs", { trackers });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
