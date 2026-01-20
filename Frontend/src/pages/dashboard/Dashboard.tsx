import { useAuth } from "../../hooks/useAuth";
import { FaMoneyBill } from "react-icons/fa6";

const Dashboard = () => {
  const { data } = useAuth();
  const { shop } = data?.data || {};
  return (
    <div className=" bg-primaryBg w-full min-h-screen p-4">
      {/* logged in user details */}
      <div className="flex  justify-between bg-red-300 items-center">
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
      <div className="grid grid-cols-2 gap-4 mt-4 ">
        <h1>Todays Overviews</h1>
        {/* total sales */}
        <div className="flex flex-col items-center gap-2 bg-red-200">
          <span className="text-green-500">
            <FaMoneyBill />
          </span>
          <h1>Total Sales</h1>
          <h2>$.548</h2>
        </div>
        {/* total orders */}
        <div className="flex flex-col items-center gap-2 bg-red-200">
          <span className="text-green-500">
            <FaMoneyBill />
          </span>
          <h1>Total Orders</h1>
          <h2>$.548</h2>
        </div>
        {/* total expenses */}
        <div className="flex flex-col items-center gap-2 bg-red-200">
          <span className="text-green-500">
            <FaMoneyBill />
          </span>
          <h1>Total Expenses</h1>
          <h2>$.548</h2>
        </div>
        {/* net Profit */}
        <div className="flex flex-col items-center col-span-2 gap-2 bg-red-200">
          <span className="text-green-500">
            <FaMoneyBill />
          </span>
          <h1>Net Profit</h1>
          <h2>$.548</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
