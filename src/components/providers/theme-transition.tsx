"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";

/**
 * Scrubs `--theme-t` on `:root` from 0 (dark) → 1 (light) as the timeline
 * (image slider) leaves the viewport and Story takes over.
 *
 * On non-home routes (e.g. /about), locks the theme to light so editorial
 * sections match the second half of the homepage.
 */
export function ThemeTransition() {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGsap(
    root,
    () => {
      const html = document.documentElement;

      function applyTheme({ t }: { t: number }) {
        html.style.setProperty("--theme-t", t.toFixed(3));
      }

      if (pathname !== "/") {
        applyTheme({ t: 1 });
        return () => applyTheme({ t: 0 });
      }

      const timeline = document.querySelector<HTMLElement>("#timeline");
      const story = document.querySelector<HTMLElement>("#story");
      if (!timeline || !story) {
        applyTheme({ t: 0 });
        return;
      }

      const state = { t: 0 };
      applyTheme({ t: 0 });

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(state, {
          t: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timeline,
            start: "bottom 85%",
            endTrigger: story,
            end: "top 35%",
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
    [pathname]
  );

  return <div ref={root} className="pointer-events-none absolute" aria-hidden />;
}
