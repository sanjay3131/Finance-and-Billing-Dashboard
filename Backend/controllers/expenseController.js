import asyncHandler from "express-async-handler";
import Expense from "../models/expense.js";
// create expense
export const addExpense = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;
  const { title, amount, category, note } = req.body;

  if (!shopId) {
    res.status(400).json({
      success: false,
      message: "Shop ID is required",
    });
    return;
  }

  if (!amount || !title) {
    res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
    return;
  }

  const expense = await Expense.create({
    Shop: shopId,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json({
    success: true,
    message: "Expense added successfully",
    data: expense,
  });
});

// Read expense

export const getExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const shopId = req.shop._id;

  const expense = await expense.findOne({ _id: id, shop: shopId });
  if (expense.shop.toString() !== shopId.toString()) {
    res.status(404).json({
      success: false,
      message: "Expense not found or not authorized",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: expense,
  });
});

//get all expenses from to date
export const getAllExpenses = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;
  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  const { from = startOfToday, to = endOfToday } = req.body;
  console.log(from, to);

  const expenses = await Expense.find({
    Shop: shopId,
    expenseDate: { $gte: from, $lte: to },
  }).sort({
    expenseDate: -1,
  });

  res.status(200).json({
    success: true,
    data: expenses,
    count: expenses.length,
    message: `${expenses.length} Expenses fetched successfully`,
  });
});

// update expense

// delete expense
