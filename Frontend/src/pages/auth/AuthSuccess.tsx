import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthContext";
import { toast } from "sonner";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const shopId = searchParams.get("shopId");

    // Only process if user is not already logged in
    if (token && shopId && !user) {
      // Store token in cookies (will be done automatically by backend)
      // Update auth context
      login({ id: shopId, name: "Shop" });
      toast.success("Google login successful!");

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else if (!token || !shopId) {
      toast.error("Authentication failed");
      navigate("/login");
    }
  }, [searchParams, navigate, login, user]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Authenticating...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthSuccess;
