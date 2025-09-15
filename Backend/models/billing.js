import mongoose from "mongoose";

const BillingSchema = new mongoose.Schema(
  {
    Shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },

    billNumber: { type: String, required: true, unique: true },
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

    customerName: { type: String },
    customerPhone: { type: String },
  },
  { timestamps: true }
);

BillingSchema.index({ Shop: 1, billingDate: -1 });

const Billing = mongoose.model("Billing", BillingSchema);
export default Billing;
