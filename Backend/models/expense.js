import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  Shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },

  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Raw Materials",
      "Salary",
      "Rent",
      "Electricity",
      "Maintenance",
      "Other",
    ],

    required: true,
  },
});
