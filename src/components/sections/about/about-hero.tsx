"use client";

import { useRef } from "react";
import Image from "next/image";
import { aboutPage } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

/** About hero — brand-scale heading + full-bleed portrait, homepage typography. */
export function AboutHero() {
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
      className="relative overflow-hidden bg-surface pb-[clamp(2rem,5vw,4rem)] pt-[calc(var(--header-h)+clamp(2rem,5vw,3.5rem))]"
    >
      <Container>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-6">
            <div data-split-meta>
              <Eyebrow className="text-ink-muted">
                {aboutPage.hero.eyebrow}
              </Eyebrow>
            </div>
            <h1
              data-split-body
              className="mt-5 max-w-[12ch] text-[clamp(3rem,12vw,6rem)] font-black uppercase leading-[0.88] tracking-tight text-ink"
            >
              {aboutPage.hero.heading}
            </h1>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2 sm:aspect-[3/4] lg:aspect-[4/5] lg:min-h-[28rem]">
              <Image
                src={aboutPage.hero.image}
                alt={aboutPage.hero.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
