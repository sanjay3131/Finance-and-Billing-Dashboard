import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import Login from "../pages/auth/Login.tsx";
import Billing from "../pages/billing/Billing.tsx";
import BillHistory from "../pages/bill/BillHistory.tsx";
import Expense from "../pages/expense/Expense.tsx";
import Products from "../pages/products/Products.tsx";
import Settings from "../pages/settings/Settings.tsx";
import Register from "../pages/auth/Register.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/billHistory" element={<BillHistory />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/products" element={<Products />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      log
    </Routes>
  );
};

export default AppRoutes;
