import { useQuery } from "@tanstack/react-query";
import { GetAllBills, useUpdateBill } from "../../services/billingServices";
import { useState } from "react";
import type { readBillInterface } from "../../utils/constants";
import { FaArrowLeft, FaMoneyBillWave } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { formatAmount } from "../../utils/formatNumbers";
import { IoQrCodeSharp, IoShareSocialOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LuPrinter } from "react-icons/lu";

const BillHistory = () => {
  const navigate = useNavigate();
  const today = new Date();
  const isoToday = today.toISOString().split("T")[0];
  const [date, setDate] = useState({
    // default from/to both set to today's date (start and end of current day)
    fromDate: isoToday,
    toDate: isoToday,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["bills", date],
    queryFn: () => {
      // ensure toDate covers end of selected day so today's bills are included
      const payload = {
        fromDate: date.fromDate,
        toDate: `${date.toDate}T23:59:59.999Z`,
      };
      return GetAllBills(payload);
    },
  });
  const bills = data?.data || [];
  console.log("bills data", bills, date);

  const updateBillMutation = useUpdateBill();
  // toglgeStatus
  const handleToggle = (bill: readBillInterface) => {
    const newStatus = bill.status === "closed" ? "pending" : "closed";

    updateBillMutation.mutate({
      id: bill._id,
      billDetails: { ...bill, status: newStatus },
    });
  };
  return (
    <div className="px-4 py-2 flex flex-col gap-4 bg-primaryBg w-full min-h-screen min-w-75">
      {/* header */}
      <div className="bg-white p-2 flex flex-col gap-4 rounded-lg">
        <nav className="flex justify-between  items-center gap-5 ">
          <button
            className=" cursor-pointer bg-gray-50 p-2  rounded-md hover:bg-gray-300 transition-all duration-500 ease-in-out"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>
          <h1 className=" font-bold text-xl">Bill History</h1>
          <span></span>
        </nav>
        {/* search bill */}
        <div>
          <div className="flex items-center gap-2 relative">
            <CiSearch className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 font-bold" />
            <input
              type="text"
              placeholder=" Search bill no"
              className="border border-gray-300 rounded-full font-semibold  px-8 py-2 w-full bg-primary-foreground max-w-md"
            />
          </div>

          {/* date range picker */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">From Date</label>
              <input
                type="date"
                value={date.fromDate}
                onChange={(e) => setDate({ ...date, fromDate: e.target.value })}
                className="border border-gray-300 rounded-md px-2 py-1 w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">To Date</label>
              <input
                type="date"
                value={date.toDate}
                onChange={(e) => setDate({ ...date, toDate: e.target.value })}
                className="border border-gray-300 rounded-md px-2 py-1 w-full max-w-xs min-w-30"
              />
            </div>
          </div>
        </div>
      </div>
      {/*   bill list  */}
      <div>
        <h2 className="font-bold text-lg">Bill List</h2>
        {isLoading ? (
          <div>
            <h1>loading list</h1>
          </div>
        ) : (
          <div className=" p-4 rounded-lg flex flex-col  gap-2">
            <h1 className="font-semibold text-gray-500 text-md  mb-3">
              Total Bill :
              {
                <span className="font-bold text-black text-xl">
                  {bills?.data.length || 0}
                </span>
              }
            </h1>
            {/* bill card */}
            {bills?.data && bills.data.length > 0 ? (
              bills.data.map((bill: readBillInterface) => (
                <div
                  key={bill._id}
                  className=" bg-white p-1 rounded-xl px-4 py-2 flex flex-col gap-4"
                >
                  <div className="flex justify-between items-center">
                    {/* payment icon and bill num */}
                    <div className="flex gap-4 justify-center items-center">
                      {bill.paymentMethod === "cash" ? (
                        <span className="text-green-500 p-2 rounded-md bg-green-100 ">
                          <FaMoneyBillWave />
                        </span>
                      ) : bill.paymentMethod === "upi" ? (
                        <span className="text-violet-500">
                          <IoQrCodeSharp />
                        </span>
                      ) : null}
                      {/* bill number  */}
                      <div className="">
                        <h1 className="font-semibold text-sm">
                          # {bill.billNumber}
                        </h1>
                        <h3 className="text-gray-500 text-sm">
                          {new Date(bill.updatedAt).toLocaleTimeString()}
                        </h3>{" "}
                      </div>
                    </div>
                    {/* bill amount  */}
                    <div>
                      <h2 className="font-bold text-xl">
                        {formatAmount(bill.totalAmount)}
                      </h2>
                      <button
                        onClick={() => handleToggle(bill)}
                        className={`px-2 py-1 text-sm capitalize rounded-md flex justify-center items-center hover:scale-105 transition-all duration-150 ease-in-out ${
                          bill.status === "pending"
                            ? "bg-red-100 text-red-500"
                            : updateBillMutation.isPending
                              ? " bg-purple-100 text-purple-500"
                              : "bg-green-100 text-green-500"
                        }`}
                      >
                        {updateBillMutation.isPending ? "loading" : bill.status}
                      </button>
                    </div>
                  </div>
                  {/* bill details */}
                  <div className="flex  justify-between items-center">
                    <div>
                      {" "}
                      <h1>
                        {" "}
                        <span className="  rounded-full">
                          {bill.items.length}
                        </span>{" "}
                        items
                      </h1>
                    </div>
                    <div className="flex gap-5">
                      <button>
                        <LuPrinter />
                      </button>
                      <button>
                        <IoShareSocialOutline />
                      </button>
                      <button className=" bg-gray-200 py-1 px-4 rounded-md hover:bg-gray-300">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No bills available for the selected date range.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BillHistory;
