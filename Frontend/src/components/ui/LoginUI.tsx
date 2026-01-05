import { useState } from "react";
import { useLogin } from "../../hooks/useAuthMutation";
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
        onSuccess: (data) => {
          console.log("Login successful:", data);
          navigate("/dashboard");
          toast.success("Login successful!");
        },
        onError: (error) => {
          console.error("Login failed:", error);
          toast.error(
            "Login failed. Please check your credentials and try again."
          );
        },
      }
    );
  };
  return (
    <div className=" mt-8 flex flex-col justify-center items-center gap-4 px-4">
      {/* email */}
      <span className=" gap-2 w-full sm:w-4/5 md:w-2/5 h- items-center justify-center">
        <label htmlFor="email " className="text-xl">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className=" ml-2 cursor-pointer absolute right-2 top-9"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaLockOpen /> : <FaLock />}
        </button>
      </span>
      {/* submit */}
      <span className=" w-2/5 h-8 flex items-center justify-center">
        <button
          className="bg-gray-800 text-white font-semibold rounded-xl w-fit h-8 px-4"
          onClick={handleLogin}
        >
          Login
        </button>
      </span>
      <div className=" flex flex-col justify-center items-center mt-4">
        <p>-------- or -------</p>
        <button className=" bg-blue-600 text-white font-semibold rounded-xl w-fit h-8 px-4 mt-4">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginUI;
