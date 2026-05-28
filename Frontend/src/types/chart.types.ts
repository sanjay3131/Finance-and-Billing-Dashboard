// types/chart.types.ts

export type ChartMode = "week" | "month" | "sixMonth" | "custom";

export interface SalesPerDay {
  date: string;
  day?: number;
  totalSales: number;
}

export interface ExpensePerDay {
  date: string;
  day?: number;
  totalExpense: number;
}

export interface ProfitPerDay {
  date: string;
  day?: number;
  totalSales: number;
  totalExpense: number;
  profit: number;
  profitPercentage: string;
}

export interface SalesPerMonth {
  month: number;
  totalSales: number;
}

export interface ExpensePerMonth {
  month: number;
  totalExpense: number;
}

export interface ReportData {
  startDate?: string;
  endDate?: string;
  salesPerDay?: SalesPerDay[];
  perdaySales?: SalesPerDay[];
  expensePerDay?: ExpensePerDay[];
  perdayExpense?: ExpensePerDay[];
  perdayProfit?: ProfitPerDay[];
  salesPerMonth?: SalesPerMonth[];
  expensePerMonth?: ExpensePerMonth[];
}
