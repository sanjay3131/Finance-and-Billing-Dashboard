import { useAuth } from "../../hooks/useAuthContext";
import { logOut } from "../../services/authServices";

const Dashboard = () => {
  const { logout } = useAuth();
  const handelLogout = () => {
    logOut();
    logout();
  };

  return (
    <div>
      <h1 className="text-xl font-bold ">Dashboard works</h1>

      <button onClick={handelLogout}>logout</button>
    </div>
  );
};

export default Dashboard;
