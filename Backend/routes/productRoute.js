import express from "express";
import {
  createProduct,
  deleteAllProducts,
  deleteSingleProduct,
  singleProducts,
  updateProducts,
  viewAllProducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// create product
router.post("/addProduct", protect, upload.single("image"), createProduct);

// read Product

// get all Products
router.get("/viewAllProducts", protect, viewAllProducts);

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
// delete single product
router.delete("/deleteSingleProduct/:id", protect, deleteSingleProduct);

// delete all products
router.delete("/deleteAllProducts", protect, deleteAllProducts);
export default router;
