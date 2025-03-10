import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLogin } from "@/hooks/use-api";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await loginMutation.mutateAsync(data);
      alert("Login successful!");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-primary mb-4">Login</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full mt-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full mt-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        disabled={loginMutation.isLoading}
      >
        {loginMutation.isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
