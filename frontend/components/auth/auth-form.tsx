"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to log in.");
      }

      // Save the token to localStorage or cookies
      localStorage.setItem("token", data.token);

      // Redirect to the home page or dashboard
      router.push("/");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register.");
      }

      // Redirect to login or home page after successful registration
      router.push("/");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-background text-foreground rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Authentication</h1>
      {error && (
        <div className="mb-4 text-red-600 text-sm font-medium">{error}</div>
      )}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
          placeholder="Enter your password"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Button
          variant="primary"
          size="md"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </div>
    </div>
  );
}
