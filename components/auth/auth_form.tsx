import { useState } from "react";
import { Alert,  View , StyleSheet} from "react-native";
import Input from "./input";
import Button from "../ui/button";

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (credentials: { email: string; confirmEmail: string; password: string; confirmPassword: string }) => void;
  credentialsInvalid: {
    email: boolean;
    confirmEmail: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
}

function AuthForm({ isLogin, onSubmit, credentialsInvalid }: AuthFormProps) {
    
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  
    const {
      email: emailIsInvalid,
      confirmEmail: emailsDontMatch,
      password: passwordIsInvalid,
      confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;
  
    function updateInputValueHandler(inputType: string, enteredValue: any) {
      switch (inputType) {
        case 'email':
          setEnteredEmail(enteredValue);
          break;
        case 'confirmEmail':
          setEnteredConfirmEmail(enteredValue);
          break;
        case 'password':
          setEnteredPassword(enteredValue);
          break;
        case 'confirmPassword':
          setEnteredConfirmPassword(enteredValue);
          break;
      }
    }
      function submitHandler() {
      onSubmit({
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
        confirmPassword: enteredConfirmPassword,
      });
    }
  
    return (
      <View  >
        <View>
          <Input
            label="Email Address"
            onUpdateValue={(value) => updateInputValueHandler('email', value)}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
          />
          {!isLogin && (
            <Input
              label="Confirm Email Address"
              onUpdateValue={(value) => updateInputValueHandler('confirmEmail', value)}
              value={enteredConfirmEmail}
              keyboardType="email-address"
              isInvalid={emailsDontMatch}
            />
          )}
          <Input
            label="Password"
            onUpdateValue={(value) => updateInputValueHandler('password', value)}
            secure
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
          />
          {!isLogin && (
            <Input
              label="Confirm Password"
              onUpdateValue={(value) => updateInputValueHandler('confirmPassword', value)}
              secure
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
            />
)}          <View style={styles.buttons}>
            <Button onPress={submitHandler}>{isLogin ? 'Log In' : 'Sign Up'}</Button>
          </View>
        </View>
      </View>
    );
  }
  
  export default AuthForm;
  
  const styles = StyleSheet.create({
    buttons: {
      marginTop: 12,
    },
  });