import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinaryConfig.js";
import shopItems from "../models/shopItems.js";
import Shop from "../models/shop.js";

export const createProduct = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;

  if (!shopId) {
    return res.status(401).json({ message: "Shop not found" });
  }

  const yourShop = await Shop.findById(shopId);
  if (!yourShop) {
    return res.status(404).json({ message: "Shop does not exist" });
  }

  const {
    shop,
    name,
    category,
    costPrice,
    sellingPrice,
    stock,
    unit,
    description,
    isActive,
  } = req.body;

  if (shop !== shopId.toString()) {
    return res
      .status(401)
      .json({ message: "You are not authorized to add product for this shop" });
  }

  if (!name || !sellingPrice) {
    return res
      .status(400)
      .json({ message: "Name and selling price are required" });
  }

  // ✅ Check for duplicate product name in this shop
  const existingProduct = await shopItems.findOne({ shop: shopId, name });
  if (existingProduct) {
    return res.status(400).json({
      message: "A product with this name already exists in your shop",
    });
  }

  // Upload image to Cloudinary if file exists
  let imageUrl;
  if (req.file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "product-images" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });
    imageUrl = result.secure_url;
  }

  const product = new shopItems({
    shop: shopId,
    name,
    image: imageUrl,
    category,
    costPrice,
    sellingPrice,
    stock,
    unit,
    description,
    isActive,
  });

  const createdProduct = await product.save();

  if (!createdProduct) {
    return res.status(500).json({ message: "Failed to create product" });
  }
  await yourShop.ShopProducts.push(createdProduct._id);
  await yourShop.save();

  res.status(201).json({
    message: "Product created successfully",
    product: createdProduct,
  });
});
