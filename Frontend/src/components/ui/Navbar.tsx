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
  return (
    <div className="flex bg-primaryBg w-full backdrop-blur-xl">
      <div className="flex gap-4 p-4 z-50">
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
    </div>
  );
};

export default Navbar;
