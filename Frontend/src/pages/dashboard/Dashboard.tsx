import { useAuth } from "../../hooks/useAuth";
import { FaMoneyBill } from "react-icons/fa6";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  customerReport,
  getSingleDayReport,
  monthlyReport,
  sixMonthReport,
  weeklyReport,
} from "../../services/reportService";
import { formatAmount } from "../../utils/formatNumbers";
import { useState } from "react";
import DatePicker from "../../components/ui/DatePicker";
import Charts from "../../components/ui/Charts";
import ItemsSoldData from "../../components/ui/ItemsSoldData";
import ReportCards from "../../components/ui/ReportCards";

const Dashboard = () => {
  const { data } = useAuth();

  console.log("auth data", data);
  const [customDateRange, setCustomDateRange] = useState<{
    fromDate: string;
    toDate: string;
  }>({
    fromDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    toDate: new Date().toISOString().split("T")[0],
  });
  const { shop } = data || {};
  const navigate = useNavigate();
  // daily repost
  const {
    data: reportData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dailyReport"],
    queryFn: () => getSingleDayReport(),
  });
  console.log("daily report : ", reportData);

  // customer report
  const { data: customerReportData } = useQuery({
    queryKey: [
      "customerReport",
      customDateRange.fromDate,
      customDateRange.toDate,
    ],
    queryFn: () =>
      customerReport(customDateRange.fromDate, customDateRange.toDate),
  });
  console.log("customer report data", customerReportData);
  // weekly report
  const { data: weeklyReportData } = useQuery({
    queryKey: ["weeklyReport"],
    queryFn: () => weeklyReport(),
  });
  console.log("weekly report data", weeklyReportData);

  // monthly report
  const { data: monthlyReportData } = useQuery({
    queryKey: ["monthlyReport"],
    queryFn: () => monthlyReport(),
  });
  console.log("monthly report data", monthlyReportData);
  // six month report
  const { data: sixMonthReportData } = useQuery({
    queryKey: ["sixMonthReport"],
    queryFn: () => sixMonthReport(),
  });
  console.log("six month report data", sixMonthReportData);

  // chart button state
  const [activeChart, setActiveChart] = useState<
    "week" | "month" | "sixMonth" | "custom" | "today"
  >("today");

  // items sold data state
  return (
    <div className=" bg-primaryBg w-full min-h-screen p-4 min-w-75">
      {/* logged in user details */}
      <div className="flex  justify-between  items-center">
        {/* shop name */}
        <h1 className="font-bold text-2xl">{shop?.ShopName}</h1>
        {/* notification */}
        <div>
          <button className="bg-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* overview cards */}
      <div className="w-full min-w-75 ">
        <h1 className="text-gray-400 font-semibold">Today's Overviews</h1>
        {/* cards */}
        <div className="grid grid-cols-2  sm:grid-cols-3 gap-4   w-full p-4 min-w-50">
          {/* total sales */}
          <div className="flex flex-col justify-center p-2 rounded-2xl  shadow-md gap-2 bg-white px-4  min-w-25">
            <span className="text-green-500 bg-green-300/20 p-2 rounded-sm w-fit">
              <FaMoneyBill />
            </span>
            <h1 className="font-semibold text-gray-400 text-[14px]">
              Total Sales
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold ">
              {isLoading
                ? "Loading..."
                : isError
                  ? "Error"
                  : formatAmount(reportData?.data?.totalSales || 0)}
            </h2>
          </div>

          {/* total expenses */}
          <div className="flex flex-col justify-center p-2 rounded-2xl shadow-md gap-2 bg-white px-4  min-w-25">
            <span className={`text-red-500 bg-red-300/20 p-2 rounded-sm w-fit`}>
              <FaShoppingBag />
            </span>
            <h1 className="font-semibold text-gray-400 text-[14px]">
              Total Expenses
            </h1>
            <h2 className="text-xl font-bold">
              {formatAmount(reportData?.data?.totalExpense || 0)}
            </h2>
          </div>
          {/* net Profit */}
          <div
            className={`flex flex-col  col-span-full sm:col-span-1 rounded-2xl  gap-2 bg-linear-45 from-black/95 from-30% ${reportData?.data?.isLoss ? "to-red-800" : "to-green-800 "} px-4 py-6 shadow-md   min-w-25`}
          >
            <span className=" flex justify-between items-center gap-4">
              <h1 className="text-gray-400 font-semibold">Net Profit</h1>
              <h1
                className={` ${reportData?.data?.isLoss ? "text-red-500" : "text-green-500"} font-semibold bg-green-500/20 px-4 py-1 rounded-full flex items-center gap-2`}
              >
                {reportData?.data?.isLoss ? (
                  <BsGraphDownArrow className="" />
                ) : (
                  <BsGraphUpArrow className="" />
                )}
                {reportData?.data?.profitPercentage}%
              </h1>
            </span>
            <h2
              className={`${reportData?.data?.isLoss ? "text-red-500" : "text-green-500"} text-2xl font-bold`}
            >
              {isLoading
                ? "Loading..."
                : isError
                  ? "Error"
                  : formatAmount(reportData?.data?.profit || 0)}
            </h2>
          </div>
        </div>
      </div>

      {/* quick actions */}

      <div className="">
        <h1 className="text-gray-400 font-semibold">Quick Actions</h1>
        {/* create bill */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 min-w-50 max-w-150">
          <div
            className="flex flex-col justify-center p-4 rounded-2xl  shadow-md gap-2 bg-white px-4  min-w-25 w-full"
            onClick={() => navigate("/billing")}
          >
            <span className="text-yellow-500 bg-yellow-300/20 p-2 rounded-sm w-fit">
              <IoReceiptSharp className="text-2xl p-1 rounded-sm" />
            </span>

            <h1 className="font-semibold">Create New Bill</h1>
          </div>

          {/* add expense */}
          <div
            className="flex flex-col justify-start p-4 rounded-2xl  shadow-md gap-2 bg-white px-4  min-w-25 w-full"
            onClick={() => navigate("/expense")}
          >
            <span className="text-black bg-purple-300/20 p-2 rounded-sm w-fit">
              <LuNotebookPen className="text-2xl  p-1 rounded-sm" />
            </span>
            <h1 className="font-semibold">Add Expense</h1>
          </div>
        </div>

        {/* revenue Trends */}
        <div className="col-span-full rounded-2xl w-full">
          {/* week 30days, sixMonth and custom buttons */}
          <div className="flex flex-col gap-2 p-1 sm:flex-row sm:items-center sm:justify-between font-semibold">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveChart("today")}
                className={`px-3 py-2 rounded-md ${activeChart === "today" ? "bg-blue-500/15 text-blue-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                Today
              </button>
              <button
                onClick={() => setActiveChart("week")}
                className={`px-3 py-2 rounded-md ${activeChart === "week" ? "bg-blue-500/15 text-blue-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                Week
              </button>
              <button
                onClick={() => setActiveChart("month")}
                className={`px-3 py-2 rounded-md ${activeChart === "month" ? "bg-blue-500/15 text-blue-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                30 Days
              </button>
              <button
                onClick={() => setActiveChart("sixMonth")}
                className={`px-3 py-2 rounded-md ${activeChart === "sixMonth" ? "bg-blue-500/15 text-blue-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                6 Months
              </button>
              <button
                onClick={() => setActiveChart("custom")}
                className={`px-3 py-2 rounded-md ${activeChart === "custom" ? "bg-blue-500/15 text-blue-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                Custom
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1  gap-6 md:justify-between">
            <div className="space-y-4">
              {activeChart === "custom" && (
                <div className="w-full max-w-full">
                  <DatePicker
                    date={{
                      fromDate: customDateRange.fromDate,
                      toDate: customDateRange.toDate,
                    }}
                    setDate={setCustomDateRange}
                  />
                </div>
              )}

              <div className="w-full max-w-full flex flex-col gap-4">
                <Charts
                  dataFor={activeChart}
                  reportData={
                    activeChart === "week"
                      ? weeklyReportData?.data
                      : activeChart === "today"
                        ? weeklyReportData?.data
                        : activeChart === "month"
                          ? monthlyReportData?.data
                          : activeChart === "sixMonth"
                            ? sixMonthReportData?.data
                            : customerReportData?.data
                  }
                />
              </div>
            </div>
          </div>

          {/* total sales data  */}
          <ReportCards
            title={
              activeChart === "today"
                ? "Today's"
                : activeChart === "week"
                  ? "Weekly"
                  : activeChart === "month"
                    ? "Monthly"
                    : activeChart === "sixMonth"
                      ? "6 Month"
                      : activeChart === "custom"
                        ? "Custom"
                        : "Today's"
            }
            totalSales={
              activeChart === "today"
                ? reportData?.data?.totalSales
                : activeChart === "week"
                  ? weeklyReportData?.data?.totalSales
                  : activeChart === "month"
                    ? monthlyReportData?.data?.totalSales
                    : activeChart === "sixMonth"
                      ? sixMonthReportData?.data?.totalSales
                      : activeChart === "custom"
                        ? customerReportData?.data?.totalSales
                        : reportData?.data?.totalSales
            }
            totalExpense={
              activeChart === "today"
                ? reportData?.data?.totalExpense
                : activeChart === "week"
                  ? weeklyReportData?.data?.totalExpense
                  : activeChart === "month"
                    ? monthlyReportData?.data?.totalExpense
                    : activeChart === "sixMonth"
                      ? sixMonthReportData?.data?.totalExpense
                      : activeChart === "custom"
                        ? customerReportData?.data?.totalExpense
                        : reportData?.data?.totalExpense
            }
            profit={
              activeChart === "today"
                ? reportData?.data?.profit
                : activeChart === "week"
                  ? weeklyReportData?.data?.profit
                  : activeChart === "month"
                    ? monthlyReportData?.data?.profit
                    : activeChart === "sixMonth"
                      ? sixMonthReportData?.data?.profit
                      : activeChart === "custom"
                        ? customerReportData?.data?.profit
                        : reportData?.data?.profit
            }
            isLoss={
              activeChart === "today"
                ? reportData?.data?.isLoss
                : activeChart === "week"
                  ? weeklyReportData?.data?.isLoss
                  : activeChart === "month"
                    ? monthlyReportData?.data?.isLoss
                    : activeChart === "sixMonth"
                      ? sixMonthReportData?.data?.isLoss
                      : activeChart === "custom"
                        ? customerReportData?.data?.isLoss
                        : reportData?.data?.isLoss
            }
            billsCount={
              activeChart === "today"
                ? reportData?.data?.billsCount
                : activeChart === "week"
                  ? weeklyReportData?.data?.billsCount
                  : activeChart === "month"
                    ? monthlyReportData?.data?.billsCount
                    : activeChart === "sixMonth"
                      ? sixMonthReportData?.data?.billsCount
                      : activeChart === "custom"
                        ? customerReportData?.data?.billsCount
                        : reportData?.data?.billsCount
            }
            isLoading={isLoading}
            isError={isError}
            activeDays={
              activeChart === "today"
                ? reportData?.data?.activeDays
                : activeChart === "week"
                  ? weeklyReportData?.data?.activeDays
                  : activeChart === "month"
                    ? monthlyReportData?.data?.activeDays
                    : activeChart === "sixMonth"
                      ? sixMonthReportData?.data?.activeDays
                      : activeChart === "custom"
                        ? customerReportData?.data?.activeDays
                        : reportData?.data?.activeDays
            }
            profitPercentage={
              activeChart === "today"
                ? reportData?.data?.profitPercentage
                : activeChart === "week"
                  ? weeklyReportData?.data?.profitPercentage
                  : activeChart === "month"
                    ? monthlyReportData?.data?.profitPercentage
                    : activeChart === "sixMonth"
                      ? sixMonthReportData?.data?.profitPercentage
                      : activeChart === "custom"
                        ? customerReportData?.data?.profitPercentage
                        : reportData?.data?.profitPercentage
            }
          />

          {/* item sold data */}
          <div className="w-full  mt-12 md:mt-12">
            <ItemsSoldData
              productsSold={
                activeChart === "today"
                  ? reportData?.data?.productsSold
                  : activeChart === "week"
                    ? weeklyReportData?.data?.productsSold
                    : activeChart === "month"
                      ? monthlyReportData?.data?.productsSold
                      : activeChart === "sixMonth"
                        ? sixMonthReportData?.data?.itemsSold
                        : customerReportData?.data?.productsSold
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
