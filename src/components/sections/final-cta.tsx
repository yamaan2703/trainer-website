"use client";

import { useRef } from "react";
import { finalCta, footer, site } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

interface FinalCtaContent {
  headingLines: string[];
  body: string;
  cta: string;
}

interface FinalCtaProps {
  content?: FinalCtaContent;
}

/**
 * Final CTA — asymmetric typography composition. The section is clipped with
 * `data-footer-tuck` so its bottom forms the reference’s trapezoid pocket;
 * the black footer shoulders show through the cut corners.
 */
export function FinalCta({ content = finalCta }: FinalCtaProps) {
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
      id="contact"
      data-footer-tuck
      className="relative z-10 bg-surface"
    >
      <Container className="section-pad !pb-[clamp(5rem,12vw,8rem)]">
        <div className="grid grid-cols-1 gap-12 pt-[clamp(2rem,5vw,3.5rem)] lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 xl:col-span-7">
            <h2
              data-split-body
              className="text-[11vw] font-black uppercase leading-[0.92] tracking-tight text-ink sm:text-[5.5vw] lg:text-[clamp(3.25rem,4.6vw,5.25rem)]"
            >
              {content.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p
              data-split-meta
              className="mt-8 max-w-md text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-orange-600 sm:mt-10 sm:text-xs sm:tracking-[0.16em]"
            >
              {footer.tagline}
            </p>
          </div>

          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9 lg:pt-[min(28vw,12rem)] xl:col-start-9">
            <p
              data-split-body
              className="max-w-sm text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {content.body}
            </p>
            <a
              data-split-meta
              href={site.discoveryCallHref}
              className="group mt-10 inline-flex w-fit items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:text-orange-600"
            >
              {content.cta}
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
