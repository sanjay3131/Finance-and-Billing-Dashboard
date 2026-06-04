// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthCheckLoadingUI from "../components/ui/AuthCheckLoadingUI";

const ProtectedRoute = () => {
  const { data, isLoading, isError } = useAuth();
  // Use comma or JSON.stringify to properly log objects instead of getting "[object Object]"
  console.log("auth data ==>:", data?.shop);

  if (isLoading) {
    return <AuthCheckLoadingUI />;
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
