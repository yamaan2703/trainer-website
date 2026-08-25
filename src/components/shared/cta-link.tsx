"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}

const PULL = 0.35;
const MAX_OFFSET = 14;

/**
 * A CTA that gently pulls toward the cursor on hover ("magnetic button").
 * Used 3+ times across the page (hero, each service, the closing CTA), so
 * it earns being a shared component rather than re-implemented per section.
 */
export function CtaLink({ href, children, variant = "solid", className }: CtaLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetX * PULL)));
    y.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetY * PULL)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      className={cn(
        "group inline-flex w-fit items-center gap-3 px-7 py-4 text-sm font-semibold uppercase tracking-[0.08em] transition-colors",
        variant === "solid" && "bg-orange-600 text-lime-ink hover:bg-orange-600/90",
        variant === "outline" &&
        "border border-hairline text-ink hover:border-orange-600 hover:text-orange-600",
        className
      )}
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </motion.a>
  );
}
