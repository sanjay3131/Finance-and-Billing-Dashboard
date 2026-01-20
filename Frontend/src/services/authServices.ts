import type { RegisterForm } from "../utils/constants";
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
export const registerService = async ({ form }: { form: RegisterForm }) => {
  const response = await axiosInstance.post("/auth/signup", {
    ShopName: form.shopName,
    ShopEmail: form.shopEmail,
    ShopPassword: form.shopPassword,
    ShopAddress: form.shopAddress,
    ShopOwnerName: form.ownerName,
    ShopOwnerPhoneNumber: form.ownerPhone,
    ShopPhoneNumber: form.shopPhone,
    ShopOwnerEmail: form.ownerEmail,
  });
  return response;
};

// check authentication service
export const checkAuth = async () => {
  const response = await axiosInstance.get("/auth/checkshop");
  return response;
};

// logout
export const logOut = async () => {
  const response = await axiosInstance.get("/auth/logout");
  return response;
};
