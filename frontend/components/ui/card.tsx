import React from "react";
import { clsx } from "clsx";

interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({ title, description, children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "p-6 bg-background text-foreground border border-gray-300 rounded-lg shadow-md",
        className
      )}
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
