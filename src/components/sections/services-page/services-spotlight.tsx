"use client";

import { useRef } from "react";
import Image from "next/image";
import { servicesPage } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { AppLink } from "@/components/shared/app-link";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

function PrecisionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <path d="M12 3 4.5 6.5v5.2c0 4.4 3.1 8.4 7.5 9.3 4.4-.9 7.5-4.9 7.5-9.3V6.5Z" strokeLinejoin="round" />
      <path d="M9 13.2c.7 1.2 1.8 2 3 2s2.3-.8 3-2" strokeLinecap="round" />
      <circle cx="9.2" cy="10.2" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="10.2" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <rect x="6" y="3.5" width="12" height="17" rx="1.5" />
      <path d="M9 8h6M9 12h6M9 16h3.5" strokeLinecap="round" />
    </svg>
  );
}

const FEATURE_ICONS = [PrecisionIcon, PlanIcon];

/**
 * In-person spotlight — copy left, composite photo right.
 * Black ground so service-pg.png’s feathered edge dissolves into the section.
 */
export function ServicesSpotlight() {
  const root = useRef<HTMLElement>(null);
  const { spotlight } = servicesPage;

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

        gsap.from("[data-spot-feature]", {
          opacity: 0,
          y: 18,
          duration: 0.7,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: scope, start: "top 72%", once: true },
        });

        gsap.from("[data-spot-image]", {
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
      id="in-person-training"
      className="relative overflow-hidden bg-black"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <div data-spot-image className="relative h-full w-full">
          <Image
            src={spotlight.image}
            alt={spotlight.imageAlt}
            fill
            sizes="58vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-[42%] bg-linear-to-r from-black to-transparent" />
        </div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 py-[clamp(3.5rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <h2
              data-split-body
              className="max-w-[14ch] text-[clamp(2rem,5vw,3.25rem)] font-black uppercase leading-[0.95] tracking-tight text-white"
            >
              {spotlight.headingBefore}{" "}
              <span className="inline-block bg-orange-600 px-2 py-0.5 text-lime-ink">
                {spotlight.headingAccent}
              </span>{" "}
              {spotlight.headingAfter}
            </h2>
            <p
              data-split-body
              className="mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg"
            >
              {spotlight.body}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
              {spotlight.features.map((feature, i) => {
                const Icon = FEATURE_ICONS[i] ?? PrecisionIcon;
                return (
                  <div key={feature.title} data-spot-feature>
                    <Icon className="h-7 w-7 text-orange-600" />
                    <p className="mt-3 text-base font-semibold tracking-tight text-white">
                      {feature.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <AppLink
              data-split-meta
              href={spotlight.ctaHref}
              className="btn-cta mt-10 w-fit px-5 py-2.5 text-xs sm:px-7 sm:py-3 sm:text-sm"
            >
              {spotlight.cta}
            </AppLink>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden lg:hidden" aria-hidden>
            <Image
              src={spotlight.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
