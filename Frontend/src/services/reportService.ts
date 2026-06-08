import axiosInstance from "./axiosInstance";

export const getSingleDayReport = async (
  date: string = new Date().toISOString().split("T")[0],
) => {
  const response = await axiosInstance.get(`report/perdaySalesReport/${date}`);
  return response;
};

export const weeklyReport = async () => {
  const response = await axiosInstance.get(`report/sevenDaysSalesReport`);
  return response;
};

export const monthlyReport = async () => {
  const response = await axiosInstance.get(`report/thirtyDaysSalesReport`);
  return response;
};

export const sixMonthReport = async () => {
  const response = await axiosInstance.get(`report/sixMonthsSalesReport`);
  return response;
};

export const customerReport = async (startDate: string, endDate: string) => {
  const response = await axiosInstance.post(`report/customSalesReport`, {
    startDate,
    endDate,
  });
  return response;
};

// top selling products
export const topSellingProducts = async (data: {
  startDate: string;
  endDate: string;
  category?: string;
}) => {
  const response = await axiosInstance.post(
    `/report/topSellingProductsReport`,
    data,
  );
  return response;
};
