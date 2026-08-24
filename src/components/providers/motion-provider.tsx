"use client";

import { MotionConfig, type MotionConfigProps } from "framer-motion";
import type { ReactNode } from "react";

interface MotionProviderProps {
  children: ReactNode;
  reducedMotion?: MotionConfigProps["reducedMotion"];
}

/**
 * App-wide Framer Motion defaults. `reducedMotion="user"` makes every
 * `motion.*` component automatically respect the OS-level
 * prefers-reduced-motion setting without each component checking it itself.
 */
export function MotionProvider({
  children,
  reducedMotion = "user",
}: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion={reducedMotion} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
