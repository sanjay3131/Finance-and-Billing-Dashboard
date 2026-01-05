import { useAuth } from "../../hooks/useAuthContext";
import { useLogin } from "../../hooks/useAuthMutation";
import loginSvg from "../../assets/login-removebg-preview.png";
import { useState } from "react";
import LoginUI from "../../components/ui/LoginUI";
import RegisterUI from "../../components/ui/RegisterUI";

const Login = () => {
  const loginMutation = useLogin();
  const { logout } = useAuth();

  const handleLogin = () => {
    loginMutation.mutate({
      ShopEmail: "hahahomefoods@gmail.com",
      ShopPassword: "Tms10cm31.",
    });
  };
  const [isSelected, setIsSelected] = useState<string>("login");

  return (
    <div className=" h-screen w-full  relative py-4 px-2 min-w-90">
      <section className=" relative flex flex-col   justify-center items-center">
        {/* login svg */}
        {/* <img src={loginSvg} className="size-fit md:size-fit" /> */}

        {/* heading area */}
        <section
          className=" bg-white/75 w-full  backdrop-blur-[1px]  h-28   flex flex-col justify-center items-center
        
        "
        >
          <h1 className="text-2xl md:text-4xl font-bold">
            Welcome to ShopTracker
          </h1>
          <h3 className=" text-gray-500 font-semibold text-center">
            Tack daily sales, manage billing, and grow <br /> your business in
            seconds.
          </h3>
        </section>
      </section>

      {/* login and register buttons */}
      <div className="flex justify-center items-center gap-2 cursor-pointer">
        <section className=" bg-gray-500/15 w-[70%] p-1 flex flex-row gap-2 rounded-xs">
          {/* login */}
          <button
            className={` text-xl font-semibold ${
              isSelected === "login"
                ? "bg-white "
                : " text-gray-500  hover:bg-white/45"
            }  w-1/2 rounded-xs cursor-pointer `}
            onClick={() => setIsSelected("login")}
          >
            Login
          </button>
          {/* register */}
          <button
            className={` text-xl font-semibold ${
              isSelected === "register"
                ? "bg-white"
                : " text-gray-500  hover:bg-white/45 "
            }  w-1/2 rounded-xs cursor-pointer`}
            onClick={() => setIsSelected("register")}
          >
            {" "}
            Register
          </button>
        </section>
      </div>

      {/* form area */}
      <div className=" ">
        {isSelected === "login" ? <LoginUI /> : <RegisterUI />}
      </div>
    </div>
  );
};

export default Login;
