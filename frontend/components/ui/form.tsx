"use client";

import * as React from "react";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export interface FormProps {
  onSubmit: SubmitHandler<FormValues>;
  className?: string;
}

export function Form({ onSubmit, className }: FormProps) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <FormField name="name" label="Name" />
        <FormField name="email" label="Email" type="email" />
        <FormField name="password" label="Password" type="password" />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
}

interface FormFieldProps {
  name: keyof FormValues;
  label: string;
  type?: React.HTMLInputTypeAttribute;
}

function FormField({ name, label, type = "text" }: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

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
