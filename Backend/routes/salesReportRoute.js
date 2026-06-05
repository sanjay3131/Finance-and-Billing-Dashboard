import express from "express";
import {
  customSalesReport,
  mostSoldProductsReport,
  perdaySalesReport,
  sevenDaysSalesReport,
  sixMonthsSalesReport,
  thirtyDaysSalesReport,
} from "../controllers/salesReportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// per day sales report
router.get("/perdaySalesReport/:date", protect, perdaySalesReport);

// seven days sales report
router.get("/sevenDaysSalesReport", protect, sevenDaysSalesReport);

// thirty days sales report
router.get("/thirtyDaysSalesReport", protect, thirtyDaysSalesReport);

// six months sales report
router.get("/sixMonthsSalesReport", protect, sixMonthsSalesReport);

// custom sales report
router.post("/customSalesReport", protect, customSalesReport);

// top selling products report
router.post("/topSellingProductsReport", protect, mostSoldProductsReport);
export default router;
