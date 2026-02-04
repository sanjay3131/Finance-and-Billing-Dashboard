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
