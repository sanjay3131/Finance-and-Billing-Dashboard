// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { data, isLoading, isError } = useAuth();
  console.log("auth data ==>: " + data);

  if (isLoading) {
    return <p>Checking auth...</p>;
  }

  if (isError || !data?.authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
