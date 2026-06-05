"use client";

import { useState, type FormEvent } from "react";
import { Check, ArrowRight, Loader2 } from "@/components/icons";
import { cn } from "@/lib/utils";

interface EmailSubscribeProps {
  placeholder?: string;
  buttonLabel?: string;
  successLabel?: string;
  variant?: "surface" | "primary";
  size?: "sm" | "md";
  className?: string;
  onSubmit?: (email: string) => Promise<void> | void;
}

export function EmailSubscribe({
  placeholder = "Your work email",
  buttonLabel = "Get Started",
  successLabel = "Thanks!",
  variant = "surface",
  size = "md",
  className,
  onSubmit,
}: EmailSubscribeProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await Promise.resolve(onSubmit?.(email));
      await new Promise((r) => setTimeout(r, 450));
      setStatus("ok");
      setEmail("");
      setTimeout(() => setStatus("idle"), 2400);
    } catch {
      setStatus("idle");
    }
  };

  const inputSize = size === "sm" ? "h-10 text-sm" : "h-12 text-base";
  const buttonSize = size === "sm" ? "h-10 px-5 text-sm" : "h-12 px-6 text-base";
  const inputRadius = size === "sm" ? "rounded-full" : "rounded-full";

  const isPrimary = variant === "primary";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "group/form flex w-full max-w-xl flex-col items-stretch gap-2 sm:flex-row sm:items-center",
        className
      )}
    >
      <label className="sr-only" htmlFor={`email-${buttonLabel}`}>
        {placeholder}
      </label>
      <input
        id={`email-${buttonLabel}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        disabled={status === "loading"}
        className={cn(
          "input-focus min-w-0 flex-1 border px-5 outline-none",
          inputSize,
          inputRadius,
          isPrimary
            ? "border-surface-primary/30 bg-surface-primary text-text-primary placeholder:text-text-tertiary"
            : "border-text-primary/10 bg-surface-tertiary text-text-primary placeholder:text-text-tertiary"
        )}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "press relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full font-semibold",
          buttonSize,
          isPrimary
            ? "bg-button-primary-surface text-button-primary-text"
            : "bg-text-primary text-surface-primary",
          status === "loading" && "cursor-wait opacity-90"
        )}
      >
        <span
          className={cn(
            "inline-flex items-center gap-2 transition-all duration-300",
            status === "ok" && "translate-y-2 opacity-0"
          )}
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span>{buttonLabel}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/form:translate-x-0.5" />
            </>
          )}
        </span>
        <span
          className={cn(
            "absolute inset-0 inline-flex items-center justify-center gap-2 transition-all duration-300",
            status === "ok"
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0"
          )}
        >
          <Check className="h-4 w-4" />
          <span>{successLabel}</span>
        </span>
      </button>
    </form>
  );
}
