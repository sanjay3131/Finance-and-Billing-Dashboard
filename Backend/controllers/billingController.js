import asyncHandler from "express-async-handler";
import Billing from "../models/billing.js";
import { calculateTotal, normalizeItems } from "../utils/helperFunctions.js";

//create bill
export const addBill = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;

  const {
    Shop,
    items,
    totalAmount,
    paymentMethod,
    customerName,
    customerPhone,
    status,
  } = req.body;

  if (Shop.toString() !== shopId.toString()) {
    return res.status(400).json({ message: "not authorized to add bill" });
  }

  if (!Shop || !items || !totalAmount) {
    return res.status(400).json({
      message: "all filed required",
    });
  }
  const normalizedItems = normalizeItems(items);
  const calulateTotalAmount = calculateTotal(normalizedItems);
  const bill = await Billing.create({
    Shop,
    items: normalizedItems,
    totalAmount: calulateTotalAmount,
    paymentMethod,
    customerName,
    customerPhone,
    status,
  });

  res.status(201).json(bill);
});

//read bill
export const getBill = asyncHandler(async (req, res) => {
  const { billNumber } = req.params;
  console.log(billNumber);

  const shopId = req.shop._id;

  const bill = await Billing.findOne({
    Shop: shopId,
    billNumber: billNumber,
  }).populate({
    path: "items.product",
    select: "image", // include image and product id
  });
  if (!bill) {
    res.status(404).json({
      success: false,
      message: "Bill not found",
    });
    return;
  }
  console.log(bill);

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

  console.log("Body: ", req.body);
  const { fromDate = startOfToday, toDate = endOfToday } = req.body;
  console.log(fromDate, toDate);

  const bills = await Billing.find({
    Shop: shopId,
    billingDate: { $gte: fromDate, $lte: toDate },
  })
    // include product reference with image and id
    .populate({
      path: "items.product",
      select: "image", // id is included by default
    })
    .sort({ billingDate: -1 });

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

export const updateBill = asyncHandler(async (req, res) => {
  const shopId = req.shop && req.shop._id;
  const { id } = req.params;
  const {
    items,
    totalAmount,
    customerName,
    customerPhone,
    paymentMethod,
    status,
  } = req.body;

  let bill = await Billing.findById(id);
  if (!bill) {
    res.status(404).json({
      success: false,
      message: "Bill not found",
    });
    return;
  }

  if (bill.Shop.toString() !== shopId.toString()) {
    res.status(401).json({
      success: false,
      message: "Not authorized to update this bill",
    });
    return;
  }

  bill.items = items || bill.items;
  bill.totalAmount = totalAmount || bill.totalAmount;
  bill.customerName = customerName || bill.customerName;
  bill.customerPhone = customerPhone || bill.customerPhone;
  bill.paymentMethod = paymentMethod || bill.paymentMethod;
  bill.status = status || bill.status;

  await bill.save();
  res.status(200).json({
    success: true,
    message: "Bill updated successfully",
    data: bill,
  });
});

//delete bill
export const deleteBill = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;
  const { id } = req.params;

  const bill = await Billing.findOneAndDelete({ _id: id, Shop: shopId });
  if (!bill) {
    res.status(404).json({
      success: false,
      message: "Bill not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Bill deleted successfully",
  });
});

// bill analytics - total sales
export const billAnalytics = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;
  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);
  const endOfSixMonths = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );
  const getFullYear = today.getFullYear();

  const totalSalesToday = await Billing.aggregate([
    {
      $match: {
        Shop: shopId,
        billingDate: { $gte: startOfToday, $lte: endOfToday },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalAmount" },
      },
    },
  ]);

  const totalSalesThisMonth = await Billing.aggregate([
    {
      $match: {
        Shop: shopId,
        billingDate: { $gte: startOfMonth, $lte: endOfMonth },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalAmount" },
      },
    },
  ]);

  const totalSalesLastSixMonths = await Billing.aggregate([
    {
      $match: {
        Shop: shopId,
        billingDate: { $gte: sixMonthsAgo, $lte: endOfSixMonths },
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
  ]);
  const totalSalesThisYear = await Billing.aggregate([
    {
      $match: {
        Shop: shopId,
        billingDate: {
          $gte: new Date(getFullYear, 0, 1),
          $lte: new Date(getFullYear, 11, 31, 23, 59, 59, 999),
        },
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
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalSalesToday: totalSalesToday[0] ? totalSalesToday[0].totalSales : 0,
      totalSalesThisMonth: totalSalesThisMonth[0]
        ? totalSalesThisMonth[0].totalSales
        : 0,
      totalSalesLastSixMonths,
      totalSalesThisYear,
    },
  });
});
