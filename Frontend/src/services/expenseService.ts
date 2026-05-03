import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { toast } from "sonner";

type dateType = {
  fromDate: string;
  toDate: string;
};
export const getAllExpenses = async (
  date: dateType,
  page: number,
  limit: number,
  sort: string,
  category: string,
) => {
  const res = await axiosInstance.post(
    `/expense/getAllExpenses?page=${page}&limit=${limit}&sort=${sort}`,
    { ...date, category },
  );
  return res.data;
};
// get expense categories
export const getExpenseCategories = async () => {
  const res = await axiosInstance.get("/expense/getAllCategories");
  return res.data;
};

// add expense
export const addExpense = async (data: {
  title: string;
  amount: number;
  category: string;
  note: string;
  date: string;
}) => {
  console.log(data);

  const res = await axiosInstance.post("/expense/addExpense", data);
  return res.data;
};

// add expense mutation
export const AddExpenseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      title: string;
      amount: number;
      category: string;
      note: string;
      date: string;
    }) => addExpense(data),
    onSuccess: (data) => {
      console.log("Expense added successfully", data);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense added successfully");
    },
    onError: (error) => {
      console.error("Failed to add expense", error);
      toast.error("Failed to add expense");
    },
  });
};
