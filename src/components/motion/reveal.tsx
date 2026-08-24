"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { defaultViewport, fadeInUp } from "@/lib/animations/motion-variants";

interface RevealProps {
  children: ReactNode;
  /** Defaults to `fadeInUp` from the shared variants. */
  variants?: Variants;
  /**
   * Which motion-wrapped element to render as, e.g. `motion.section`.
   * Must be one of the pre-built `motion.*` components (not a plain string
   * tag) — those are stable component identities, so passing a fresh
   * `motion(SomeTag)` wrapper here on every render would remount children.
   */
  as?: typeof motion.div;
  className?: string;
  /** Extra delay (s) before this instance's animation starts, e.g. for manual stagger. */
  delay?: number;
}

/**
 * Generic scroll-into-view reveal, built on the shared motion variants and
 * viewport config. Not tied to any page/section — a primitive for whatever
 * gets built on top of this foundation.
 *
 * @example
 * <Reveal><h2>Heading</h2></Reveal>
 * <Reveal as={motion.section} variants={scaleIn} delay={0.1}><Card /></Reveal>
 */
export function Reveal({
  children,
  variants = fadeInUp,
  as: MotionComponent = motion.div,
  className,
  delay = 0,
}: RevealProps) {
  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionComponent>
  );
}
