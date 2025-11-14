import asyncHandler from "express-async-handler";
import Expense from "../models/expense.js";
import Shop from "../models/shop.js";
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
  // sorting
  const sortBy = req.query.sort || "-expenseDate";
  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter = {
    Shop: shopId,
    expenseDate: { $gte: from, $lte: to },
  };

  const expenses = await Expense.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit);

  const total = await Expense.countDocuments(filter);
  res.status(200).json({
    success: true,
    total, // total docs
    page,
    limit,
    pages: Math.ceil(total / limit),
    data: expenses,
    message: `${expenses.length} Expenses fetched successfully`,
  });
});

// update expense
export const updateExpense = asyncHandler(async (req, res) => {
  const shopId = req.shop && req.shop._id;
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "id is required to update" });
  if (!req.body)
    return res.status(400).json({ message: "Request body is missing" });

  const { title, amount, category, note } = req.body;

  const expenseToUpdate = await Expense.findOne({ _id: id, Shop: shopId });
  if (!expenseToUpdate) {
    return res
      .status(404)
      .json({ message: "expense not found or not authorized" });
  }

  if (title !== undefined) expenseToUpdate.title = title;
  if (amount !== undefined) expenseToUpdate.amount = Number(amount);
  if (category !== undefined) expenseToUpdate.category = category;
  if (note !== undefined) expenseToUpdate.notes = note;

  await expenseToUpdate.save();

  res.status(200).json({
    message: "expense updated",
    data: expenseToUpdate,
  });
});

// delete expense
export const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const shopId = req.shop._id;

  const expenseToDelete = await Expense.findByIdAndDelete({
    _id: id,
    Shop: shopId,
  });
  if (!expenseToDelete)
    return res.status(400).json({
      message: "expense is not found or not authroized",
    });

  res.status(200).json({
    message: "expense deleted",
    expenseToDelete,
  });
});
