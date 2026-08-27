"use client";

import { useRef } from "react";
import Image from "next/image";
import { servicesPage } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

type Program = (typeof servicesPage.programs)[number];

interface ServicesProgramProps {
  program: Program;
}

/**
 * Single program block — Process-style split (copy + features | image),
 * alternating layout via `program.reverse`.
 */
export function ServicesProgram({ program }: ServicesProgramProps) {
  const root = useRef<HTMLElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const header = scope.querySelector<HTMLElement>("[data-program-header]");
      const features = gsap.utils.toArray<HTMLElement>(
        "[data-program-feature]",
        scope
      );

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cleanHeader = header
          ? setupSplitTextReveal({ scope: header, trigger: header })
          : () => undefined;

        features.forEach((feature, i) => {
          gsap.set(feature, { autoAlpha: 0, y: 18 });
          gsap.to(feature, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: "expo.out",
            scrollTrigger: {
              trigger: feature,
              start: "top 90%",
              once: true,
            },
          });
        });

        return () => cleanHeader();
      });

      return () => mm.revert();
    },
    []
  );

  const copy = (
    <div
      data-program-header
      className={`min-w-0 ${program.reverse ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-5"}`}
    >
      <div data-split-meta className="flex items-center gap-3">
        <span className="font-mono text-sm text-orange-600">{program.index}</span>
        <Eyebrow className="text-ink-muted">{program.eyebrow}</Eyebrow>
      </div>
      <h2
        data-split-body
        className="mt-5 max-w-[16ch] text-[clamp(2rem,5vw,3.25rem)] font-black uppercase leading-[0.95] tracking-tight text-ink"
      >
        {program.heading}
      </h2>
      <p
        data-split-body
        className="mt-6 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg"
      >
        {program.body}
      </p>

      <div className="mt-10 space-y-0 border-t border-hairline">
        {program.features.map((feature, i) => (
          <div
            key={feature.title}
            data-program-feature
            className="border-b border-hairline py-6"
          >
            <p className="font-mono text-sm text-orange-600">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-ink sm:text-xl">
              {feature.title}
            </p>
            <p className="mt-2 max-w-md text-base leading-relaxed text-ink-muted">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <a
        data-split-meta
        href={program.ctaHref}
        className="btn-cta mt-8 w-fit px-5 py-2.5 text-xs sm:mt-10"
      >
        {program.cta}
      </a>
    </div>
  );

  const media = (
    <div
      className={`min-w-0 ${program.reverse ? "lg:col-span-6 lg:col-start-1 lg:row-start-1" : "lg:col-span-6 lg:col-start-7"}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2 sm:aspect-[3/4] lg:min-h-[32rem]">
        <Image
          src={program.image}
          alt={program.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover object-center"
        />
      </div>
    </div>
  );

  return (
    <section
      ref={root}
      id={program.id}
      className="relative overflow-hidden bg-surface pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(1.5rem,4vw,3rem)]"
    >
      <Container>
        <div className="border-t border-hairline pt-12 lg:pt-16">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-x-14">
            {program.reverse ? (
              <>
                {media}
                {copy}
              </>
            ) : (
              <>
                {copy}
                {media}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
