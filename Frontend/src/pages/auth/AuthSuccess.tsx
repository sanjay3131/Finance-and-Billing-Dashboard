import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const shopId = searchParams.get("shopId");

    if (token) {
      localStorage.setItem("token", token);
    }

    if (shopId) {
      localStorage.setItem("shopId", shopId);
    }

    if (token && shopId) {
      toast.success("Google login successful!");

      const timer = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1000);

      return () => clearTimeout(timer);
    }

    toast.error("Authentication failed");
    navigate("/login", { replace: true });
  }, [searchParams, navigate]);

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
