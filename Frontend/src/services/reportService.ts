import axiosInstance from "./axiosInstance";

export const getSingleDayReport = async (
  date: string = new Date().toISOString().split("T")[0],
) => {
  const response = await axiosInstance.get(`report/perdaySalesReport/${date}`);
  return response;
};
