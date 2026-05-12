import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import Login from "../pages/auth/Login.tsx";
import Billing from "../pages/billing/Billing.tsx";
import BillHistory from "../pages/billing/BillHistory.tsx";
import Expense from "../pages/expense/Expense.tsx";
import Products from "../pages/products/Products.tsx";
import Settings from "../pages/settings/Settings.tsx";
import Register from "../pages/auth/Register.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import EditBill from "../pages/billing/EditBill.tsx";
import Navbar from "../components/ui/Navbar.tsx";
import Home from "../pages/home/Home.tsx";
import ProductEditPage from "../pages/products/ProductEditPage.tsx";
import AddProducts from "../pages/products/AddProducts.tsx";
import AddExpense from "../pages/expense/AddExpense.tsx";
import EditExpense from "../pages/expense/EditExpense.tsx";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="reletive ">
      {!hideNavbar && (
        <div className="fixed top-0 left-0 w-full mb-20 z-[9999]">
          <Navbar />
        </div>
      )}
      <div className="mt-15">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/billHistory" element={<BillHistory />} />
            <Route path="/billing/edit/:billId" element={<EditBill />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/expense/add" element={<AddExpense />} />
            <Route path="/expense/edit/:expenseId" element={<EditExpense />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/edit/:productId"
              element={<ProductEditPage />}
            />
            <Route path="/products/add" element={<AddProducts />} />

            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;
