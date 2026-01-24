import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getWeeklySalesReport,
  getMonthlySalesReport,
  getYearlySalesReport,
  getCustomSalesReport,
} from "../../services/reportService";
import { formatAmount } from "../../utils/formatNumbers";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type PeriodType = "week" | "month" | "year" | "custom";

interface DayData {
  date: string;
  sales: number;
  billsCount: number;
  expenses: number;
  profit: number;
  profitPercentage: number;
}

interface ReportData {
  success: boolean;
  message: string;
  period: string;
  startDate: string;
  endDate: string;
  totalSales: number;
  totalExpenses: number;
  totalProfit: number;
  totalProfitPercentage: number;
  daysData: DayData[];
}

const SalesPerDay = () => {
  const [period, setPeriod] = useState<PeriodType>("week");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const getQueryFn = () => {
    switch (period) {
      case "week":
        return () => getWeeklySalesReport();
      case "month":
        return () => getMonthlySalesReport();
      case "year":
        return () => getYearlySalesReport();
      case "custom":
        if (!customStart || !customEnd) return null;
        return () => getCustomSalesReport(customStart, customEnd);
      default:
        return () => getWeeklySalesReport();
    }
  };

  const queryFn = getQueryFn();

  const {
    data: reportData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["salesReport", period, customStart, customEnd],
    queryFn: queryFn as () => Promise<{ data: ReportData }>,
    enabled: period !== "custom" || (!!customStart && !!customEnd),
  });

  const reportInfo = reportData?.data as ReportData;
  const isLoss = reportInfo?.totalProfit < 0;

  return (
    <div className="bg-primaryBg w-full min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Sales per Day</h1>

      {/* Period Selector */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            {["week", "month", "year", "custom"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p as PeriodType)}
                className={`px-4 py-2 rounded capitalize font-semibold transition ${
                  period === p
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Custom Date Range */}
          {period === "custom" && (
            <div className="flex gap-4 flex-col sm:flex-row">
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading report...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error?.message || "Failed to load report"}</p>
        </div>
      )}

      {/* Report Data */}
      {reportInfo && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Total Sales */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">
                Total Sales
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {formatAmount(reportInfo.totalSales)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {reportInfo.daysData.filter((d) => d.sales > 0).length} days
              </p>
            </div>

            {/* Total Expenses */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">
                Total Expenses
              </h3>
              <p className="text-2xl font-bold text-red-600">
                {formatAmount(reportInfo.totalExpenses)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {reportInfo.daysData.filter((d) => d.expenses > 0).length} days
              </p>
            </div>

            {/* Total Profit/Loss */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">
                Total Profit/Loss
              </h3>
              <p
                className={`text-2xl font-bold ${isLoss ? "text-red-600" : "text-green-600"}`}
              >
                {formatAmount(Math.abs(reportInfo.totalProfit))}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {isLoss ? "Loss" : "Profit"}
              </p>
            </div>

            {/* Profit Percentage */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">
                Profit %
              </h3>
              <p
                className={`text-2xl font-bold ${isLoss ? "text-red-600" : "text-green-600"}`}
              >
                {reportInfo.totalProfitPercentage}%
              </p>
              <p className="text-xs text-gray-500 mt-2">{reportInfo.period}</p>
            </div>
          </div>

          {/* Chart */}
          {reportInfo.daysData.length > 0 && (
            <div className="bg-white rounded-lg p-4 shadow mb-6">
              <h2 className="text-lg font-semibold mb-4">
                Daily Sales & Expenses
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportInfo.daysData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={12}
                  />
                  <YAxis fontSize={12} />
                  <Tooltip
                    formatter={(value) => formatAmount(value as number)}
                    contentStyle={{
                      backgroundColor: "#f3f4f6",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  <Bar dataKey="profit" fill="#10b981" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Detailed Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Bills
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                      Sales
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                      Expenses
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                      Profit/Loss
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                      Profit %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportInfo.daysData.map((day, idx) => (
                    <tr
                      key={idx}
                      className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
                    >
                      <td className="px-4 py-3 text-sm font-medium">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {day.billsCount}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-blue-600 font-medium">
                        {formatAmount(day.sales)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">
                        {formatAmount(day.expenses)}
                      </td>
                      <td
                        className={`px-4 py-3 text-sm text-right font-medium ${
                          day.profit < 0 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {formatAmount(day.profit)}
                      </td>
                      <td
                        className={`px-4 py-3 text-sm text-right font-medium ${
                          day.profit < 0 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {day.profitPercentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {reportInfo.daysData.length === 0 && (
            <div className="bg-white rounded-lg p-8 text-center shadow">
              <p className="text-gray-600">
                No sales data available for selected period
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SalesPerDay;
