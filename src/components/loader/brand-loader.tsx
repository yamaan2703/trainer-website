"use client";

import { useEffect, useRef, useState } from "react";
import { LottieSvg } from "lottie-react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT } from "@/lib/animations/motion-variants";

/** Source Lottie for the signature SVG animation (~6s at 30fps, played at 1.2×). */
const LOTTIE_SRC = "/animations/cameron-clark-white.json";
const PLAYBACK_SPEED = 1.2;
const EXIT_HOLD_MS = 220;

/**
 * Full-screen black loader that plays the original Cameron Clark signature
 * animation (SVG renderer) once — no extra draw/clip overlays.
 */
export function BrandLoaderRun({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);
  const finishingRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function finish() {
    if (finishingRef.current) return;
    finishingRef.current = true;
    window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      onCompleteRef.current?.();
    }, EXIT_HOLD_MS);
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[var(--z-loader)] flex items-center justify-center bg-black"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          <LottieSvg
            src={LOTTIE_SRC}
            autoplay
            loop={false}
            speed={PLAYBACK_SPEED}
            className="h-full w-full"
            subscriptions={{
              complete: finish,
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
