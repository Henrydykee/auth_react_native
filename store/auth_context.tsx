// Import necessary hooks and types from React
import { useState, ReactNode, createContext, useEffect } from "react";
// Import AsyncStorage for persistent storage in React Native
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the shape of our authentication context
type AuthContextType = {
    token: string | null;       // Store the authentication token
    isAuthenticated: boolean;   // Boolean flag for auth status
    authenticate: (token: string) => void;  // Function to set auth token
    logout: () => void;        // Function to handle logout
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
    token: null,
    isAuthenticated: false,
    authenticate: () => {},    // Empty function as placeholder
    logout: () => {}          // Empty function as placeholder
});

// Define props type for the context provider component
type Props = {
    children: ReactNode;      // Allow any valid React children
}

// AuthContextProvider component to wrap the app and provide auth state
function AuthContextProvider({ children }: Props) {
    // State to hold the authentication token
    const [authToken, setAuthToken] = useState<string | null>(null);

    // Function to handle authentication
    function authenticate(token: string) {
        // Store token in persistent storage
        AsyncStorage.setItem('authToken', token);
        // Update state with the token
        setAuthToken(token);
    }

    // Function to handle logout
    function logout() {
        // Remove token from persistent storage
        AsyncStorage.removeItem('authToken');
        // Clear token from state
        setAuthToken(null);
    }

    // Create the context value object with current state and functions
    const value = {
        token: authToken,
        isAuthenticated: !!authToken,  // Convert token to boolean
        authenticate,
        logout
    };

    // Provide the authentication context to children components
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default AuthContextProvider;