import { useMutation } from "@tanstack/react-query";
import type { CreateBillInterface } from "../utils/constants";
import axiosInstance from "./axiosInstance";

export const addBill = async (billData: CreateBillInterface) => {
  const response = await axiosInstance.post("billing/addBill", billData);
  return response;
};

// mution function for adding bill
export const CreateBill = () => {
  return useMutation({
    mutationFn: (billData: CreateBillInterface) => addBill(billData),
    onSuccess: (data) => {
      console.log("Bill created successfully", data);
    },
    onError: (error) => {
      console.error("Failed to create bill", error);
    },
  });
};
