import type { AuthShopResponse, RegisterForm } from "../utils/constants";
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

export const checkAuth = async (): Promise<AuthShopResponse> => {
  const response = await axiosInstance.get<AuthShopResponse>("/auth/checkshop");
  return response.data; // ✅ ONLY DATA
};

// logout
export const logOut = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("shopId");
  const response = await axiosInstance.get("/auth/logout");
  return response;
};

// Google OAuth login service
export const googleLoginService = async () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // Remove /api suffix if present to get base URL
  const baseUrl = backendUrl.replace(/\/api\/?$/, "");
  // Redirect to backend Google OAuth endpoint
  window.location.href = `${baseUrl}/api/auth/google`;
};
