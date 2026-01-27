import axiosInstance from "./axiosInstance";

export const ViewAllProducts = async () => {
  const response = await axiosInstance.get("/product/viewAllProducts");
  return response;
};
