import axios, { AxiosError } from "axios";

// Environment variables are better for sensitive data
const FIREBASE_AUTH_BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts";
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY || "";

// Type definitions
interface AuthCredentials {
  email: string;
  password: string;
}

export interface FirebaseAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// Create a reusable axios instance
const authClient = axios.create({
  baseURL: FIREBASE_AUTH_BASE_URL,
  params: { key: API_KEY },
  headers: { "Content-Type": "application/json" },
});

// Generic error handler
function handleAuthError(error: unknown): never {
  if (error instanceof AxiosError) {
  //  console.error("Auth API Error:", error.response?.data?.error || error.message);
    throw new Error(error.response?.data?.error?.message || "Authentication failed");
  }
//   console.error("Unexpected error:", error);
  throw new Error("An unexpected error occurred");
}

export async function createUser({ email, password }: AuthCredentials): Promise<FirebaseAuthResponse> {
  try {
    const { data } = await authClient.post<FirebaseAuthResponse>(
      ":signUp",
      { email, password, returnSecureToken: true }
    );
    return data;
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function loginUser({ email, password }: AuthCredentials): Promise<FirebaseAuthResponse> {
  try {
    const { data } = await authClient.post<FirebaseAuthResponse>(
      ":signInWithPassword",
      { email, password, returnSecureToken: true }
    );
    return data;
  } catch (error) {
    return handleAuthError(error);
  }
}