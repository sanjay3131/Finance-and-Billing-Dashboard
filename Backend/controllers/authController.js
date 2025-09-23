import asyncHandler from "express-async-handler";
import Shop from "../models/shop.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

// Signup a shop
export const signup = asyncHandler(async (req, res) => {
  const {
    ShopName,
    ShopAddress,
    ShopEmail,
    ShopPassword,
    ShopPhoneNumber,
    ShopOwnerName,
    ShopOwnerPhoneNumber,
    ShopOwnerEmail,
  } = req.body;
  if (
    !ShopName ||
    !ShopEmail ||
    !ShopPassword ||
    !ShopAddress ||
    !ShopOwnerName ||
    !ShopOwnerPhoneNumber ||
    !ShopPhoneNumber ||
    !ShopOwnerEmail
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingShop = await Shop.findOne({ ShopEmail });
  if (existingShop) {
    return res.status(400).json({ message: "Shop already exists" });
  }

  const hashedPassword = await bcrypt.hash(ShopPassword, 10);
  if (!hashedPassword) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  const shop = await Shop.create({
    ShopName,
    ShopEmail,
    ShopPassword: hashedPassword,
    ShopPhoneNumber,
    ShopAddress,
    ShopOwnerName,
    ShopOwnerPhoneNumber,
    ShopOwnerEmail,
  });
  res.status(201).json({
    message: "Shop created successfully",
    shop: {
      id: shop._id,
      ShopName: shop.ShopName,
      ShopEmail: shop.ShopEmail,
      ShopAddress: shop.ShopAddress,
      ShopOwnerName: shop.ShopOwnerName,
      ShopOwnerPhoneNumber: shop.ShopOwnerPhoneNumber,
      ShopOwnerEmail: shop.ShopOwnerEmail,
      ShopPhoneNumber: shop.ShopPhoneNumber,
    },
  });
});

// login a shop
export const login = asyncHandler(async (req, res) => {
  const { ShopEmail, ShopPassword } = req.body;
  if (!ShopEmail || !ShopPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const shop = await Shop.findOne({ ShopEmail });
  if (!shop) {
    return res.status(400).json({ message: "Shop does not exist" });
  }
  const isPasswordValid = await bcrypt.compare(ShopPassword, shop.ShopPassword);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = generateToken(shop._id, res);
  if (!token) {
    return res
      .status(500)
      .json({ message: "Something went wrong in token generation" });
  }
  res.status(200).json({
    message: "Login successful",
    token,
  });
});

// check shop

export const checkShop = asyncHandler(async (req, res) => {
  const shop = await req.shop;
  if (!shop) {
    return res.status(401).json({ message: "no shop found" });
  }
  res.status(200).json({ message: "shop found ", shop });
});

// logout the shop

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  });
  res.status(200).json({
    message: "shop is logged out",
  });
});
