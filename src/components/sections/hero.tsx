"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { hero, press, site } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { CtaLink } from "@/components/shared/cta-link";
import { FilmGrainLoader } from "@/components/three/film-grain-loader";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";

const HEADLINE_LINES = [
  "Stop Wondering",
  "What Will Hurt",
  "When You Wake Up",
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsap(root, () => {
    const tl = gsap.timeline({ delay: 0.9, defaults: { ease: "expo.out" } });

    tl.fromTo(
      "[data-hero-line] > span",
      { yPercent: 110 },
      { yPercent: 0, duration: 1, stagger: 0.1 }
    )
      .fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        "-=0.5"
      )
      .fromTo(
        "[data-hero-image]",
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.1 },
        "-=0.9"
      );
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-surface pt-24 sm:pt-28"
    >
      {!prefersReducedMotion && <FilmGrainLoader />}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 20%, oklch(0.28 0.03 254 / 60%), transparent)",
        }}
      />

      <Container className="relative flex flex-1 flex-col">
        <div
          data-hero-fade
          className="flex items-center justify-between border-b border-hairline pb-4"
        >
          <Eyebrow className="text-ink-muted">{hero.eyebrow}</Eyebrow>
          <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-ink-muted sm:block">
            Dallas &amp; Bay Area
          </p>
        </div>

        <div className="relative flex flex-1 items-center py-10 sm:py-14">
          <h1 className="max-w-[22ch] text-[13.5vw] font-black uppercase leading-[0.92] tracking-tight text-ink sm:text-[9vw] lg:text-[7vw]">
            {HEADLINE_LINES.map((line) => (
              <span key={line} data-hero-line className="block overflow-hidden">
                <span className="block">{line}</span>
              </span>
            ))}
          </h1>

          <div
            data-hero-image
            className="pointer-events-none absolute right-0 bottom-0 hidden w-[26vw] max-w-[360px] md:block lg:right-[4vw]"
          >
            <Image
              src="/images/hero-physique.png"
              alt="Cameron Clark, personal fitness coach"
              width={900}
              height={900}
              priority
              sizes="(min-width: 1024px) 26vw, 30vw"
              className="h-auto w-full grayscale [filter:contrast(1.1)]"
            />
          </div>
        </div>

        <div
          data-hero-fade
          className="flex flex-col gap-8 border-t border-hairline pt-8 pb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-balance text-base text-ink-muted sm:text-lg">
            {hero.sub}
          </p>

          <CtaLink href={site.discoveryCallHref}>{hero.cta}</CtaLink>
        </div>
      </Container>

      <div data-hero-fade className="relative border-t border-hairline py-6">
        <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60 sm:justify-between">
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
            As featured in
          </span>
          {press.map((p) => (
            <Image
              key={p.file}
              src={`/press/${p.file}.svg`}
              alt={p.name}
              width={100}
              height={24}
              className="h-4 w-auto brightness-0 invert sm:h-5"
            />
          ))}
        </Container>
      </div>
    </section>
  );
}
