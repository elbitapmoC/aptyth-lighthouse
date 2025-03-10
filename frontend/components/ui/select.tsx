import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "px-4 py-2 rounded-md border border-input bg-background text-foreground shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
            error && "border-destructive focus:ring-destructive",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-sm text-destructive">{error}</span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";