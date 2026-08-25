/**
 * Central GSAP setup. Import `gsap`, `ScrollTrigger` and `SplitText` from here
 * instead of "gsap" / "gsap/ScrollTrigger" directly so the plugins are only
 * ever registered once, and only in the browser.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Lenis drives the scroll position itself, so GSAP's own lag smoothing
  // would fight it and cause jitter. Disabled once, globally, here.
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger, SplitText };
