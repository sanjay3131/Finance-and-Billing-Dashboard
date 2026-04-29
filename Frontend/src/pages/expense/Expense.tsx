import { useState, useRef, useCallback, useEffect } from "react";
import { formatAmount } from "../../utils/formatNumbers";
import DatePicker from "../../components/ui/DatePicker";
import {
  getAllExpenses,
  getExpenseCategories,
} from "../../services/expenseService";
import { useQuery } from "@tanstack/react-query";
import BillCardSkeleton from "../../components/ui/skeleton/BillCardSkeleton";
import ExpenseCard from "../../components/ui/ExpenseCard";
import type { expenseDataType } from "../../utils/constants";
import CategorySkeleton from "../../components/ui/skeleton/CategorySkeleton";

const Expense = () => {
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

  // Store all expenses and track if more data exists
  const [allExpenses, setAllExpenses] = useState<expenseDataType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Reset expenses when date or category changes
  useEffect(() => {
    setAllExpenses([]);
    setQuery((prev) => ({ ...prev, page: 1 }));
    setHasMore(true);
  }, [date, selectedCategory]);

  // query
  console.log(date, query, selectedCategory);

  const {
    data: expense,
    isLoading,
    isFetching,
  } = useQuery({
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

  // Update allExpenses when new data arrives
  useEffect(() => {
    if (expense?.data) {
      // Only add data if it's new page data (not page 1)
      if (query.page > 1) {
        setAllExpenses((prev) => {
          // Avoid duplicates by checking existing IDs
          const existingIds = new Set(prev.map((e) => e._id));
          const newExpenses = expense.data.filter(
            (e: expenseDataType) => !existingIds.has(e._id),
          );
          return [...prev, ...newExpenses];
        });
      } else {
        setAllExpenses(expense.data);
      }
      // Check if there are more pages
      setHasMore(query.page < (expense.pages || 1));
    }
  }, [expense?.data, query.page]);

  // Intersection Observer callback for infinite scroll
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isFetching, hasMore],
  );

  // get unique categories from expense data
  const { data: expenseCategories, isLoading: isExpenseCategoriesLoading } =
    useQuery({
      queryKey: ["expenseCategories"],
      queryFn: getExpenseCategories,
    });
  console.log(expense, expenseCategories);
  const expenseData = expense?.data;

  const ExpenseCategory = [
    ...new Set(
      (expenseData || []).map((expense: expenseDataType) => expense.category),
    ),
  ];
  console.log(ExpenseCategory);

  return (
    <div className="w-full  bg-primaryBg min-h-screen ">
      {/* expense header */}
      <div className=" w-full flex justify-center items-center py-4 flex-col gap-2 ">
        <h1 className="text-2xl md:text-3xl font-bold">
          {formatAmount(expense?.totalAmount || 0)}
        </h1>
        <button className="bg-black text-white p-1 px-3 rounded-full">
          Add Expense
        </button>
      </div>
      {/* expense category */}
      {isExpenseCategoriesLoading ? (
        <CategorySkeleton />
      ) : (
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
          {expenseCategories?.data?.map((category: string, index: number) => (
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
      )}
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

          {allExpenses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              {allExpenses.map((expense: expenseDataType, index: number) => (
                <div
                  ref={index === allExpenses.length - 1 ? lastElementRef : null}
                  key={expense._id}
                >
                  <ExpenseCard {...expense} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-xl text-center font-semibold capitalize">
              No expenses found.
            </p>
          )}

          {/* Loading indicator for pagination */}
          {isFetching && query.page > 1 && (
            <div className="text-center py-4">
              <p className="text-gray-500">Loading more...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Expense;
