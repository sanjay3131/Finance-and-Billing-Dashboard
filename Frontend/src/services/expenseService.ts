import axiosInstance from "./axiosInstance";

type dateType = {
  from: string;
  to: string;
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
