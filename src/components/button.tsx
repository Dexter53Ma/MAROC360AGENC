"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap transition-colors select-none disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-button-primary-surface text-button-primary-text border-2 border-button-primary-surface hover:bg-button-primary-surface-hover hover:border-button-primary-surface-hover",
  secondary:
    "bg-button-secondary-surface text-button-secondary-text border-2 border-border-strong hover:bg-button-secondary-surface-hover hover:text-button-secondary-text-hover hover:border-border-strong",
  tertiary:
    "bg-button-tertiary-surface text-button-tertiary-text border-2 border-transparent hover:bg-button-tertiary-surface-hover hover:text-button-tertiary-text-hover",
  ghost:
    "bg-transparent text-text-primary border-2 border-transparent hover:bg-surface-tertiary",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-5 text-base",
  lg: "h-12 px-6 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(base, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(base, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);
LinkButton.displayName = "LinkButton";
