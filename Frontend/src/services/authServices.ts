import axiosInstance from "./axiosInstance";

//login service
export const loginService = async (ShopEmail: string, ShopPassword: string) => {
  const response = await axiosInstance.post("/auth/login", {
    ShopEmail,
    ShopPassword,
  });
  return response;
};
//register service
export const registerService = async (
  ShopName: string,
  ShopEmail: string,
  ShopPassword: string,
  ShopAddress: string,
  ShopOwnerName: string,
  ShopOwnerPhoneNumber: string,
  ShopPhoneNumber: string,
  ShopOwnerEmail: string
) => {
  const response = await axiosInstance.post("/auth/signup", {
    ShopName,
    ShopEmail,
    ShopPassword,
    ShopAddress,
    ShopOwnerName,
    ShopOwnerPhoneNumber,
    ShopPhoneNumber,
    ShopOwnerEmail,
  });
  return response;
};

// check authentication service
export const checkAuth = async () => {
  const response = await axiosInstance.get("/auth/checkshop");
  return response;
};
