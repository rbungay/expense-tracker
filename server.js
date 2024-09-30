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

//this renders showing the specific expense
app.get("/expense/:expenseId", async (req, res) => {
  const foundExpense = await Tracker.findById(req.params.expenseId);
  res.render("trackers/showexpense.ejs", { expense: foundExpense });
});

//renders a way to edit to actual item
app.get("/expense/:expenseID/edit", async (req, res) => {
  const foundExpense = await Tracker.findById(req.params.expenseID);
  res.render("trackers/updateexpense.ejs", { expense: foundExpense });
});

//as a user i want to create a way where people can update their expense from the expense ID.
app.put("/expense/:expenseID", async (req, res) => {
  const { expense_name, amount } = req.body;

  const foundExpense = await Tracker.findByIdAndUpdate(
    req.params.expenseID,
    {
      expense_name,
      amount,
    },
    { new: true }
  );
  res.redirect(`/expense/${req.params.expenseID}`);
});

app.delete("/expense/:expenseID", async (req, res) => {
  await Tracker.findByIdAndDelete(req.params.expenseID);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
