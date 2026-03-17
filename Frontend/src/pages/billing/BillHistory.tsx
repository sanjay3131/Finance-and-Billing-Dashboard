import { useQuery } from "@tanstack/react-query";
import { GetAllBills } from "../../services/billingServices";
import { useState } from "react";
import type { readBillInterface } from "../../utils/constants";
import BillDetailsCard from "../../components/ui/BillDetailsCard";
import { FaArrowLeft } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Billcard from "../../components/ui/Billcard";

const BillHistory = () => {
  const navigate = useNavigate();
  const today = new Date();
  const isoToday = today.toISOString().split("T")[0];
  const [date, setDate] = useState({
    // default from/to both set to today's date (start and end of current day)
    fromDate: isoToday,
    toDate: isoToday,
  });
  const [modalOpen, setModalOpen] = useState(true);
  const [selectedBill, setSelectedBill] = useState<readBillInterface | null>(
    null,
  );
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

  // toglgeStatus

  return (
    <div className="px-4 py-2 flex flex-col gap-4 bg-primaryBg w-full min-h-screen min-w-75 ">
      {/* modal for bill details */}
      {modalOpen && selectedBill && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-md z-10 flex justify-center items-center"
          onClick={() => {
            setModalOpen(false);
            setSelectedBill(null);
          }}
        >
          <div
            className="bg-white/80 backdrop-blur-sm max-w-lg w-full p-4 z-20 rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setModalOpen(false);
                setSelectedBill(null);
              }}
              className="absolute top-2 right-2 text-lg text-red-500 hover:text-red-700  bg-red-100 hover:bg-red-200 rounded-full w-8 h-8 flex justify-center items-center transition-all duration-300 ease-in-out"
            >
              x
            </button>
            {selectedBill && <BillDetailsCard bill={selectedBill} />}
          </div>
        </div>
      )}
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
          <div className="flex items-center gap-2  z-0 relative">
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
                  {bills?.data?.length || 0}
                </span>
              }
            </h1>
            {/* bill card */}
            {bills?.data && bills.data.length > 0 ? (
              bills.data.map((bill: readBillInterface) => (
                <Billcard
                  key={bill._id}
                  bill={bill}
                  setSelectedBill={setSelectedBill}
                  setModalOpen={setModalOpen}
                />
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
