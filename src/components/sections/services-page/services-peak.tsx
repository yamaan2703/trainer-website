"use client";

import { useRef } from "react";
import Image from "next/image";
import { servicesPage } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { AppLink } from "@/components/shared/app-link";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

/**
 * Peak-performance CTA — copy left, car portrait right.
 * Cream ground so car-image.png can dissolve into the section via a left fade.
 */
export function ServicesPeak() {
  const root = useRef<HTMLElement>(null);
  const { peak } = servicesPage;

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cleanCopy = setupSplitTextReveal({
          scope,
          trigger: scope,
          start: "top 78%",
        });

        gsap.from("[data-peak-image]", {
          opacity: 0,
          x: 36,
          duration: 1.15,
          ease: "expo.out",
          scrollTrigger: { trigger: scope, start: "top 78%", once: true },
        });

        return () => cleanCopy();
      });
      return () => mm.revert();
    },
    []
  );

  return (
    <section
      ref={root}
      id="peak-performance"
      data-footer-tuck
      className="relative z-10 overflow-hidden bg-surface"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <div data-peak-image className="relative h-full w-full">
          <Image
            src={peak.image}
            alt={peak.imageAlt}
            fill
            sizes="58vw"
            className="object-cover object-[62%_center]"
          />
          <div className="absolute inset-y-0 left-0 w-[48%] bg-linear-to-r from-surface from-15% to-transparent" />
        </div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 py-[clamp(3.5rem,9vw,7rem)] lg:grid-cols-12 lg:min-h-[38rem] lg:gap-x-12">
          <div className="lg:col-span-5">
            <h2
              data-split-body
              className="text-[clamp(2rem,5vw,3.25rem)] font-black uppercase leading-[0.95] tracking-tight text-ink"
            >
              <span className="block">{peak.headingBefore}</span>
              <span className="mt-1 inline-block whitespace-nowrap bg-ink px-2 py-0.5 text-surface">
                {peak.headingAccent}
              </span>
              <span className="block">{peak.headingAfter}</span>
            </h2>
            <p
              data-split-body
              className="mt-6 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {peak.body}
            </p>

            <AppLink
              data-split-meta
              href={peak.ctaHref}
              className="btn-cta mt-10 w-fit px-5 py-2.5 text-xs sm:px-7 sm:py-3 sm:text-sm"
            >
              {peak.cta}
            </AppLink>
          </div>

          <div
            className="relative aspect-[4/3] w-full overflow-hidden lg:hidden"
            aria-hidden
          >
            <Image
              src={peak.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[62%_center]"
            />
            <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-surface to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
