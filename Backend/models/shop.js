import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    ShopName: { type: String, required: true },
    ShopAddress: { type: String, required: true },
    ShopPhoneNumber: { type: String, required: true },
    ShopEmail: { type: String, unique: true, required: true },
    ShopPassword: { type: String, required: true }, 
    ShopOwnerName: { type: String, required: true },
    ShopOwnerPhoneNumber: { type: String, required: true },
    ShopOwnerEmail: { type: String, unique: true, required: true },
    ShopGstNumber: { type: String },

    ShopLogo: { type: String }, 
    ShopCoverPhoto: { type: String },
    ShopDescription: { type: String },

    ShopProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    ShopOpenAndCloseTime: {
      open: { type: String },
      close: { type: String },
    },

    ShopSocialLinks: {
      facebook: { type: String },
      instagram: { type: String },
      whatsapp: { type: String },
      website: { type: String },
    },


    CreatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
