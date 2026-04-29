import axiosInstance from "./axiosInstance";

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
