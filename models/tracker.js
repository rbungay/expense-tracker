import mongoose from "mongoose";

const trackerSchema = new mongoose.Schema({
  expense_name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tracker = mongoose.model("Tracker", trackerSchema);

export default Tracker;
