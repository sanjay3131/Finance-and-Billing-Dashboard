import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/authServices";
import { useAuth } from "./useAuthContext";

export const useLogin = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: ({
      ShopEmail,
      ShopPassword,
    }: {
      ShopEmail: string;
      ShopPassword: string;
    }) => loginService(ShopEmail, ShopPassword),
    onSuccess: (data) => {
      console.log("Login successful", data);
      login(data.data.user);
      console.log(login);
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
};
