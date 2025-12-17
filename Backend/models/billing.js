import mongoose from "mongoose";
import { Counter } from "./counter.js";

const BillingSchema = new mongoose.Schema(
  {
    Shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },

    billNumber: { type: String, unique: true },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],

    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["cash", "upi"],
      default: "cash",
    },
    billingDate: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },

    customerName: { type: String },
    customerPhone: { type: String },
  },
  { timestamps: true }
);

BillingSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  console.log(month, day);

  const counter = await Counter.findOneAndUpdate(
    { name: `bill-${year}` },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const num = counter.seq.toString().padStart(3, "0");

  this.billNumber = `BILL-${day}-${month}-${year}-${num}`;

  next();
});

BillingSchema.index({ Shop: 1, billingDate: -1 });

const Billing = mongoose.model("Billing", BillingSchema);

export default Billing;
