import { formatAmount } from "../../utils/formatNumbers";

const ReportCards = ({
  totalSales,
  totalExpense,
  profit,
  isLoss,
  billsCount,
  isLoading,
  isError,
  title,
  activeDays,
  profitPercentage,
}: {
  totalSales: number;
  totalExpense: number;
  profit: number;
  isLoss: boolean;
  billsCount: number;
  isLoading: boolean;
  isError: boolean;
  title: string;
  activeDays: number;
  profitPercentage: string | number;
}) => {
  return (
    <div className="flex  flex-col gap-3   mt-12">
      {/* today */}

      <h1 className="text-gray-400 font-semibold">
        <span>{title}</span> report
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {/* total sales */}
        <div className="bg-white px-4 py-6 rounded-2xl shadow-md shadow-blue-400/20  mt-4">
          <h1 className="font-semibold capitalize text-blue-400">
            total sales
          </h1>
          <h2 className="text-2xl font-bold">
            {isLoading
              ? "Loading..."
              : isError
                ? "Error"
                : formatAmount(totalSales || 0)}
          </h2>
        </div>
        {/* total expenses */}
        <div className="bg-white px-4 py-6 rounded-2xl shadow-md shadow-red-400/20  mt-4">
          <h1 className="font-semibold capitalize text-red-400">
            total expenses
          </h1>
          <h2 className="text-2xl font-bold">
            {isLoading
              ? "Loading..."
              : isError
                ? "Error"
                : formatAmount(totalExpense || 0)}
          </h2>
        </div>
        {/* total profit */}
        <div className="bg-white px-4 py-6 rounded-2xl shadow-md shadow-green-400/20  mt-4">
          <h1 className="font-semibold capitalize text-green-400">
            total profit
          </h1>
          <h2 className="text-2xl font-bold">
            {isLoading
              ? "Loading..."
              : isError
                ? "Error"
                : isLoss
                  ? formatAmount(profit || 0)
                  : formatAmount(profit || 0)}
          </h2>
        </div>
        {/* bill count */}
        <div className="bg-white px-4 py-6 rounded-2xl shadow-md shadow-violet-400/20  mt-4">
          <h1 className="font-semibold capitalize text-violet-400">
            Bills Generated
          </h1>
          <h2 className="text-2xl font-bold">
            {isLoading ? "Loading..." : isError ? "Error" : billsCount || 0}
          </h2>
        </div>
        {/* active days  */}
        <div className="bg-white px-4 py-6 rounded-2xl shadow-md shadow-yellow-400/20  mt-4">
          <h1 className="font-semibold capitalize text-yellow-400">
            Active Days
          </h1>
          <h2 className="text-2xl font-bold">
            {isLoading ? "Loading..." : isError ? "Error" : activeDays || 0}
          </h2>
        </div>
        {/* profit percentage */}
        <div className="bg-white px-4 py-6 rounded-2xl shadow-md shadow-purple-400/20  mt-4">
          <h1 className="font-semibold capitalize text-purple-400">
            Profit Percentage
          </h1>
          <h2 className="text-2xl font-bold">
            {isLoading
              ? "Loading..."
              : isError
                ? "Error"
                : profitPercentage || 0}
            %
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ReportCards;
