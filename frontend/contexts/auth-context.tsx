import React, { createContext, useContext, useState, useEffect } from "react";
import { useLogin, useRegister } from "@/hooks/use-api";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

type User = {
  id: string;
  email: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const login = async (email: string, password: string) => {
    try {
      const response = await loginMutation.mutateAsync({ email, password });
      setUser(response.user);
      localStorage.setItem("token", response.token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await registerMutation.mutateAsync({ email, password });
      setUser(response.user);
      localStorage.setItem("token", response.token);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Simulate fetching user data with the token
      const fetchUser = async () => {
        try {
          const response = await fetch("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setUser(data.user);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          logout();
        }
      };
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
