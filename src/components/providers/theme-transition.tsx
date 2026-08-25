"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";

/**
 * Scrubs `--theme-t` on `:root` from 0 (dark) → 1 (light) as the timeline
 * (image slider) leaves the viewport and Story takes over.
 *
 * Tuned for a short, fluid scrub: tight catch-up lag + eased progress over a
 * compact scroll window so the shift feels fast without snapping.
 */
export function ThemeTransition() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    root,
    () => {
      const html = document.documentElement;
      const timeline = document.querySelector<HTMLElement>("#timeline");
      const story = document.querySelector<HTMLElement>("#story");
      if (!timeline || !story) return;

      const state = { t: 0 };

      function applyTheme({ t }: { t: number }) {
        // Three decimals is enough for color-mix; avoids needless style thrash.
        html.style.setProperty("--theme-t", t.toFixed(3));
      }

      applyTheme({ t: 0 });

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(state, {
          t: 1,
          // Ease the *value* along scrub progress — soft ease-in/out so mid
          // tones don't linger and the ends don't feel abrupt.
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timeline,
            // Start as the slider is leaving; finish early into Story so the
            // whole shift lands in roughly one viewport of scroll.
            start: "bottom 85%",
            endTrigger: story,
            end: "top 35%",
            // Low scrub = tracks the wheel closely with a light smooth lag.
            scrub: 0.4,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
          onUpdate: () => applyTheme({ t: state.t }),
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const st = gsap.timeline({
          scrollTrigger: {
            trigger: timeline,
            start: "bottom top",
            end: "bottom top",
            onEnter: () => applyTheme({ t: 1 }),
            onLeaveBack: () => applyTheme({ t: 0 }),
          },
        });

        return () => {
          st.scrollTrigger?.kill();
          st.kill();
        };
      });

      return () => {
        mm.revert();
        applyTheme({ t: 0 });
      };
    },
    []
  );

  return <div ref={root} className="pointer-events-none absolute" aria-hidden />;
}
