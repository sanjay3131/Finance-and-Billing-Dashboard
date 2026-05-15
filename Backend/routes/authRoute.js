import express from "express";
import passport from "passport";
import {
  signup,
  login,
  checkShop,
  logout,
  googleCallback,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
// sign up / create a shop
router.post("/signup", signup);

// login
router.post("/login", login);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback,
);

// check the shop
router.get("/checkshop", protect, checkShop);

// logout the shop
router.get("/logout", protect, logout);

export default router;
