/**
 * Shared Framer Motion variants. Keeping these centralized means every
 * section animates with the same timing language instead of each component
 * inventing its own durations/easings.
 */
import type { Transition, Variants } from "framer-motion";

export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: Transition["ease"] = [0.65, 0, 0.35, 1];

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Wrap children with this + give each child `fadeInUp` (or similar) to stagger a list/grid. */
export const staggerContainer = (
  staggerChildren = 0.12,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Standard viewport config for scroll-triggered `whileInView` animations. */
export const defaultViewport = { once: true, margin: "-15% 0px -15% 0px" };
