import { useState } from "react";
import { Alert, View , StyleSheet} from "react-native";
import FlatButton from "../ui/flat_button";
import AuthForm from "./auth_form";
import { Colors } from "../../constant/styles";
import { useNavigation } from '@react-navigation/native';
import LoginScreen from "../../screen/login_screen";
import SignupScreen from "../../screen/signup_screen";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
};


interface AuthContentProps {
  isLogin: boolean;
  onAuthenticate: (credentials: { email: string; password: string }) => void;
}

function AuthContent({ isLogin, onAuthenticate }: AuthContentProps) {
    
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


    const [credentialsInvalid, setCredentialsInvalid] = useState({
      email: false,
      password: false,
      confirmEmail: false,
      confirmPassword: false,
    });
  
    function switchAuthModeHandler() {
        if(isLogin){
            navigation.navigate('Signup');
        }else{
            navigation.goBack();
        }
   
    }
  
    function submitHandler(credentials: { email: string; confirmEmail: string; password: string; confirmPassword: string }) {
      let { email, confirmEmail, password, confirmPassword } = credentials;
  
      email = email.trim();
      password = password.trim();
  
      const emailIsValid = email.includes('@');
      const passwordIsValid = password.length > 6;
      const emailsAreEqual = email === confirmEmail;
      const passwordsAreEqual = password === confirmPassword;
  
      if (
        !emailIsValid ||
        !passwordIsValid ||
        (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
      ) {
        Alert.alert('Invalid input', 'Please check your entered credentials.');
        setCredentialsInvalid({
          email: !emailIsValid,
          confirmEmail: !emailIsValid || !emailsAreEqual,
          password: !passwordIsValid,
          confirmPassword: !passwordIsValid || !passwordsAreEqual,
        });
        return;
      }
      onAuthenticate({ email, password });
    }
  
    return (
      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? 'Create a new user' : 'Log in instead'}
          </FlatButton>
        </View>
      </View>
    );
  }
  
  export default AuthContent;
  
  const styles = StyleSheet.create({
    authContent: {
      marginTop: 64,
      marginHorizontal: 32,
      padding: 16,
      borderRadius: 8,
      backgroundColor: Colors.primary800,
      elevation: 2,
      shadowColor: 'black',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.35,
      shadowRadius: 4,
    },
    buttons: {
      marginTop: 8,
    },
  });

