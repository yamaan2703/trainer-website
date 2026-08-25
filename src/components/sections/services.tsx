"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { services, servicesIntro } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, ScrollTrigger, SplitText } from "@/lib/animations/gsap";

/**
 * Each card sticks 18px lower than the one before it, so the collapsing stack
 * keeps a visible stepped edge. Single source of truth: both the sticky `top`
 * and the ScrollTrigger `end` are derived from it.
 */
const STACK_STEP = 18;

/**
 * Link with a rolling label swap on hover — a second copy sits directly below
 * the first inside a masked box and both slide up together. Local to this
 * section; the page-level CTA remains `CtaLink`.
 */
function ServiceLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group/link inline-flex w-fit items-center gap-2.5 text-xs uppercase tracking-[0.14em] text-ink sm:text-[0.8125rem] ${className}`}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/link:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-0 block translate-y-full text-orange-600 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/link:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span
        aria-hidden
        className="transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/link:translate-x-1.5"
      >
        &rarr;
      </span>
    </a>
  );
}

function ServiceCard({
  service,
  position,
}: {
  service: (typeof services)[number];
  position: number;
}) {
  return (
    <article
      data-service-card
      style={{ top: `calc(var(--header-h) + 1.5rem + ${position * STACK_STEP}px)` }}
      className="group/card relative grid h-fit w-full shrink-0 origin-top grid-cols-12 gap-x-5 gap-y-8 overflow-hidden bg-[#090909] p-4 transition-colors duration-500 sm:p-5 lg:sticky lg:h-[calc(100svh-var(--header-h)-7rem)] lg:max-h-[520px] lg:min-h-[420px] lg:gap-x-10 xl:gap-x-12"
    >
      {/* Dimming veil — scrubbed to opacity 1 as the next card slides over. */}
      <div
        data-card-veil
        className="pointer-events-none absolute inset-0 z-30 hidden bg-black/65 opacity-0 lg:block"
      />

      {/* Framed image: numbered top-left, labelled bottom-left.
          Frame owns the clip-path reveal; the inner wrap owns the scale settle. */}
      <div
        data-card-image-frame
        className="relative col-span-12 h-[260px] overflow-hidden bg-black sm:h-[380px] lg:col-span-4 lg:h-auto lg:min-h-[320px]"
      >
        <div
          data-card-image
          className="absolute inset-0 origin-center will-change-transform"
        >
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 32vw, 100vw"
            className="object-cover object-top grayscale transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04] group-hover/card:grayscale-0"
          />
        </div>
        {/* Bottom-weighted scrim only — the label needs contrast, the photo
            needs to stay bright. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        <span
          data-card-meta
          className="absolute left-0 top-0 z-20 p-4 font-mono text-3xl font-semibold leading-none text-light sm:p-5"
        >
          {service.index}.
        </span>
        <h3
          data-card-meta
          className="absolute bottom-0 left-0 z-20 max-w-[92%] p-4 text-[9vw] font-normal uppercase leading-[0.88] tracking-tight sm:p-5 sm:text-[4.4vw] lg:text-[2.5vw]"
        >
          {service.label}
        </h3>
      </div>

      {/* Headline + supporting copy. */}
      <div className="col-span-12 flex flex-col justify-between lg:col-span-4 xl:col-span-5">
        <div>
          <p
            data-card-split
            className="max-w-xl text-xl font-normal leading-[1.15] tracking-tight text-ink sm:text-[1.75rem] xl:text-[1.9rem]"
          >
            {service.headline}
          </p>
          <p data-card-split className="mt-8 max-w-xl text-lg font-normal leading-relaxed text-ink-muted">
            {service.description}
          </p>
        </div>

        <div data-card-foot className="mt-10">
          <ServiceLink href="#contact">{service.cta}</ServiceLink>
        </div>
      </div>

      {/* Deliverables column. */}
      <div className="col-span-12 flex flex-col justify-between lg:col-span-4 xl:col-span-3">
        <div>
          <p
            data-card-item
            className="pb-3.5 text-xl font-normal leading-[1.15] tracking-tight text-ink"
          >
            Services :
          </p>
          <ul className="space-y-0.5">
            {service.deliverables.map((item) => (
              <li
                key={item}
                data-card-item
                className="text-lg font-normal leading-relaxed text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div data-card-foot className="mt-10 flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
            <span className="text-orange-600">{service.stat}</span> &mdash; {service.statLabel}
          </p>
          <ServiceLink href="#contact">Contact us</ServiceLink>
        </div>
      </div>
    </article>
  );
}

export function Services() {
  const stackRef = useRef<HTMLDivElement>(null);

  useGsap(
    stackRef,
    () => {
      const root = stackRef.current!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduced } = context.conditions as Record<string, boolean>;
          if (reduced) return;

          cards.forEach((card, i) => {
            const enter = { trigger: card, start: "top 78%" } as const;

            // --- Entrance: image opens via clip-path + scale settle --------
            const imageFrame = card.querySelector<HTMLElement>("[data-card-image-frame]");
            const imageWrap = card.querySelector<HTMLElement>("[data-card-image]");

            if (imageFrame && imageWrap) {
              gsap
                .timeline({ scrollTrigger: enter })
                .fromTo(
                  imageFrame,
                  { clipPath: "inset(16% 10% 22% 10%)" },
                  {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.5,
                    ease: "expo.out",
                  },
                  0
                )
                .fromTo(
                  imageWrap,
                  { scale: 1.28, opacity: 0.45 },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 1.7,
                    ease: "expo.out",
                  },
                  0
                );
            }

            gsap.from(card.querySelectorAll("[data-card-meta]"), {
              yPercent: 60,
              opacity: 0,
              duration: 1.1,
              stagger: 0.1,
              delay: 0.18,
              ease: "expo.out",
              scrollTrigger: enter,
            });

            // `autoSplit` re-splits on resize / font load, and the tween
            // returned from `onSplit` is rebuilt (and cleaned up) with it.
            card.querySelectorAll<HTMLElement>("[data-card-split]").forEach((el) => {
              SplitText.create(el, {
                type: "lines",
                mask: "lines",
                autoSplit: true,
                onSplit: (self) =>
                  gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 1,
                    stagger: 0.09,
                    ease: "expo.out",
                    scrollTrigger: enter,
                  }),
              });
            });

            gsap.from(card.querySelectorAll("[data-card-item]"), {
              opacity: 0,
              y: 14,
              duration: 0.7,
              stagger: 0.04,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 72%" },
            });

            gsap.from(card.querySelectorAll("[data-card-foot]"), {
              opacity: 0,
              y: 12,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 68%" },
            });

            // --- Stack collapse: scrub scale + veil while being covered ----
            const next = cards[i + 1];
            if (!isDesktop || !next) return;

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: next,
                  start: "top bottom",
                  // Progress hits 1 exactly when the covering card lands on
                  // its own sticky offset — i.e. the moment this one is
                  // fully hidden behind it.
                  end: () => `top ${parseFloat(getComputedStyle(next).top) || 0}`,
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              })
              .to(card, { scale: 0.9, ease: "none" }, 0)
              .to(card.querySelector("[data-card-veil]"), { opacity: 1, ease: "none" }, 0);
          });

          return () => {
            ScrollTrigger.refresh();
          };
        }
      );

      return () => mm.revert();
    },
    []
  );

  return (
    <section id="services" className="section-pad bg-surface">
      <Container>
        <div className="flex flex-col gap-8 border-b border-hairline pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow className="mb-6 text-ink-muted">Services</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="max-w-2xl text-[10vw] uppercase leading-[0.95] tracking-tight sm:text-[4vw] font-semibold text-orange-600">
                {servicesIntro.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-ink-muted">{servicesIntro.body}</p>
          </Reveal>
        </div>
      </Container>

      {/* Sticky stack. Cards collapse into each other on desktop; on mobile
          they fall back to a plain vertical rhythm (no `lg:sticky`). */}
      <Container>
        <div ref={stackRef} className="flex flex-col gap-5 pt-10">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} position={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
