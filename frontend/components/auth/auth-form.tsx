"use client";

import * as React from "react";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormValues = z.infer<typeof authSchema>;

export interface AuthFormProps {
  onSubmit: SubmitHandler<AuthFormValues>;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  submitButtonText?: string;
  className?: string;
}

export function AuthForm({
  onSubmit,
  isSubmitting = false,
  errorMessage = null,
  submitButtonText = "Submit",
  className,
}: AuthFormProps) {
  const methods = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <FormField name="email" label="Email" type="email" />
        <FormField name="password" label="Password" type="password" />
        {errorMessage && (
          <p className="text-sm text-destructive text-center">{errorMessage}</p>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : submitButtonText}
        </Button>
      </form>
    </FormProvider>
  );
}

interface FormFieldProps {
  name: keyof AuthFormValues;
  label: string;
  type?: React.HTMLInputTypeAttribute;
}

function FormField({ name, label, type = "text" }: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<AuthFormValues>();

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
