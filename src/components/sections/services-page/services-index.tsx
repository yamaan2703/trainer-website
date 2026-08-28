"use client";

import { useRef } from "react";
import Image from "next/image";
import { servicesPage } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { TextCtaLink } from "@/components/shared/text-cta-link";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

type Program = (typeof servicesPage.programs)[number];

/**
 * Editorial index — numbered rows with a compact portrait.
 * Not cards: hairline list, type-led, small always-visible photos.
 */
export function ServicesIndex() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const rows = gsap.utils.toArray<HTMLElement>("[data-service-row]", scope);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        rows.forEach((row) => {
          const frame = row.querySelector<HTMLElement>("[data-row-image]");
          const meta = row.querySelectorAll("[data-row-meta]");

          if (frame) {
            gsap.fromTo(
              frame,
              { clipPath: "inset(12% 10% 18% 10%)", opacity: 0.4 },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
                duration: 1.15,
                ease: "expo.out",
                scrollTrigger: { trigger: row, start: "top 88%", once: true },
              }
            );
          }

          gsap.from(meta, {
            y: 16,
            opacity: 0,
            duration: 0.75,
            stagger: 0.06,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          });
        });
      });

      return () => mm.revert();
    },
    []
  );

  return (
    <section ref={root} className="relative bg-surface pb-[clamp(4rem,10vw,7rem)]">
      <Container>
        <ol className="border-t border-hairline">
          {servicesPage.programs.map((program) => (
            <ServiceRow key={program.id} program={program} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

function ServiceRow({ program }: { program: Program }) {
  const flip = program.reverse;

  const photo = (
    <div
      data-row-image
      className="relative aspect-[5/4] w-[42%] min-w-[8.5rem] max-w-[30rem] shrink-0 overflow-hidden bg-surface-2"
    >
      <Image
        src={program.image}
        alt={program.imageAlt}
        fill
        sizes="(min-width: 1024px) 30rem, 42vw"
        className="object-cover object-top grayscale transition-[transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
      />
    </div>
  );

  const copy = (
    <div className="min-w-0 flex-1">
      <p
        data-row-meta
        className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink-muted"
      >
        {program.eyebrow}
      </p>
      <h2
        data-row-meta
        className="mt-2 max-w-[18ch] text-[clamp(1.35rem,2.4vw,1.85rem)] font-semibold uppercase leading-[1.05] tracking-tight text-ink"
      >
        {program.heading}
      </h2>
      <p
        data-row-meta
        className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base"
      >
        {program.body}
      </p>
      <p
        data-row-meta
        className="mt-4 max-w-xl text-xs uppercase tracking-[0.12em] text-ink/55"
      >
        {program.features.map((feature) => feature.title).join("  ·  ")}
      </p>
      <div data-row-meta className="mt-5">
        <TextCtaLink href={program.ctaHref}>{program.cta}</TextCtaLink>
      </div>
    </div>
  );

  return (
    <li
      id={program.id}
      data-service-row
      className="group border-b border-hairline py-6 sm:py-9 lg:py-10"
    >
      <div
        className={cn(
          "flex flex-row items-start gap-4 sm:gap-8 lg:items-center lg:gap-14",
          flip && "lg:flex-row-reverse"
        )}
      >
        {photo}
        {copy}
      </div>
    </li>
  );
}
