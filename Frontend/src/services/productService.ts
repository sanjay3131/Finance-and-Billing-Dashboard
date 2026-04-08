import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { toast } from "sonner";

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
  console.log("edit ::::::", updatedData);

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
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update product", error);
      toast.error("Failed to update product");
    },
  });
};

// delete product
export const deleteProduct = async (productId: string) => {
  const response = await axiosInstance.delete(
    `/product/deleteSingleProduct/${productId}`,
  );
  return response;
};

// delete mutation
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log("Product deleted successfully", data);
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product");
    },
  });
};

// add product
export const addProduct = async (productData: FormData) => {
  console.log(productData);

  const response = await axiosInstance.post(`/product/addProduct`, productData);
  return response;
};

// add mutation
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: FormData) => addProduct(productData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log("Product added successfully", data);
      toast.success("Product added successfully");
    },
    onError: (error) => {
      console.error("Failed to add product", error);
      toast.error("Failed to add product");
    },
  });
};
