import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Food", "Beverage", "Stationery", "Electronics", "Other"],
      default: "Other",
    },
    costPrice: {
      type: Number,
      required: true, // purchase price
    },
    sellingPrice: {
      type: Number,
      required: true, // billing price
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      type: String,
      enum: ["kg", "litre", "piece", "pack", "other"],
      default: "piece",
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
