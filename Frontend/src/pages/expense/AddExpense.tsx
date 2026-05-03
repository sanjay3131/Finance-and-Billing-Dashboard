import { useQuery } from "@tanstack/react-query";
import {
  AddExpenseMutation,
  getExpenseCategories,
} from "../../services/expenseService";
import { useState } from "react";

const AddExpense = () => {
  const { data: expenseCategories, isLoading: isExpenseCategoriesLoading } =
    useQuery({
      queryKey: ["expenseCategories"],
      queryFn: getExpenseCategories,
    });
  console.log(expenseCategories);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "other",
    note: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const addExpenseMutation = AddExpenseMutation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpenseMutation.mutate({
      title: formData.name,
      amount: Number(formData.amount),
      category: formData.category,
      note: formData.note,
      date: formData.date,
    });
  };

  return (
    <div>
      <h1 className=" text-xl font-bold ">Add Expense</h1>
      <div className=" flex items-center justify-center">
        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 ">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Expense Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter expense name"
              className="border border-gray-300 rounded-md px-2 py-1 w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="border border-gray-300 rounded-md px-2 py-1 w-full max-w-xs"
            />
          </div>
          {/* category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-2 py-1 w-full max-w-xs"
            >
              {isExpenseCategoriesLoading ? (
                <option>Loading...</option>
              ) : (
                expenseCategories?.data?.map(
                  (category: string, index: number) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ),
                )
              )}
            </select>
          </div>
          {/* note  */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Note</label>
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Enter note"
              className="border border-gray-300 rounded-md px-2 py-1 w-full max-w-xs"
            />
          </div>
          {/* date picker */}
          <div>
            {/* date picker component */}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md w-fit "
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
