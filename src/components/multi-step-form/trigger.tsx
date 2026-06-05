"use client";

import { cn } from "@/lib/utils";
import type { MultiStepFormDict } from "@/lib/i18n/dict.types";
import { useMultiStepForm } from "./provider";

type MultiStepFormTriggerProps = {
  label: string;
  dict: MultiStepFormDict;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  fullWidth?: boolean;
  className?: string;
};

export function MultiStepFormTrigger({
  label,
  dict,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: MultiStepFormTriggerProps) {
  const { open } = useMultiStepForm();

  const sizeClass = size === "sm" ? "h-10 px-4 text-sm" : "h-12 px-6 text-base";
  const variantClass =
    variant === "primary"
      ? "bg-text-primary text-surface-primary hover:bg-text-secondary"
      : "bg-surface-tertiary text-text-primary hover:bg-surface-primary border border-text-primary/15";

  return (
    <button
      type="button"
      onClick={() => open(dict)}
      data-form-trigger="multi-step"
      className={cn(
        "press inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary/30",
        sizeClass,
        variantClass,
        fullWidth && "w-full",
        className,
      )}
    >
      {label}
    </button>
  );
}
