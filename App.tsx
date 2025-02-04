// Import necessary components and modules
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screen/login_screen";
import { Colors } from "./constant/styles";
import SignupScreen from "./screen/signup_screen";
import WelcomeScreen from "./screen/welcome_screen";
import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthContextProvider, { AuthContext } from "./store/auth_context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

// Create a stack navigator instance
const Stack = createStackNavigator();

// Stack navigator for unauthenticated users
// Contains Login and Signup screens
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white", // Header text color
        cardStyle: { backgroundColor: Colors.primary100 }, // Background color for screens
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// Stack navigator for authenticated users
// Contains the Welcome screen
function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        cardStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

// Navigation component that handles conditional rendering based on auth state
function Navigation() {
  // Get authentication context to check if user is logged in
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {/* Show AuthStack when user is not authenticated */}
      {!authContext.isAuthenticated && <AuthStack />}
      {/* Show AuthenticatedStack when user is authenticated */}
      {authContext.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user token from AsyncStorage and authenticate user if it exists
    async function fetchToken() {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        auth.authenticate(token);
      }
      setIsLoading(false);
    }
    fetchToken();
  }, []);

  if(isLoading){
    return <AppLoading />;
  }
  return <Navigation />;
}

// Root App component
export default function App() {
  return (
    <>
      {/* Wrap entire app with AuthContextProvider for auth state management */}
      <AuthContextProvider>
        {/* Set status bar style */}
        <StatusBar style="light" />
        {/* Main navigation component */}
        <Root />
      </AuthContextProvider>
    </>
  );
}
