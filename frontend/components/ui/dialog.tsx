import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { LucideIcon } from "lucide-react";

type DialogProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function Dialog({ children, open, onOpenChange }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
}

type DialogTriggerProps = {
  children: React.ReactNode;
};

export function DialogTrigger({ children }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>;
}

type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
};

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={clsx(
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity",
          className
        )}
      />
      <DialogPrimitive.Content
        ref={ref}
        className={clsx(
          "fixed inset-0 m-auto max-w-lg rounded-lg bg-card p-6 shadow-lg focus:outline-none",
          className
        )}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);

DialogContent.displayName = "DialogContent";

type DialogHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <div className={clsx("mb-4 text-lg font-bold text-primary", className)}>
      {children}
    </div>
  );
}

type DialogFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={clsx("mt-4 flex justify-end gap-2", className)}>
      {children}
    </div>
  );
}

type DialogCloseProps = {
  children?: React.ReactNode;
  className?: string;
};

export function DialogClose({ children, className }: DialogCloseProps) {
  return (
    <DialogPrimitive.Close
      className={clsx(
        "absolute top-2 right-2 rounded-full p-2 text-muted hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-muted",
        className
      )}
    >
      {children || <LucideIcon name="x" />}
    </DialogPrimitive.Close>
  );
}
