"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { useGsap } from "@/hooks/use-gsap";

type ScrollTriggerVars = Omit<ScrollTrigger.Vars, "trigger">;

/**
 * Builds a single ScrollTrigger-driven `gsap.fromTo` tied to `ref`, scoped
 * and auto-reverted via `useGsap`. Covers the common "animate this element
 * in as it scrolls into view" case without writing the boilerplate by hand.
 *
 * @example
 * const cardRef = useRef<HTMLDivElement>(null);
 * useScrollTrigger(cardRef, {
 *   from: { opacity: 0, y: 60 },
 *   to: { opacity: 1, y: 0 },
 * });
 */
export function useScrollTrigger(
  ref: RefObject<Element | null>,
  {
    from,
    to,
    scrollTrigger,
    deps = [],
  }: {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
    scrollTrigger?: ScrollTriggerVars;
    deps?: ReadonlyArray<unknown>;
  }
) {
  useGsap(
    ref,
    () => {
      if (!ref.current) return;

      gsap.fromTo(ref.current, from, {
        ...to,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          ...scrollTrigger,
        },
      });
    },
    deps
  );
}
