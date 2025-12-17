import express from "express";
import {
  addExpense,
  deleteExpense,
  expenseAnalytics,
  getAllExpenses,
  getExpense,
  updateExpense,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// create expense
router.post("/addExpense", protect, addExpense);

// Read expense
router.get("/getExpense/:id", protect, getExpense);

//get all expenses from to date
router.post("/getAllExpenses", protect, getAllExpenses);

// update expense
router.put("/updateExpense/:id", protect, updateExpense);

// delete expense

router.delete("/deleteExpense/:id", protect, deleteExpense);

// analytics
router.get("/expenseAnalytics", protect, expenseAnalytics);
export default router;
