import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

const Navbar = () => {
  const navData = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Billing", path: "/billing" },
    { name: "Bill History", path: "/billHistory" },
    { name: "Expense", path: "/expense" },
    { name: "Products", path: "/products" },
    { name: "Settings", path: "/settings" },
  ];
  const pathName = window.location.pathname;
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div className="fixed top-0 left-0 w-full z-9999 bg-white ">
      {" "}
      {/* desktop navigation */}
      <div className="hidden md:flex items-center gap-6 p-4 justify-around ">
        {navData.map((nav) => (
          <a
            href={nav.path}
            key={nav.name}
            className={`font-semibold text-lg ${pathName === nav.path ? "text-blue-500" : "text-gray-700"}`}
          >
            {nav.name}
          </a>
        ))}
      </div>
      {/* mobile menu */}
      <div className="md:hidden flex items-center gap- p-2  justify-around z-10">
        {isMenuOpen ? (
          <IoClose
            size={28}
            className="md:hidden absolute top-4 right-4 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        ) : (
          <IoMenu
            size={28}
            className="md:hidden absolute top-4 right-4 cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>
      {/* mobile navigation */}
      <div
        className={`md:hidden fixed top-10 left-0 w-full z-9999 bg-primaryBg backdrop-blur-2xl flex flex-col items-center gap-6 p-4 justify-center transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navData.map((nav) => (
          <a
            href={nav.path}
            key={nav.name}
            className={`font-semibold text-lg ${pathName === nav.path ? "text-blue-500" : "text-gray-700"}`}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            {nav.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
