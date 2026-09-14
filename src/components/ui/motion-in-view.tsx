"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type MotionInViewProps = {
  children: React.ReactNode;
  className?: string;
  /** Root margin so animation can prepare slightly before visible */
  rootMargin?: string;
  /** When true, activate once on enter and keep the finished state */
  once?: boolean;
};

/**
 * Enables CSS animations only while near the viewport (or once, if `once`).
 * Keeps SSR markup intact; pauses off-screen work for INP / battery.
 * `data-motion-mounted` gates pre-hide so no-JS / pre-hydrate content stays visible.
 */
export function MotionInView({
  children,
  className,
  rootMargin = "120px 0px",
  once = false,
}: MotionInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setMounted(true);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setActive(false);
        }
      },
      { rootMargin, threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return (
    <div
      ref={ref}
      data-motion-mounted={mounted ? "true" : "false"}
      data-motion-in-view={active ? "true" : "false"}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
