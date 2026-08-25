"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { hero, site } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";

/**
 * Hero composition modelled on the FitnessCh reference:
 * giant two-line headline with the figure rising through it (figure ABOVE
 * the text), social rail on the left edge, supporting copy mid-right,
 * and a stat block + lime pill CTA anchored to the bottom corners.
 */

const AVATARS = [
  { src: "/images/portrait-confident.jpg", alt: "Cameron Clark" },
  { src: "/images/testimonial-will.jpg", alt: "Will James Johnson, client" },
  { src: "/images/service-in-person.png", alt: "In-person coaching session" },
];

interface SocialIconProps {
  className?: string;
}

function FacebookIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.09 15.9 2 14.5 2 11.6 2 9.5 3.79 9.5 7.15V9.5H7v4h2.5V22h4.5z" />
    </svg>
  );
}

function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.94 8.5H3.75V21h3.19V8.5zM5.34 3A1.84 1.84 0 1 0 5.35 6.68 1.84 1.84 0 0 0 5.34 3zM20.25 21h-3.18v-6.59c0-1.84-.74-2.87-2.16-2.87-1.59 0-2.42 1.07-2.42 2.87V21H9.31V8.5h3.05v1.5c.52-.9 1.68-1.74 3.55-1.74 2.77 0 4.34 1.79 4.34 5.2V21z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<
  (typeof site.social)[number]["network"],
  (props: SocialIconProps) => ReactNode
> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
};

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    const tl = gsap.timeline({ delay: 0.9, defaults: { ease: "expo.out" } });

    tl.fromTo(
      "[data-hero-line] > span",
      { yPercent: 110 },
      { yPercent: 0, duration: 1, stagger: 0.12 }
    )
      .fromTo(
        "[data-hero-figure]",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1 },
        "-=0.7"
      )
      .fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        "-=0.6"
      );
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative h-dvh min-h-[640px] overflow-hidden bg-black"
    >
      {/* Left social rail — desktop only. */}
      <div
        data-hero-fade
        className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex xl:left-10"
      >
        {site.social.map((item) => {
          const Icon = SOCIAL_ICONS[item.network];
          return (
            <a
              key={item.network}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="text-slate-100 transition-colors hover:text-orange-600"
            >
              <Icon className="h-4.5 w-4.5" />
            </a>
          );
        })}
        <span aria-hidden className="mt-1 block h-14 w-px bg-ink/50" />
      </div>

      <Container className="relative flex h-full flex-col pt-(--header-h)">
        {/* Headline — sits BEHIND the figure. */}
        <h1 className="relative z-0 mx-auto max-w-[18ch] pt-4 text-center text-[clamp(2.75rem,11.2vw,7.5rem)] font-medium leading-[1.02] tracking-[-0.035em] sm:pt-6 lg:max-w-none">
          <span data-hero-line className="block overflow-hidden">
            <span className="block bg-linear-to-b from-white to-white/45 bg-clip-text text-transparent">
              {hero.headlineLine1}
            </span>
          </span>
          <span data-hero-line className="block overflow-hidden">
            <span className="block bg-linear-to-b from-white to-white/45 bg-clip-text text-transparent">
              {hero.headlineLine2}
            </span>
          </span>
        </h1>

        {/* Figure — centered, slightly larger; width-driven so proportions stay intact. */}
        <div
          data-hero-figure
          className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[min(105vw,680px)] -translate-x-1/2 sm:w-[min(92vw,760px)] lg:w-[min(72vw,80vh,1020px)]"
        >
          <Image
            src="/images/hero-figure.webp"
            alt="Cameron Clark, personal fitness coach"
            width={700}
            height={700}
            priority
            unoptimized
            className="h-auto w-full"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black to-transparent" />
        </div>

        {/* Mobile supporting copy — in flow under the headline. */}
        <p
          data-hero-fade
          className="relative z-20 mx-auto mt-6 max-w-xs text-center text-sm leading-relaxed text-ink-muted lg:hidden"
        >
          {hero.sub}
        </p>

        {/* Bottom row — avatars + stat left; copy stacked above CTA right. */}
        <div
          data-hero-fade
          className="relative z-20 mt-auto flex flex-col items-center gap-7 pb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-10 lg:pb-12"
        >
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <div className="flex -space-x-2.5">
              {AVATARS.map((a) => (
                <span
                  key={a.src}
                  className="relative inline-block h-9 w-9 overflow-hidden rounded-full bg-surface-2 ring-1 ring-orange-600/45"
                >
                  <Image
                    src={a.src}
                    alt={a.alt}
                    fill
                    sizes="36px"
                    className="object-cover object-top"
                  />
                </span>
              ))}
            </div>
            <p className="flex items-baseline gap-2.5">
              <span className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {hero.stat}
              </span>
              <span className="text-sm text-ink-muted">{hero.statLabel}</span>
            </p>
          </div>

          <div className="flex max-w-[260px] flex-col items-center gap-5 sm:items-end xl:max-w-[280px]">
            <p className="hidden text-left text-[0.95rem] leading-relaxed text-ink-muted lg:block">
              {hero.sub}
            </p>
            <a
              href={site.discoveryCallHref}
              className="inline-flex items-center bg-orange-600 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-lime-ink transition-colors hover:bg-white sm:px-7 sm:py-3 sm:text-sm"
            >
              {hero.cta}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
