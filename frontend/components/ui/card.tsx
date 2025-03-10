import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "outlined";
}

export function Card({ children, variant = "default", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg shadow-md p-4",
        variant === "default" && "bg-card text-card-foreground",
        variant === "outlined" && "border border-border bg-background text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-4 text-xl font-bold text-card-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-base text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-4 flex justify-end gap-2 text-sm text-secondary-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}