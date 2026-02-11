import { FaEye } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { MdLocalPhone } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";
import type { RegisterForm } from "../../utils/constants";
import { useRegister } from "../../hooks/useAuthMutation";
import { toast } from "sonner";

const RegisterUI = () => {
  const [form, setForm] = useState<RegisterForm>({
    shopEmail: "",
    shopPassword: "",
    shopName: "",
    shopAddress: "",
    shopPhone: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    sameAsShop: false,
  });
  const registerMutation = useRegister();

  const handelResister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      if (type === "checkbox" && name === "sameAsShop") {
        const same = checked;
        return {
          ...prev,
          sameAsShop: same,
          ownerEmail: same ? prev.shopEmail : prev.ownerEmail,
        };
      }
      return { ...prev, [name]: value };
    });
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(
      { form },
      {
        onSuccess: (data) => {
          console.log("Registration successful:", data);
          toast.success("Register success ");
        },
        onError: (error) => {
          console.error("Registration failed:", error);
          toast.error("Register error ");
        },
      },
    );
  };
  return (
    <div className="w-full px-4 py-6 flex flex-col gap-4  justify-center items-center ">
      {/* text  */}
      <div>
        <h1 className="text-2xl font-bold ">Let's get your shop started</h1>
        <h3 className="text-gray-500 font-semibold mt-2">
          Enter your business detials below to create your account and start
          tracking sales
        </h3>
      </div>
      {/* form  */}
      <div className="w-full  flex flex-col gap-4 justify-center items-center p-6 rounded-lg">
        <h2 className="text-xl font-semibold mt-4 inline-flex items-center gap-2">
          <BsShop className="text-indigo-500" />
          Shop Details
        </h2>
        <form
          className="w-full flex flex-col gap-4  justify-center items-center"
          onSubmit={handleSubmit}
        >
          {/* shop email */}
          <section className="w-full sm:w-3/5  relative">
            <label htmlFor="shopEmail" className="text-lg">
              Shop Email
            </label>
            <span className="absolute left-2 top-9 transform ">
              <IoMail className="" />
            </span>
            <input
              type="email"
              id="shopEmail"
              name="shopEmail"
              value={form.shopEmail}
              onChange={handelResister}
              required
              placeholder="Enter your shop email"
              className="bg-primaryBg border  border-[#ebecf0] focus:border rounded-xl w-full h-8 p-2 px-8 "
            />
          </section>
          {/* shop password */}
          <section className="w-full sm:w-3/5 relative">
            <label htmlFor="shopPassword" className="text-lg">
              Shop Password
            </label>
            <span className="absolute left-2 top-9 transform">
              <FaLock />
            </span>
            <span className="absolute right-2 top-9 transform cursor-pointer text-gray-600">
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye onClick={() => setShowPassword(true)} />
              )}
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="shopPassword"
              name="shopPassword"
              value={form.shopPassword}
              onChange={handelResister}
              required
              placeholder="Enter your shop password"
              className="bg-primaryBg border  border-[#ebecf0] focus:border rounded-xl w-full h-8 p-2 px-8"
            />
          </section>
          {/* shop name */}
          <section className="w-full sm:w-3/5 relative">
            <label htmlFor="shopName" className="text-lg">
              Shop Name
            </label>
            <span className="absolute left-2 top-9 transform">
              <FaShop />
            </span>
            <input
              type="text"
              id="shopName"
              name="shopName"
              value={form.shopName}
              onChange={handelResister}
              required
              placeholder="Enter your shop name"
              className="bg-primaryBg border  border-[#ebecf0] focus:border rounded-xl w-full h-8 p-2 px-8"
            />
          </section>
          {/* shop address */}
          <section className="w-full sm:w-3/5 relative">
            <label htmlFor="shopAddress" className="text-lg">
              Shop Address
            </label>
            <span className="absolute left-2 top-9 transform">
              <CiLocationOn />
            </span>
            <input
              type="text"
              required
              id="shopAddress"
              name="shopAddress"
              value={form.shopAddress}
              onChange={handelResister}
              placeholder="Enter your shop address"
              className="bg-primaryBg border  border-[#ebecf0] focus:border rounded-xl w-full h-8 p-2 px-8"
            />
          </section>
          {/* shop phone */}
          <section className="w-full sm:w-3/5 relative">
            <label htmlFor="shopPhone" className="text-lg">
              Shop Phone
            </label>
            <span className="absolute left-2 top-9 transform">
              <MdLocalPhone />
            </span>
            <input
              type="tel"
              required
              id="shopPhone"
              name="shopPhone"
              value={form.shopPhone}
              onChange={handelResister}
              placeholder="Enter your shop phone number"
              className="bg-primaryBg border  border-[#ebecf0] focus:border rounded-xl w-full h-8 p-2 px-8"
            />
          </section>

          {/* owner details */}
          <h2 className="text-xl font-semibold mt-4 inline-flex items-center gap-2">
            <FaUser className="text-green-500" />
            Owner Details
          </h2>
          {/* owner name */}
          <section className="w-full sm:w-3/5 relative">
            <label htmlFor="ownerName" className="text-lg">
              Owner Name
            </label>
            <span className="absolute left-2 top-9 transform">
              <FaIdCard />
            </span>
            <input
              type="text"
              required
              id="ownerName"
              name="ownerName"
              value={form.ownerName}
              onChange={handelResister}
              placeholder="Enter owner full name"
              className="bg-primaryBg border  border-[#ebecf0] focus:border rounded-xl w-full h-8 p-2 px-8"
            />
          </section>

          {/* owner phone number */}
          <section className="w-full sm:w-3/5 relative">
            <label htmlFor="ownerPhone" className="text-lg">
              Owner Phone Number
            </label>
            <span className="absolute left-2 top-9 transform">
              <FaMobileAlt />
            </span>
            <input
              type="tel"
              required
              id="ownerPhone"
              name="ownerPhone"
              value={form.ownerPhone}
              onChange={handelResister}
              placeholder="Enter owner phone number"
              className="bg-primaryBg border  border-[#ebecf0] focus:border rounded-xl w-full h-8 p-2 px-8"
            />
          </section>
          {/* owner email */}
          <section className="w-full sm:w-3/5 relative">
            <label htmlFor="ownerEmail" className="text-lg">
              Owner Email
            </label>
            <span className="absolute left-2 top-9 transform">
              <FaClipboardUser />
            </span>
            <input
              type="email"
              id="ownerEmail"
              name="ownerEmail"
              value={form.ownerEmail}
              onChange={handelResister}
              placeholder="Enter owner email"
              disabled={form.sameAsShop}
              className={` border  border-[#ebecf0] focus:border rounded-xl w-full h-8 p-2 px-8 ${
                form.sameAsShop ? "bg-gray-500 " : "bg-primaryBg"
              }`}
            />
          </section>
          {/* same as shop email checkbox */}
          <section className="flex gap-2 justify-start items-center w-full sm:w-3/5 ">
            <input
              type="checkbox"
              id="sameAsShopEmail"
              name="sameAsShop"
              checked={form.sameAsShop}
              onChange={handelResister}
              className="h-4 w-4"
            />
            <label htmlFor="sameAsShopEmail">same as shop email</label>
          </section>

          {/* submit button */}
          <button
            type="submit"
            className={`w-full sm:w-3/5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4
              ${registerMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}
            `}
            disabled={registerMutation.isPending}
            aria-busy={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Registering..." : "Register Shop"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUI;
