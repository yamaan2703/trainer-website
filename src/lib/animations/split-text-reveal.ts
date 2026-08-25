import { gsap, SplitText } from "@/lib/animations/gsap";

interface SetupSplitTextRevealOptions {
  /** Root element that contains `[data-split-body]` / `[data-split-meta]`. */
  scope: Element;
  /** ScrollTrigger target — defaults to `scope`. */
  trigger?: Element;
  start?: string;
}

/**
 * Story-style copy entrance:
 * - `[data-split-body]` → SplitText line masks sliding up
 * - `[data-split-meta]` → soft fade + rise (eyebrow / CTA / labels)
 *
 * Returns a cleanup that reverts SplitText instances.
 */
export function setupSplitTextReveal({
  scope,
  trigger,
  start = "top 72%",
}: SetupSplitTextRevealOptions): () => void {
  const bodies = gsap.utils.toArray<HTMLElement>("[data-split-body]", scope);
  const metas = gsap.utils.toArray<HTMLElement>("[data-split-meta]", scope);

  if (bodies.length === 0 && metas.length === 0) {
    return () => undefined;
  }

  const splits: ReturnType<typeof SplitText.create>[] = [];
  const lines: Element[] = [];

  bodies.forEach((body) => {
    const split = SplitText.create(body, {
      type: "lines",
      mask: "lines",
    });
    splits.push(split);
    lines.push(...split.lines);
  });

  gsap.set(lines, { yPercent: 110 });
  gsap.set(metas, { autoAlpha: 0, y: 18 });

  const tl = gsap.timeline({
    defaults: { ease: "expo.out" },
    scrollTrigger: {
      trigger: trigger ?? scope,
      start,
      once: true,
    },
  });

  if (metas.length > 0) {
    tl.to(metas, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.2);
  }

  if (lines.length > 0) {
    tl.to(lines, { yPercent: 0, duration: 0.95, stagger: 0.06 }, 0.28);
  }

  return () => {
    splits.forEach((split) => split.revert());
  };
}
