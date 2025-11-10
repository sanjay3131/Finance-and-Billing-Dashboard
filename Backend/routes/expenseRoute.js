import express from "express";
import {
  addExpense,
  getAllExpenses,
  getExpense,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//get all expenses from to date
router.post("/getAllExpenses", protect, getAllExpenses);
// create expense
router.post("/addExpense", protect, addExpense);

// Read expense
router.get("/getExpense/:id", protect, getExpense);

// update expense

// delete expense

export default router;
