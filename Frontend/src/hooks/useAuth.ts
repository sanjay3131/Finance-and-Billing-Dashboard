import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../services/authServices";

export const useAuth = () => {
  return useQuery({
    queryKey: ["authenticated"],
    queryFn: checkAuth,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
