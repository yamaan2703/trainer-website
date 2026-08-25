"use client";

import { useRef } from "react";
import { servicesPage } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

/** Services hero — large display type + intro, homepage editorial scale. */
export function ServicesHero() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        return setupSplitTextReveal({ scope, trigger: scope, start: "top 85%" });
      });
      return () => mm.revert();
    },
    []
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-surface pb-[clamp(2.5rem,6vw,5rem)] pt-[calc(var(--header-h)+clamp(2rem,5vw,3.5rem))]"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <div className="lg:col-span-7">
            <div data-split-meta>
              <Eyebrow className="text-ink-muted">
                {servicesPage.hero.eyebrow}
              </Eyebrow>
            </div>
            <h1
              data-split-body
              className="mt-5 max-w-[14ch] text-[clamp(2.75rem,10vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight text-ink"
            >
              {servicesPage.hero.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p
              data-split-body
              className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {servicesPage.hero.body}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
