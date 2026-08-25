"use client";

import { useRef } from "react";
import { aboutPage } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

/** Origin story — editorial copy block matching Outcomes / Story rhythm. */
export function AboutOrigin() {
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

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-surface pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(1.5rem,4vw,3rem)]"
    >
      <Container>
        <div className="border-t border-hairline pt-12 lg:pt-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-14">
            <div className="lg:col-span-5">
              <div data-split-meta>
                <Eyebrow className="text-ink-muted">
                  {aboutPage.origin.eyebrow}
                </Eyebrow>
              </div>
              <h2
                data-split-body
                className="mt-5 max-w-[16ch] text-[clamp(2.25rem,6vw,3.5rem)] font-black uppercase leading-[0.95] tracking-tight text-ink"
              >
                {aboutPage.origin.heading}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p
                data-split-meta
                className="text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl"
              >
                {aboutPage.origin.subheading}
              </p>
              <div className="mt-6 space-y-5">
                {aboutPage.origin.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    data-split-body
                    className="text-base leading-relaxed text-ink-muted sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <a
                data-split-meta
                href={aboutPage.origin.ctaHref}
                className="mt-8 inline-flex w-fit items-center bg-orange-600 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-lime-ink transition-colors hover:bg-white sm:mt-10"
              >
                {aboutPage.origin.cta}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
