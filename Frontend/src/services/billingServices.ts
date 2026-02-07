import type { BillItem } from "../utils/constants";
import axiosInstance from "./axiosInstance";

export const addBill = async (billData: BillItem) => {
  const response = await axiosInstance.post("billing/addBill", billData);
  return response;
};
