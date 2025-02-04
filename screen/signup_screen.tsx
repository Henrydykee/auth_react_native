import { useContext, useState } from "react";
import AuthContent from "../components/auth/auth_content";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/loading_overlay";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import WelcomeScreen from "./welcome_screen";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth_context";
import {FirebaseAuthResponse} from "../util/auth";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
};

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const  authContext  = useContext(AuthContext);

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
      const res: FirebaseAuthResponse = await createUser({ email, password });
      authContext.authenticate(res.idToken);
      setIsLoading(false);
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
