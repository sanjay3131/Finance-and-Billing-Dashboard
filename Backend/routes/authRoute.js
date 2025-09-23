import express from "express";

import {
  signup,
  login,
  checkShop,
  logout,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
// sign up / create a shop
router.post("/signup", signup);

// login
router.post("/login", login);

// check the shop
router.get("/checkshop", protect, checkShop);

// logout the shop
router.get("/logout", protect, logout);

export default router;
