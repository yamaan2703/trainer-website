"use client";

import { useRef } from "react";
import { aboutPage } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

/** Mission + vision — two editorial columns. */
export function AboutRoadmap() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        return setupSplitTextReveal({ scope, trigger: scope, start: "top 78%" });
      });
      return () => mm.revert();
    },
    []
  );

  const pillars = [aboutPage.roadmap.mission, aboutPage.roadmap.vision];

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-surface pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(1.5rem,4vw,3rem)]"
    >
      <Container>
        <div className="border-t border-hairline pt-12 lg:pt-16">
          <div data-split-meta>
            <Eyebrow className="text-ink-muted">
              {aboutPage.roadmap.eyebrow}
            </Eyebrow>
          </div>
          <h2
            data-split-body
            className="mt-5 max-w-[16ch] text-[clamp(2.25rem,6vw,3.5rem)] font-black uppercase leading-[0.95] tracking-tight text-ink"
          >
            {aboutPage.roadmap.heading}
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-10 border-t border-hairline pt-10 sm:mt-14 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            {pillars.map((pillar, i) => (
              <div key={pillar.title} data-split-body>
                <p className="font-mono text-sm text-orange-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
