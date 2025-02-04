import { useState } from "react";
import AuthContent from "../components/auth/auth_content";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/loading_overlay";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import WelcomeScreen from "./welcome_screen";
import { Alert } from "react-native";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
};

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // TODO: Implement signup logic here.
  async function signUpHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    try {
      const res = await createUser({ email, password });
      setIsLoading(false);
      //  navigation.navigate(WelcomeScreen())
      console.log("User created successfully:");
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        Alert.alert("Authication failed!", error.message.replaceAll("_", " "));
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
      isLogin={false}
      onAuthenticate={function (credentials: {
        email: string;
        password: string;
      }): void {
        signUpHandler({
          email: credentials.email,
          password: credentials.password,
        });
      }}
    />
  );
}

export default SignupScreen;
