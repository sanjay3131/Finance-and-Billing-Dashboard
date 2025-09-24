import express from "express";
import { createProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// create product
router.post("/addProduct", protect, upload.single("image"), createProduct);
// read Product

// update Product

// delete Product

export default router;
