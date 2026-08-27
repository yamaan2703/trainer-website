"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { BrandLoaderRun } from "@/components/loader/brand-loader";

/**
 * Replays the brand loader (black panel) on client-side route changes so
 * theme jumps (home dark ↔ about/service light) stay covered and consistent.
 * Skips the first mount — initial paint is owned by `Preloader`.
 */
export function PageTransitionLoader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const isFirst = useRef(true);
  const [runId, setRunId] = useState<number | null>(null);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (prefersReducedMotion) return;
    setRunId((id) => (id ?? 0) + 1);
  }, [pathname, prefersReducedMotion]);

  if (prefersReducedMotion || runId === null) return null;

  return <BrandLoaderRun key={runId} />;
}
