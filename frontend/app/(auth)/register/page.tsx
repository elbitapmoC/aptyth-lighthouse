import RegisterForm from "@/components/auth/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Aptyth Lighthouse",
  description: "Create a new Aptyth Lighthouse account",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Create Account</h1>
      <RegisterForm />
    </>
  );
}
