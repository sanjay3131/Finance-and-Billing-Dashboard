import { useMutation } from "@tanstack/react-query";
import type { CreateBillInterface } from "../utils/constants";
import axiosInstance from "./axiosInstance";

// add bill
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

// view all bills
// export const GetAllBills = () => {
//   return useMutation({
//     mutationFn: (date: string) => {
//       return axiosInstance.post(`billing/getAllBills`, { date });
//     },
//     onSuccess: (data) => {
//       console.log("Bills retrieved successfully", data);
//     },
//     onError: (error) => {
//       console.error("Failed to retrieve bills", error);
//     },
//   });
// };
type dateType = {
  fromDate: string;
  toDate: string;
};
export const GetAllBills = async (date: dateType) => {
  const res = await axiosInstance.post(`/billing/getAllBills`, date);
  return res;
};
