import React from "react";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          Login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
