import { useState, useEffect } from "react";
import { login } from "@/lib/api";
import useStore from "@/lib/store";

/**
 * Custom hook for managing user authentication.
 * Provides methods for login, logout, and checking authentication status.
 */
export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, setAuthenticated } = useStore();

  /**
   * Logs in the user by calling the backend API and storing the JWT token.
   * @param email - The user's email.
   * @param password - The user's password.
   */
  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = await login(email, password);
      localStorage.setItem("authToken", token);
      setAuthenticated(true);
    } catch (err) {
      console.error("Login failed:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs out the user by clearing the JWT token from local storage.
   */
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    setAuthenticated(false);
  };

  /**
   * Checks if the user is authenticated by verifying the presence of a JWT token.
   */
  const checkAuthStatus = () => {
    const token = localStorage.getItem("authToken");
    setAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return {
    isAuthenticated,
    loading,
    error,
    loginUser,
    logoutUser,
  };
}
