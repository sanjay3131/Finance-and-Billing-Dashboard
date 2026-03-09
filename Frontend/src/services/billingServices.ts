import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreateBillInterface,
  readBillInterface,
} from "../utils/constants";
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

type dateType = {
  fromDate: string;
  toDate: string;
};
export const GetAllBills = async (date: dateType) => {
  const res = await axiosInstance.post(`/billing/getAllBills`, date);
  return res;
};

// update bill
export const useUpdateBill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      billDetails,
    }: {
      id: string;
      billDetails: readBillInterface;
    }) => {
      return axiosInstance.put(`billing/updateBill/${id}`, billDetails);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });

      console.log("Bill updated successfully", data);
    },
    onError: (error) => {
      console.error("Failed to update bill", error);
    },
  });
};

// get bill by id
export const getBillById = async (billId: string) => {
  const res = await axiosInstance.get(`/billing/getBill/${billId}`);
  return res;
};
