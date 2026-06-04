import Shop from "../models/shop.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const tokenFromCookie = req.cookies?.token;
  const authHeader = req.headers.authorization || "";
  const tokenFromHeader = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : "";
  const token = tokenFromCookie || tokenFromHeader;

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
