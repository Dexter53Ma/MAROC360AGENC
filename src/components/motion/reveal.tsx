"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

type Variant = "up" | "fade" | "scale" | "stagger";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: 0 | 100 | 200 | 300 | 400;
  as?: ElementType;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className,
  once = true,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  const baseClass =
    variant === "fade"
      ? "reveal-fade"
      : variant === "scale"
        ? "reveal-scale"
        : variant === "stagger"
          ? "reveal-stagger"
          : "reveal";

  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <Tag
      ref={ref as never}
      className={cn(baseClass, visible && "is-visible", delayClass, className)}
    >
      {children}
    </Tag>
  );
}
