import express from "express";
import {
  createProduct,
  singleProducts,
  updateProducts,
  viewAllPoducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// create product
router.post("/addProduct", protect, upload.single("image"), createProduct);

// read Product

// get all Products
router.get("/viewAllProducts", protect, viewAllPoducts);

// get single Product by ID
router.get("/singleProduct/:id", protect, singleProducts);

// update Product
router.put(
  "/updateProduct/:id",
  protect,
  upload.single("image"),
  updateProducts
);

// delete Product

export default router;
