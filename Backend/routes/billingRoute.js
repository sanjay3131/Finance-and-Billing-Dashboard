import express from "express";
import {
  addBill,
  billAnalytics,
  deleteBill,
  getAllBills,
  getBill,
  updateBill,
} from "../controllers/billingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// create bill
router.post("/addBill", protect, addBill);

// show bill by id
router.get("/getBill/:billId", protect, getBill);

// get all bills from to date
router.post("/getAllBills", protect, getAllBills);

// update bill
router.put("/updateBill/:id", protect, updateBill);

// delete bill
router.delete("/deleteBill/:id", protect, deleteBill);

// bill analytics
router.get("/billAnalytics", protect, billAnalytics);

export default router;
