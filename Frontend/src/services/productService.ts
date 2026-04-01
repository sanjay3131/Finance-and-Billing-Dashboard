import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const ViewAllProducts = async (itemCategory?: string) => {
  const response = await axiosInstance.post("/product/viewAllProducts", {
    itemCategory,
  });
  return response;
};

export const ViewProductsCategory = async () => {
  const response = await axiosInstance.get(`/product/productCategories`);
  return response;
};

// view product by id
export const ViewProductById = async (productId: string) => {
  const response = await axiosInstance.get(
    `/product/singleProduct/${productId}`,
  );
  return response;
};

// update product
export const updateProtuct = async (productId: string, updatedData: object) => {
  const response = await axiosInstance.put(
    `/product/updateProduct/${productId}`,
    updatedData,
  );
  return response;
};

// update mutation
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      updatedData,
    }: {
      productId: string;
      updatedData: object;
    }) => updateProtuct(productId, updatedData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log("Product updated successfully", data);
    },
    onError: (error) => {
      console.error("Failed to update product", error);
    },
  });
};
