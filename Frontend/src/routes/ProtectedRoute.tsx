// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { data, isLoading, isError } = useAuth();
  // Use comma or JSON.stringify to properly log objects instead of getting "[object Object]"
  console.log("auth data ==>:", data);

  if (isLoading) {
    return <p>Checking auth...</p>;
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
