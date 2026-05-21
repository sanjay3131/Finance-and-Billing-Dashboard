import asyncHandler from "express-async-handler";
import Billing from "../models/billing.js";
import Expense from "../models/expense.js";
import {
  expensePerDayHelperFunction,
  itemsSoldHelperFunction,
  salesPerDayHelperFunction,
} from "../utils/helperFunctions.js";

// Helper function to calculate profit/loss percentage
const calculateProfitLossPercentage = (totalSales, totalExpense) => {
  if (totalExpense === 0) return 0;
  const profit = totalSales - totalExpense;
  const percentage = (profit / totalExpense) * 100;
  return percentage.toFixed(2);
};

// Per Day Sales Report
export const perdaySalesReport = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;

  // date from params OR current date
  const date = req.params.date ? new Date(req.params.date) : new Date();

  const day = new Date(date);
  const start = new Date(day.setHours(0, 0, 0, 0));
  const end = new Date(day.setHours(23, 59, 59, 999));

  const sales = await Billing.find({
    Shop: shopId, // FIXED
    billingDate: { $gte: start, $lte: end }, // FIXED
  });

  const itemsSold = await itemsSoldHelperFunction(start, end, shopId);
  const expense = await Expense.find({
    Shop: shopId,
    expenseDate: { $gte: start, $lte: end },
  });
  const totalExpense = expense.reduce((acc, exp) => acc + exp.amount, 0);

  const totalSales = sales.reduce((acc, bill) => acc + bill.totalAmount, 0);
  const profit = totalSales - totalExpense;
  const isLoss = profit < 0;
  const profitPercentage = calculateProfitLossPercentage(
    totalSales,
    totalExpense,
  );
  res.status(200).json({
    success: true,
    message: "Per Day Sales Report",
    date: start.toDateString(),

    billsCount: sales.length,

    totalSales,
    totalExpense,
    profit: Math.abs(profit),
    isLoss,
    profitPercentage: profitPercentage,
    productsSold: itemsSold,
  });
});

// seven days sales report
export const sevenDaysSalesReport = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 7);

  const sales = await Billing.find({
    Shop: shopId,
    billingDate: { $gte: start, $lte: end },
  });
  console.log(sales);

  const itemsSold = await itemsSoldHelperFunction(start, end, shopId);

  const salesPerDay = await salesPerDayHelperFunction(start, end, shopId);

  const expensePerDay = await expensePerDayHelperFunction(start, end, shopId);

  const sevenDaysSales = Array(7).fill(0);

  const expense = await Expense.find({
    Shop: shopId,
    expenseDate: { $gte: start, $lte: end },
  });
  if (!expense || (expense.length === 0 && !sales) || sales.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No sales or expense data available for the last seven days",
    });
  }

  const totalExpense = expense.reduce((acc, exp) => acc + exp.amount, 0);

  const totalSales = sales.reduce((acc, bill) => acc + bill.totalAmount, 0);
  const profit = totalSales - totalExpense;
  const profitPercentage = calculateProfitLossPercentage(
    totalSales,
    totalExpense,
  );

  res.status(200).json({
    success: true,
    message: "Seven Days Sales Report",
    startDate: start.toDateString(),
    endDate: end.toDateString(),

    billsCount: sales.length,

    totalSales,
    totalExpense,
    profit,
    profitPercentage,
    productsSold: itemsSold,
    salesPerDay,
    expensePerDay,
  });
});

// 30 days sales report
export const thirtyDaysSalesReport = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);

  const sales = await Billing.find({
    Shop: shopId,
    billingDate: { $gte: start, $lte: end },
  });

  const expense = await Expense.find({
    Shop: shopId,
    expenseDate: { $gte: start, $lte: end },
  });

  const itemsSold = await itemsSoldHelperFunction(start, end, shopId);
  const perdaySales = await salesPerDayHelperFunction(start, end, shopId);
  const perdayExpense = await expensePerDayHelperFunction(start, end, shopId);
  const perdayProfit = perdaySales.map((sale) => {
    const expense =
      perdayExpense.find((exp) => exp.date === sale.date)?.totalExpense || 0;
    const profit = sale.totalSales - expense;
    const profitPercentage = calculateProfitLossPercentage(
      sale.totalSales,
      expense,
    );
    return {
      date: sale.date,
      totalSales: sale.totalSales,
      totalExpense: expense,
      profit,
      profitPercentage,
    };
  });

  if (!expense || (expense.length === 0 && !sales) || sales.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No sales or expense data available for the last thirty days",
    });
  }

  const totalExpense = expense.reduce((acc, exp) => acc + exp.amount, 0);

  const totalSales = sales.reduce((acc, bill) => acc + bill.totalAmount, 0);
  const profit = totalSales - totalExpense;
  const profitPercentage = calculateProfitLossPercentage(
    totalSales,
    totalExpense,
  );

  res.status(200).json({
    success: true,
    message: "Thirty Days Sales Report",
    startDate: start.toDateString(),
    endDate: end.toDateString(),

    billsCount: sales.length,

    totalSales,
    totalExpense,
    profit,
    profitPercentage,
    productsSold: itemsSold,
    perdaySales,
    perdayExpense,
    perdayProfit,
  });
});

// six months sales report
export const sixMonthsSalesReport = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;

  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 6);

  const sales = await Billing.find({
    Shop: shopId,
    billingDate: { $gte: start, $lte: end },
  });

  const expense = await Expense.find({
    Shop: shopId,
    expenseDate: { $gte: start, $lte: end },
  });
  if (!expense || (expense.length === 0 && !sales) || sales.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No sales or expense data available for the last six months",
    });
  }
  const itemsSold = await Billing.aggregate([
    {
      $match: {
        Shop: shopId,
        billingDate: { $gte: start, $lte: end },
      },
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.productName",
        quantity: { $sum: "$items.quantity" },
        totalSales: {
          $sum: { $multiply: ["$items.quantity", "$items.price"] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        productName: "$_id",
        quantity: 1,
        totalSales: 1,
      },
    },
    {
      $sort: {
        totalSales: -1,
      },
    },
  ]);

  const totalSalesThisYear = await Billing.aggregate([
    {
      $match: {
        Shop: shopId,
        billingDate: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$billingDate" } },
        totalSales: { $sum: "$totalAmount" },
      },
    },
    {
      $sort: { "_id.month": 1 },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        totalSales: 1,
      },
    },
  ]);

  const salesPerMonth = await Billing.aggregate([
    {
      $match: {
        Shop: shopId,
        billingDate: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$billingDate" } },
        totalSales: { $sum: "$totalAmount" },
      },
    },
    {
      $sort: { "_id.month": 1 },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        totalSales: 1,
      },
    },
  ]);

  const expensePerMonth = await Expense.aggregate([
    {
      $match: {
        Shop: shopId,
        expenseDate: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$expenseDate" } },
        totalExpense: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        totalExpense: 1,
      },
    },
    {
      $sort: { month: 1 },
    },
  ]);
  const totalExpense = expense.reduce((acc, exp) => acc + exp.amount, 0);

  const totalSales = sales.reduce((acc, bill) => acc + bill.totalAmount, 0);
  const profit = totalSales - totalExpense;
  const profitPercentage = calculateProfitLossPercentage(
    totalSales,
    totalExpense,
  );

  res.status(200).json({
    success: true,
    message: "Six Months Sales Report",
    startDate: start.toDateString(),
    endDate: end.toDateString(),

    billsCount: sales.length,
    itemsSold,
    totalSalesThisYear,
    salesPerMonth,
    expensePerMonth,

    totalSales,
    totalExpense,
    profit,
    profitPercentage,
  });
});

// custom sales report can be added similarly
export const customSalesReport = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;
  const { startDate, endDate } = req.body;

  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999); // include the entire end date

  const sales = await Billing.find({
    Shop: shopId,
    billingDate: { $gte: start, $lte: end },
  });

  const expense = await Expense.find({
    Shop: shopId,
    expenseDate: { $gte: start, $lte: end },
  });
  if (!expense || (expense.length === 0 && !sales) || sales.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No sales or expense data available for the selected date range",
    });
  }

  const totalExpense = expense.reduce((acc, exp) => acc + exp.amount, 0);

  const totalSales = sales.reduce((acc, bill) => acc + bill.totalAmount, 0);
  const profit = totalSales - totalExpense;
  const profitPercentage = calculateProfitLossPercentage(
    totalSales,
    totalExpense,
  );
  const itemsSold = await itemsSoldHelperFunction(start, end, shopId);
  const totalSalesPerMonth = await Billing.aggregate([
    {
      $match: {
        Shop: shopId,
        billingDate: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$billingDate" } },
        totalSales: { $sum: "$totalAmount" },
      },
    },
    {
      $sort: { "_id.month": 1 },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        totalSales: 1,
      },
    },
  ]);

  const totalExpensePerMonth = await Expense.aggregate([
    {
      $match: {
        Shop: shopId,
        expenseDate: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$expenseDate" } },
        totalExpense: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        totalExpense: 1,
      },
    },
    {
      $sort: { month: 1 },
    },
  ]);
  const perdaySales = await salesPerDayHelperFunction(start, end, shopId);
  const perdayExpense = await expensePerDayHelperFunction(start, end, shopId);
  const perdayProfit = perdaySales.map((sale) => {
    const expense =
      perdayExpense.find((exp) => exp.date === sale.date)?.totalExpense || 0;
    const profit = sale.totalSales - expense;
    const profitPercentage = calculateProfitLossPercentage(
      sale.totalSales,
      expense,
    );
    return {
      date: sale.date,
      totalSales: sale.totalSales,
      totalExpense: expense,
      profit,
      profitPercentage,
    };
  });

  res.status(200).json({
    success: true,
    message: "Custom Sales Report",
    startDate: start.toDateString(),
    endDate: end.toDateString(),

    billsCount: sales.length,

    totalSales,
    totalExpense,
    salesPerMonth: totalSalesPerMonth,
    expensePerMonth: totalExpensePerMonth,
    profit,
    profitPercentage,
    perdayProfit,
  });
});
