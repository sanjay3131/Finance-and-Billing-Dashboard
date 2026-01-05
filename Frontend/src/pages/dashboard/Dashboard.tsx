import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthContext";
import { logOut } from "../../services/authServices";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigation = useNavigate();
  const handelLogout = async () => {
    const response = await logOut();
    logout();

    if (response.status === 200) {
      toast.success("Logout Successful");
      navigation("/login");
    }
  };
  return (
    <div className="">
      <h1 className="text-xl font-bold ">Dashboard works</h1>

      <Button className="bg-red-500" onClick={handelLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
