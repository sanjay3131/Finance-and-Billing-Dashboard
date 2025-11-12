import express from "express";
import {
  addBill,
  getAllBills,
  getBill,
} from "../controllers/billingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// create bill
router.post("/addBill", protect, addBill);

// edit bill

// delete bill

// show bill
router.get("/getBill/:id", protect, getBill);

// get all bills from to date
router.post("/getAllBills", protect, getAllBills);

export default router;
