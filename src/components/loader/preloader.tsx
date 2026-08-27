"use client";

import { useReducedMotion } from "framer-motion";
import { BrandLoaderRun } from "@/components/loader/brand-loader";

/**
 * Full-screen brand loader shown once on first paint. Always black —
 * independent of `--theme-t` so light routes never tint the panel cream.
 */
export function Preloader() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion === true) return null;

  return <BrandLoaderRun />;
}
