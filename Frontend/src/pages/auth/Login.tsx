import { useLogin } from "../../hooks/useAuthMutation";

const Login = () => {
  const loginMutation = useLogin();

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

      {loginMutation.isError && <p>Login failed</p>}
    </div>
  );
};

export default Login;
