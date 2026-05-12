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

// edit expense
export const editExpense = async (data: {
  id: string;
  title: string;
  amount: number;
  category: string;
  note: string;
  date: string;
}) => {
  const res = await axiosInstance.put(
    `/expense/updateExpense/${data.id}`,
    data,
  );

  return res.data;
};
// edit expense mutation
export const EditExpenseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      id: string;
      title: string;
      amount: number;
      category: string;
      note: string;
      date: string;
    }) => editExpense(data),
    onSuccess: (data) => {
      console.log("Expense edited successfully", data);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense edited successfully");
    },
    onError: (error) => {
      console.error("Failed to edit expense", error);
      toast.error("Failed to edit expense");
    },
  });
};

// delete expense
export const deleteExpense = async (id: string) => {
  const res = await axiosInstance.delete(`/expense/deleteExpense/${id}`);
  return res.data;
};

// delete expense mutation
export const DeleteExpenseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteExpense(id),
    onSuccess: (data) => {
      console.log("Expense deleted successfully", data);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense deleted successfully");
    },
    onError: (error) => {
      console.error("Failed to delete expense", error);
      toast.error("Failed to delete expense");
    },
  });
};
// get single expense
export const getSingleExpense = async (id: string) => {
  const res = await axiosInstance.get(`/expense/getExpense/${id}`);
  return res.data;
};
