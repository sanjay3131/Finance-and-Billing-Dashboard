import { useMutation } from "@tanstack/react-query";
import { loginService, registerService } from "../services/authServices";
import type { RegisterForm } from "../utils/constants";
import { toast } from "sonner";

export const useLogin = () => {
  type loginType = {
    ShopEmail: string;
    ShopPassword: string;
  };
  return useMutation({
    mutationFn: ({ ShopEmail, ShopPassword }: loginType) =>
      loginService(ShopEmail, ShopPassword),
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
