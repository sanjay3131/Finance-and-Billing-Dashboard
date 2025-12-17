import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
