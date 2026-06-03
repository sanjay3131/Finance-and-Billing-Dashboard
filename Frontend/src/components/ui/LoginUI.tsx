import { useState } from "react";
import { useLogin } from "../../hooks/useAuthMutation";
import { FaLockOpen, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { googleLoginService } from "../../services/authServices";
import { FcGoogle } from "react-icons/fc";

const LoginUI = () => {
  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    loginMutation.mutate(
      {
        ShopEmail: email,
        ShopPassword: password,
      },
      {
        onSuccess: () => {
          navigate("/dashboard");
          toast.success("Login successful!");
        },
        onError: (error) => {
          console.error("Login failed:", error);
          toast.error(
            "Login failed. Please check your credentials and try again.",
          );
        },
      },
    );
  };

  const handleGoogleLogin = () => {
    try {
      googleLoginService();
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <form
      className=" mt-8 flex flex-col justify-center items-center gap-4 px-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      {/* email */}
      <span className=" gap-2 w-full sm:w-4/5 md:w-2/5 items-center justify-center">
        <label htmlFor="email" className="text-xl">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          value={email}
          className="bg-primaryBg border  border-[#ebecf0] focus:border rounded-xl w-full h-8 p-2"
          onChange={(e) => setEmail(e.target.value)}
        />
      </span>
      {/* password */}
      <span className=" flex-col gap-2 w-full sm:w-4/5 md:w-2/5 h-8 items-center justify-center mb-8 relative">
        <label htmlFor="password" className="text-xl">
          Password
        </label>

        <input
          className="bg-primaryBg border  border-[#ebecf0] focus:border rounded-xl w-full h-8 p-2"
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className=" ml-2 cursor-pointer absolute right-2 top-9"
          onClick={() => setShowPassword((v) => !v)}
          aria-pressed={showPassword}
        >
          {showPassword ? <FaLockOpen /> : <FaLock />}
        </button>
      </span>
      {/* submit */}
      <span className=" w-2/5 h-8 flex items-center justify-center">
        <button
          type="submit"
          className={`bg-gray-800 text-white font-semibold rounded-xl w-fit h-8 px-4 ${
            loginMutation.isPending
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90"
          }`}
          disabled={loginMutation.isPending}
          aria-busy={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </span>

      {/* Divider */}
      <div className="w-2/5 flex items-center gap-2 my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-500 text-sm">Or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* google login */}
      <div className=" flex flex-col justify-center items-center">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className=" bg-white border border-gray-300 text-gray-800 font-semibold rounded-xl w-fit h-10 px-6 mt-2 hover:bg-gray-50 flex items-center gap-2"
        >
          <FcGoogle size={20} />
          Login with Google
        </button>
      </div>
    </form>
  );
};

export default LoginUI;
