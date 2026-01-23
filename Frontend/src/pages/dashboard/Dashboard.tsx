import { useAuth } from "../../hooks/useAuth";
import { FaMoneyBill } from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleDayReport } from "../../services/reportService";
import { formatAmount } from "../../utils/formatNumbers";

const Dashboard = () => {
  const { data } = useAuth();
  const { shop } = data?.data || {};
  const navigate = useNavigate();

  const {
    data: reportData,
    isLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["dailyReport"],
    queryFn: () => getSingleDayReport(),
  });
  console.log("repot data", reportData);

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
            className={`flex flex-col  col-span-full sm:col-span-1 rounded-2xl  gap-2 bg-linear-45 from-black/95 from-50% ${reportData?.data?.isLoss ? "to-red-800" : "to-green-800"} px-4 py-6 shadow-md`}
          >
            <span className=" flex justify-between items-center gap-4">
              <h1 className="text-gray-400 font-semibold">Net Profit</h1>
              <h1
                className={` ${reportData?.data?.isLoss ? "text-red-500" : "text-green-500"} font-semibold bg-green-500/20 px-4 py-1 rounded-full flex items-center gap-2`}
              >
                <BsGraphUpArrow className="" /> +12%
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
        <div className="col-span-full bg-amber-400 size-56 rounded-2xl w-full"></div>
      </div>
    </div>
  );
};

export default Dashboard;
