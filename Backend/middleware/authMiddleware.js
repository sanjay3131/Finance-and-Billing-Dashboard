import Shop from "../models/shop.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const tokenFromCookie = req.cookies?.token;
  const authHeader = req.headers.authorization || "";
  const tokenFromHeader = (await authHeader.startsWith("Bearer "))
    ? authHeader.slice(7)
    : "";
  console.log("Token from cookie:", tokenFromCookie);
  console.log("Token from header:", tokenFromHeader);
  const token = tokenFromCookie || tokenFromHeader;
  console.log("Using token:", token);

  if (!token) {
    return res.status(401).json({ message: "not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "not authorized. token invalid" });
    }
    // console.log("decoded", decoded);

    req.shop = await Shop.findById(decoded.id).select("-ShopPassword");

    if (!req.shop) {
      return res
        .status(401)
        .json({ message: "not authorized, shop not found" });
    }
    // console.log("req.shop", req.shop);
    next();
  } catch (error) {
    return res.status(401).json({ message: "not authorized, invalid token" });
  }
};

export const protectOrSession = async (req, res, next) => {
  const tokenFromCookie = req.cookies?.token;
  const authHeader = req.headers.authorization || "";

  if (tokenFromCookie || authHeader.startsWith("Bearer ")) {
    return protect(req, res, next);
  }

  if (req.isAuthenticated && req.isAuthenticated()) {
    req.shop = req.user;
    return next();
  }

  return res
    .status(401)
    .json({ message: "not authorized, no token or session" });
};
