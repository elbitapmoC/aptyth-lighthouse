import { useState, useEffect } from "react";
import { login, register } from "../lib/api";

/**
 * Custom React hook for authentication using the Deno backend API.
 */
export default function useAuth() {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Logs in a user by calling the Deno backend API.
   * @param email - The user's email.
   * @param password - The user's password.
   */
  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const jwtToken = await login(email, password);
      setToken(jwtToken);

      // Decode the JWT token to extract user information
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      setUser({ id: payload.id, email: payload.email });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registers a new user by calling the Deno backend API.
   * @param email - The user's email.
   * @param password - The user's password.
   */
  const handleRegister = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userId = await register(email, password);
      setUser({ id: userId, email });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs out the current user by clearing the token and user state.
   */
  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  /**
   * Persists the token in localStorage and restores it on component mount.
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);

      // Decode the JWT token to extract user information
      const payload = JSON.parse(atob(storedToken.split(".")[1]));
      setUser({ id: payload.id, email: payload.email });
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  return {
    user,
    token,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}
