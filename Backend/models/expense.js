import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    Shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },

    title: {
      type: String,
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
        "Gas",
        "Other",
      ],
      default: "Other",
    },
    expenseDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

expenseSchema.index({ expenseDate: 1 });

export default mongoose.model("Expense", expenseSchema);
