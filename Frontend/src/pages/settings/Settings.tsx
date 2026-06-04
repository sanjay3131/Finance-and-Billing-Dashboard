import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { logOut } from "../../services/authServices";
import { useQueryClient } from "@tanstack/react-query";

const Settings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("token");
      localStorage.removeItem("shopId");
      queryClient.clear();

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Settings;
