import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../services/authServices";
import type { AuthShopResponse } from "../utils/constants";

export const useAuth = () => {
  return useQuery<AuthShopResponse>({
    queryKey: ["authenticated"],
    queryFn: checkAuth,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
