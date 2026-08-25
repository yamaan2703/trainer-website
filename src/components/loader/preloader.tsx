"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/animations/motion-variants";

const DURATION_MS = 1400;

/**
 * Full-screen brand loader shown once on first paint. The logo wipes in via
 * clip-path (not opacity — keeps it feeling like a reveal, not a fade), a
 * counter ticks 0 -> 100, then the whole panel wipes up to uncover the hero
 * that's already been sitting there, painted, the entire time — this overlay
 * never gates the hero's own render.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // prefers-reduced-motion can only be read client-side (matchMedia),
      // so this can't be computed during render without a hydration
      // mismatch — syncing it here, once, is the correct escape hatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / DURATION_MS) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[var(--z-loader)] flex flex-col items-center justify-center bg-surface-2"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="w-[min(70vw,360px)]"
          >
            <Image
              src="/logo/wordmark-white.png"
              alt="Cameron Clark Fitness"
              width={2560}
              height={641}
              priority
              className="w-full h-auto"
            />
          </motion.div>

          <div className="mt-10 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-ink-muted">
            <span className="tabular-nums">{String(progress).padStart(3, "0")}</span>
            <span className="h-px w-16 overflow-hidden bg-hairline">
              <span
                className="block h-full bg-orange-600 transition-[width] duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </span>
            <span>100</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
