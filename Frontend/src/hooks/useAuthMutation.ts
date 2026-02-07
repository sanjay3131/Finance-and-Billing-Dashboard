import { useMutation } from "@tanstack/react-query";
import { loginService, registerService } from "../services/authServices";
import { useAuth } from "./useAuthContext";
import type { RegisterForm } from "../utils/constants";
import { toast } from "sonner";
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
      toast.error("Login failed. Please check your credentials and try again.");
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ form }: { form: RegisterForm }) => registerService({ form }),
    onSuccess: (data) => {
      console.log("Registration successful", data);
      toast.success("Registration successful! You can now log in.");
    },

    onError: (error) => {
      console.error("Registration failed", error);
      toast.error("Registration failed. Please try again.");
    },
  });
};
