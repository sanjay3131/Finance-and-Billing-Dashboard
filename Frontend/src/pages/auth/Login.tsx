import { useAuth } from "../../hooks/useAuthContext";
import { useLogin } from "../../hooks/useAuthMutation";

const Login = () => {
  const loginMutation = useLogin();
  const { logout } = useAuth();

  const handleLogin = () => {
    loginMutation.mutate({
      ShopEmail: "hahahomefoods@gmail.com",
      ShopPassword: "Tms10cm31.",
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>

      <button onClick={logout}> logout</button>

      {loginMutation.isError && <p>Login failed</p>}
    </div>
  );
};

export default Login;
