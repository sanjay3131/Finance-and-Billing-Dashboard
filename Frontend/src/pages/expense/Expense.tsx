import { useState } from "react";
import { formatAmount } from "../../utils/formatNumbers";
import DatePicker from "../../components/ui/DatePicker";
import { getAllExpenses } from "../../services/expenseService";
import { useQuery } from "@tanstack/react-query";
import BillCardSkeleton from "../../components/ui/skeleton/BillCardSkeleton";
import ExpenseCard from "../../components/ui/ExpenseCard";
import type { expenseDataType } from "../../utils/constants";

const Expense = () => {
  const data = 1240;
  const categories = [
    "Raw materiral",
    "Rent",
    "Gas",
    "Electricity",
    "Grocery",
    "Water",
  ];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const today = new Date();
  const isoToday = today.toISOString().split("T")[0];
  const [date, setDate] = useState({
    // default from/to both set to today's date (start and end of current day)
    fromDate: isoToday,
    toDate: isoToday,
  });
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    sort: "-expenseDate",
  });

  // query
  console.log(date, query, selectedCategory);

  const { data: expense, isLoading } = useQuery({
    queryKey: ["expenses", date, query, selectedCategory],
    queryFn: () =>
      getAllExpenses(
        date,
        query.page,
        query.limit,
        query.sort,
        selectedCategory === "all" ? "" : selectedCategory,
      ),
  });
  console.log(expense);
  const expenseData = expense?.data;

  return (
    <div className="w-full  bg-primaryBg min-h-screen ">
      {/* expense header */}
      <div className=" w-full flex justify-center items-center py-4 flex-col gap-2 ">
        <h1 className="text-2xl md:text-3xl font-bold">{formatAmount(data)}</h1>
        <button className="bg-black text-white p-1 px-3 rounded-full">
          Add Expense
        </button>
      </div>
      {/* expense category */}
      <div className="flex text-sm gap-2 px-2 flex-wrap items-center py-2">
        <button
          className={`${
            selectedCategory === "all"
              ? "bg-black text-white shadow-md"
              : "text-black bg-white  border  border-gray-300 "
          }  rounded-full px-2 py-1 `}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`capitalize ${
              selectedCategory === category
                ? "bg-black text-white shadow-md"
                : "text-black bg-white  border  border-gray-300  "
            }  rounded-full px-2 py-1 `}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {/* date picker  */}
      <div className="px-4">
        <DatePicker date={date} setDate={setDate} />
      </div>

      {/* expense list */}
      {isLoading ? (
        <BillCardSkeleton />
      ) : (
        <>
          <h1 className="text-xl font-semibold m-2 ">Expense List</h1>

          {expenseData.length > 0 ? (
            expenseData.map((expense: expenseDataType) => (
              <ExpenseCard key={expense._id} {...expense} />
            ))
          ) : (
            <p className="text-gray-500 text-xl text-center font-semibold capitalize">
              No expenses found.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Expense;
