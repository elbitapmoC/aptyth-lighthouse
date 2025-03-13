import LoginForm from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Aptyth Lighthouse",
  description: "Sign in to your Aptyth Lighthouse account",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
      <LoginForm />
    </div>
  );
}
