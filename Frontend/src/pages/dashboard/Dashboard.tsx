import { useAuth } from "../../hooks/useAuth";
import { FaMoneyBill } from "react-icons/fa6";
import { BsGraphDownArrow } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const Dashboard = () => {
  const { data } = useAuth();
  const { shop } = data?.data || {};
  return (
    <div className=" bg-primaryBg w-full min-h-screen p-4">
      {/* logged in user details */}
      <div className="flex  justify-between  items-center">
        {/* shop name */}
        <h1 className="font-bold">{shop?.ShopName}</h1>
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
      <div className="w-full  ">
        <h1 className="text-gray-400 font-semibold">Today's Overviews</h1>
        {/* cards */}
        <div className="grid grid-cols-3 gap-4  w-full p-4 ">
          {/* total sales */}
          <div className="flex flex-col justify-center p-2 rounded-2xl  shadow-md gap-2 bg-white px-4">
            <span className="text-green-500 bg-green-300/20 p-2 rounded-sm w-fit">
              <FaMoneyBill />
            </span>
            <h1 className="font-semibold text-gray-400 text-[14px]">
              Total Sales
            </h1>
            <h2 className="text-2xl font-bold">$.548</h2>
          </div>
          {/* total orders */}
          <div className="flex flex-col justify-center p-2 rounded-2xl shadow-md gap-2 bg-white px-4">
            <span className="text-blue-500 bg-blue-300/20 p-2 rounded-sm w-fit">
              <TiTick />
            </span>
            <h1 className="font-semibold text-gray-400 text-[14px]">
              Total Orders
            </h1>
            <h2 className="text-2xl font-bold">$.548</h2>
          </div>
          {/* total expenses */}
          <div className="flex flex-col justify-center p-2 rounded-2xl shadow-md gap-2 bg-white px-4">
            <span className="text-red-500 bg-red-300/20 p-2 rounded-sm w-fit">
              <FaShoppingBag />
            </span>
            <h1 className="font-semibold text-gray-400 text-[14px]">
              Total Expenses
            </h1>
            <h2 className="text-2xl font-bold">$.548</h2>
          </div>
          {/* net Profit */}
          <div className="flex flex-col  col-span-full rounded-2xl gap-2 bg-linear-45 from-black/95 from-60% to-green-800 px-4 py-6 shadow-md">
            <span className=" flex justify-between items-center gap-4">
              <h1 className="text-gray-400 font-semibold">Net Profit</h1>{" "}
              <h1 className="text-green-500 font-semibold bg-green-500/20 px-4 rounded-full flex items-center gap-2">
                <BsGraphUpArrow className="" /> +12%
              </h1>
            </span>
            <h2 className="text-green-500 text-3xl font-bold">$ 548</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
