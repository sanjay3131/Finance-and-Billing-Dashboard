import Billing from "../models/billing.js";
import expense from "../models/expense.js";

export const normalizeItems = (items) => {
  const map = new Map();

  for (const item of items) {
    const key = item.product.toString();

    if (map.has(key)) {
      map.get(key).quantity += item.quantity;
    } else {
      map.set(key, { ...item });
    }
  }

  return Array.from(map.values());
};

// total calculation
export const calculateTotal = (items) =>
  items.reduce((sum, i) => sum + i.quantity * i.price, 0);

// items sold

export const itemsSoldHelperFunction = async (start, end, shopId) => {
  const result = await Billing.aggregate([
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
    { $sort: { totalSales: -1 } },
  ]);

  return result;
};

export const salesPerDayHelperFunction = async (start, end, shopId) => {
  const result = await Billing.aggregate([
    {
      $match: {
        Shop: shopId,
        billingDate: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$billingDate",
          },
        },
        totalSales: { $sum: "$totalAmount" },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        totalSales: 1,
        day: {
          $dayOfWeek: {
            $dateFromString: {
              dateString: "$_id",
              format: "%Y-%m-%d",
            },
          },
        },
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ]);
  return result;
};

export const expensePerDayHelperFunction = async (start, end, shopId) => {
  const result = await expense.aggregate([
    {
      $match: {
        Shop: shopId,
        expenseDate: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$expenseDate",
          },
        },
        totalExpense: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        totalExpense: 1,
        day: {
          $dayOfWeek: {
            $dateFromString: {
              dateString: "$_id",
              format: "%Y-%m-%d",
            },
          },
        },
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ]);
  return result;
};
