import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinaryConfig.js";
import Product from "../models/shopItems.js";
import Shop from "../models/shop.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

// Create a new product
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
  const existingProduct = await Product.findOne({ shop: shopId, name });
  if (existingProduct) {
    return res.status(400).json({
      message: "A product with this name already exists in your shop",
    });
  }

  // Upload image to Cloudinary if file exists
  let imageData;
  if (req.file) {
    imageData = await uploadToCloudinary(req.file.buffer, "product-images");
  }

  const product = new Product({
    shop: shopId,
    name,
    image: imageData,
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

// view all Products

export const viewAllPoducts = asyncHandler(async (req, res) => {
  const allProducts = await Product.find({});

  if (!allProducts || allProducts.length === 0)
    return res.status(404).json({ message: "No Products Avaliable" });
  const length = allProducts.length;

  res.status(200).json({
    message: "products of shop",
    allProducts,
    length,
  });
});

// view single

export const singleProducts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(404).json({ message: "ID is needed to find Products" });

  const productById = await Product.findById(id);

  if (!productById)
    return res.status(404).json({
      message: "Product not Found",
    });

  res.status(200).json({
    message: "Product found",
    productById,
  });
});

// update Products
export const updateProducts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const shopId = req.shop._id;
  console.log(shopId);

  if (!id)
    return res.status(404).json({
      message: "id is nedded to update product",
    });

  const {
    name,
    category,
    sellingPrice,
    costPrice,
    stock,
    isActive,
    unit,
    description,
  } = req.body;

  const productToUpdate = await Product.findById(id);
  if (!productToUpdate)
    return res.status(404).json({
      message: "no product found",
    });

  if (productToUpdate.shop.toString() !== shopId.toString()) {
    return res.status(400).json({
      message: "not authorized to update this product",
    });
  }

  !name ? null : (productToUpdate.name = name);
  !category ? null : (productToUpdate.category = category);
  !sellingPrice ? null : (productToUpdate.sellingPrice = sellingPrice);
  !costPrice ? null : (productToUpdate.costPrice = costPrice);
  !stock ? null : (productToUpdate.stock = stock);
  isActive === undefined ? null : (productToUpdate.isActive = isActive);
  !unit ? null : (productToUpdate.unit = unit);
  !description ? null : (productToUpdate.description = description);
  if (req.file) {
    console.log("file is there");

    const imageData = await uploadToCloudinary(
      req.file.buffer,
      "product-images"
    );
    productToUpdate.image = imageData;
  }

  await productToUpdate.save();

  res.status(200).json({
    message: "product updated",
    productToUpdate,
  });
});
