import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegister } from "@/hooks/use-api";

type RegisterFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();
  const registerMutation = useRegister();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await registerMutation.mutateAsync({ email: data.email, password: data.password });
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-primary mb-4">Register</h2>

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

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          className="w-full mt-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        disabled={registerMutation.isLoading}
      >
        {registerMutation.isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
