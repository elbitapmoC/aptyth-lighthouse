"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-foreground mb-6">
          Login
        </h1>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("space-y-4")}
          >
            <FormField name="email" label="Email" type="email" />
            <FormField name="password" label="Password" type="password" />
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </FormProvider>
        <p className="text-sm text-center text-muted-foreground mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-primary hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

interface FormFieldProps {
  name: keyof LoginFormValues;
  label: string;
  type?: React.HTMLInputTypeAttribute;
}

function FormField({ name, label, type = "text" }: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormValues>();

  return (
    <div>
      <Input
        id={name}
        label={label}
        error={errors[name]?.message}
        {...register(name)}
        type={type}
      />
    </div>
  );
}
