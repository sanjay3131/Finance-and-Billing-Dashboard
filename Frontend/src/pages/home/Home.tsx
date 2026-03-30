import { useNavigate } from "react-router-dom";
import heroVideo from "../../assets/heroVideo.mp4";
import { FaReceipt } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { BsBarChart } from "react-icons/bs";
import { MdOutlineCloud } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { motion } from "framer-motion";
import ChartHologram from "../../assets/ChartHologram.png";
import Logo from "../../../logo.png";

import type { JSX } from "react";

const Home = () => {
  const navigate = useNavigate();
  type featureDataType = {
    icon: JSX.Element;
    title: string;
    description: string;
    points: string[];
  };

  const featuresData: featureDataType[] = [
    {
      icon: <FaReceipt />,
      title: "Automated Billing",
      description:
        "Send professional invoices and recurring bills automatically. Let the system follow up on unpaid dues.",
      points: [
        " Automated payment reminders for late clients",
        "Subscription-based recurring billing cycles",
        "Custom branded invoice templates",
      ],
    },
    {
      icon: <IoMdTime />,
      title: "Expense Tracking",
      description:
        "Monitor your spending in real-time. Categorize expenses and keep your cash flow healthy.",
      points: [
        "      Snap & store receipt photos instantly",
        "Automatic bank feed synchronization",
        "Smart categorization using AI",
      ],
    },
    {
      icon: <BsBarChart />,

      title: "Deep Analytics",

      description:
        "Powerful charts and reports that help you understand your business growth and areas for optimization.",
      points: [
        "       Year-over-year revenue projections",
        "Profitability analysis by product/service",
        "Exportable PDF & CSV financial reports",
      ],
    },
    {
      icon: <MdOutlineCloud />,
      title: "Secure Cloud Backup",
      description:
        "Access your data anywhere with encrypted cloud storage. Your financial history is always safe and synchronized.",
      points: [
        "End-to-end encryption for all data",
        "99.9% uptime with global redundancy",
      ],
    },
    {
      icon: <IoChatbubbleEllipsesOutline />,

      title: "Multi-channel Support",
      description:
        "Share bills and invoices via WhatsApp, Email, or SMS. Meet your customers where they are most comfortable.",
      points: [
        "       One-click sharing to WhatsApp Business",

        "Direct SMS notifications for reminders",
      ],
    },
  ];
  return (
    <div className=" w-full h-full min-h-screen bg-primaryBg overflow-x-hidden pb-8">
      {/* hero section */}
      <div className="w-full h-full p-6 flex flex-col gap-6 justify-center items-center transition-all duration-300">
        <h1 className="font-extrabold text-3xl md:text-4xl text-center    px-4">
          <span className="text-black">Smart Finance & </span>{" "}
          <span className="text-blue-600"> Billing Made Simple</span>
        </h1>

        <p className="text-gray-500 font-semibold text-center mt-4">
          Take full controll of your bussiness health. Manage professional
          invoices track daily expenses, and gain deep insights with automated
          fincaial reports.
        </p>
        <button
          onClick={() => navigate("/login")}
          className=" w-full h-12 font-semibold max-w-75 transition-all duration-300  shadow-blue-600 shadow-sm bg-blue-600 text-white rounded-2xl hover:-translate-y-1"
        >
          {" "}
          Get Started Free
        </button>
        <div
          className="w-full  bg-primaryBg lg:p-4 md:p-8 flex justify-center items-center rounded-lg 
        "
        >
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            className="w-full  rounded-lg object-cover shadow-lg  md:max-w-[80%]"
          ></video>
        </div>
      </div>
      {/* features section */}
      <div className="bg-white w-full h-fit mt-4 p-4">
        <div className="flex justify-center items-center flex-col">
          <h3 className="text-blue-600 font-bold text-2xl ">
            POWERFUL FEATURES
          </h3>
          <h1 className="text-3xl font-extrabold ">
            Everything you need to scale
          </h1>
        </div>

        {/* features cards */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full h-fit mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "
        >
          {featuresData.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <div className="text-2xl bg-white rounded-xl text-blue-500 w-fit p-2  shadow-md shadow-gray-900/35">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mt-2">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
              <div className="list-disc list-inside mt-2">
                {feature.points.map((point, i) => (
                  <span
                    key={i}
                    className="text-gray-500 flex gap-2 items-center "
                  >
                    <TiTick className="text-blue-500" />

                    {point}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* chart area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full  mt-12  rounded-lg flex flex-col p-4 gap-4"
      >
        <h1 className="text-2xl md:text-3xl text-center font-extrabold ">
          Visualize your growth with dynamic data
        </h1>
        <p className="text-gray-600">
          Stop guessing and start knowing. Our dashboard provides real-time
          visualizations of your revenue trends, expense breakdowns, and profit
          margins.
        </p>
        <div className="w-full text-gray-600 text-md flex flex-col gap-2">
          <span className="flex gap-2">
            <TiTick className="text-green-500" /> Weekly/Monthly Revenue
            Comparison
          </span>
          <span className="flex gap-2">
            <TiTick className="text-green-500" />
            Instant Profit/Loss Statements
          </span>
          <span className="flex gap-2">
            <TiTick className="text-green-500" />
            Customizable KPI Widgets
          </span>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={ChartHologram}
            alt="chat hologram image"
            className=" w-full md:w-[60%] rounded-2xl shadow"
          />
        </div>
      </motion.div>

      {/* start create account */}
      <motion.div className="p-5 ">
        <div
          className="bg-blue-500 w-full rounded-2xl text-white p-5 flex flex-col gap-6 text-center relative 
        before:content-[''] before:animate-pulse before:absolute before:size-50 before:bg-white/10 before:backdrop-blur-sm overflow-hidden before:z-0 before:rounded-full before:-top-10 before:-left-10 
        after:content-[''] after:absolute after:w-32 after:h-32 after:bg-white/30 after:rounded-full after:-bottom-16 after:-right-16 after:animate-pulse after:z-0 
        after:backdrop-blur-sm justify-center items-center"
        >
          <h1
            className="text-2xl md:text-4xl font-bold z-10
          "
          >
            Start managing your finances smarter today
          </h1>
          <p className="z-10 ">
            Join 10,000+ businesses who trust ShopTracker for their daily
            financial operations. No credit card required.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-500  w-fit py-4 px-5 rounded-2xl font-semibold z-10 shadow-lg shadow-gray-900/30 hover:-translate-y-1 transition-all duration-300"
          >
            Create Free Account
          </button>
        </div>
      </motion.div>
      {/* footer */}
      <motion.div>
        <div>
          {/* logo */}
          <div className="p-6 flex flex-col gap-4">
            <div className="flex justify-start items-center gap-2.5">
              <img
                src={Logo}
                className="size-12 rounded-2xl"
                alt="logo image"
              />
              <h1 className="text-2xl font-bold">ShopTracker</h1>
            </div>
            <p className="text-gray-500 text-center">
              Premium financial tools for modern businesses. Effortless billing,
              expense tracking, and powerful reporting in one place.
            </p>

            {/* copyRights * */}
            <div className="  border-t-2  border-t-gray-300 pt-4 w-full">
              <p className="text-sm text-center text-gray-500">
                © 2023 ShopTracker Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
