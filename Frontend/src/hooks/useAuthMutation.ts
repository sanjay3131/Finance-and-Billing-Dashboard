import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/authServices";
import { useAuth } from "./useAuthContext";

export const useLogin = () => {
  type loginType = {
    ShopEmail: string;
    ShopPassword: string;
  };
  const { login } = useAuth();
  return useMutation({
    mutationFn: ({ ShopEmail, ShopPassword }: loginType) =>
      loginService(ShopEmail, ShopPassword),
    onSuccess: (data) => {
      console.log("Login successful", data);
      login(data.data);
    },

    onError: (error) => {
      console.error("Login failed", error);
    },
  });
};
