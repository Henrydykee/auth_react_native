import { useState } from "react";
import AuthContent from "../components/auth/auth_content";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/commonjs/src/types";
import LoadingOverlay from "../components/ui/loading_overlay";
import { RootStackParamList } from "../screen/signup_screen";
import { loginUser } from "../util/auth";
import { Alert } from "react-native";

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // TODO: Implement login logic here.
  async function signInHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    try {
      const res = await loginUser({ email, password });
      setIsLoading(false);
      console.log("User created successfully:");
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        Alert.alert("Authication failed!",error.message.replaceAll("_", " "));
      } else {
        Alert.alert("An unknown error occurred");
      }
      console.log(error);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message={"Loading"} />;
  }

  return (
    <AuthContent
      isLogin={true}
      onAuthenticate={function (credentials: {
        email: string;
        password: string;
      }): void {
        signInHandler({
          email: credentials.email,
          password: credentials.password,
        });
      }}
    />
  );
}

export default LoginScreen;
