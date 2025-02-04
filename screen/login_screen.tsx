
import AuthContent from "../components/auth/auth_content";

function LoginScreen() {
  return <AuthContent isLogin={false} onAuthenticate={function (credentials: { email: string; password: string; }): void {
      throw new Error("Function not implemented.");
  } }/>;
}

export default LoginScreen;