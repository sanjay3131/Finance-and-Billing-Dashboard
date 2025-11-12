import asyncHandler from "express-async-handler";
import Billing from "../models/billing.js";

//create bill
export const addBill = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;

  const {
    Shop,
    billNumber,
    items,
    totalAmount,
    PaymentMethod,
    customerName,
    customerPhone,
  } = req.body;

  if (Shop.toString() !== shopId.toString()) {
    return res.status(400).json({ message: "not authorized to add bill" });
  }

  if (!Shop || !billNumber || !items || !totalAmount) {
    return res.status(400).json({
      message: "all filed required",
    });
  }
  const bill = await Billing.create({
    Shop,
    billNumber,
    items,
    totalAmount,
    PaymentMethod,
    customerName,
    customerPhone,
  });

  res.status(201).json(bill);
});

//read bill
export const getBill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const shopId = req.shop._id;

  const bill = await Billing.findOne({ _id: id, Shop: shopId });
  if (bill.Shop.toString() !== shopId.toString()) {
    res.status(404).json({
      success: false,
      message: "Bill not found or not authorized",
    });
    return;
  }

  res.status(200).json({
    message: "Bill fetched successfully",
    data: bill,
  });
});

//get all bills from to date
export const getAllBills = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;

  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  const { fromDate = startOfToday, toDate = endOfToday } = req.body;
  console.log(fromDate, toDate);

  const bills = await Billing.find({
    Shop: shopId,
    billingDate: { $gte: fromDate, $lte: toDate },
  }).sort({ billingDate: -1 });

  if (!bills || bills.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No bills found for the given date range",
    });
  }

  res.status(200).json({
    message: "Bills fetched successfully",
    data: bills,
  });
});

//update bill

//delete bill
