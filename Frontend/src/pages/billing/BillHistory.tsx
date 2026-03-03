import { useQuery } from "@tanstack/react-query";
import { GetAllBills } from "../../services/billingServices";
import { useState } from "react";
import type { BillItem, readBillInterface } from "../../utils/constants";
import { FaArrowLeft, FaMoneyBillWave } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { formatAmount } from "../../utils/formatNumbers";
import { IoQrCodeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BillHistory = () => {
  const navigate = useNavigate();
  const today = new Date();
  const isoToday = today.toISOString().split("T")[0];
  const [date, setDate] = useState({
    // default from/to both set to today's date (start and end of current day)
    fromDate: isoToday,
    toDate: isoToday,
  });

  const { data } = useQuery({
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
      {/* 
           "_id": "69a67e35df17aa6e1f26f6f1",
            "Shop": "690b1c9532ffe47c29cd64a2",
            "items": [
                {
                    "product": "691443b33a5c052804166326",
                    "productName": "dosa3",
                    "quantity": 4,
                    "price": 20,
                    "_id": "69a67e35df17aa6e1f26f6f2"
                }
            ],
            "totalAmount": 80,
            "paymentMethod": "cash",
            "status": "pending",
            "billingDate": "2026-03-03T06:22:45.819Z",
            "createdAt": "2026-03-03T06:22:45.828Z",
            "updatedAt": "2026-03-03T06:22:45.828Z",
            "billNumber": "BILL-3-3-2026-085",
            "__v": 0
        }, */}
      <div>
        <h2 className="font-bold text-lg">Bill List</h2>
        <div className=" p-4 rounded-lg flex flex-col  gap-2">
          {bills?.data && bills.data.length > 0 ? (
            bills.data.map((bill: readBillInterface) => (
              <div
                key={bill._id}
                className=" bg-white p-1 rounded-xl px-4 py-2"
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
                    <div>
                      <h1 className="font-bold"># {bill.billNumber}</h1>
                      <h3 className="text-gray-500">
                        {new Date(bill.updatedAt).toLocaleTimeString()}
                      </h3>{" "}
                    </div>
                  </div>
                  {/* bill amount  */}
                  <div>
                    <h2 className="font-bold text-2xl">
                      {formatAmount(bill.totalAmount)}
                    </h2>
                    <button
                      className={`px-2 py-1 text-sm capitalize rounded-md flex justify-center items-center ${
                        bill.status === "pending"
                          ? "bg-red-100 text-red-500"
                          : "bg-green-100 text-green-500"
                      }`}
                    >
                      {bill.status}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No bills available for the selected date range.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillHistory;
