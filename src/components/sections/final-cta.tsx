"use client";

import { useRef } from "react";
import { finalCta, footer, site } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { TextCtaLink } from "@/components/shared/text-cta-link";
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
  /** Homepage: render the contact form instead of a link out to /contact. */
  showForm?: boolean;
}

/**
 * Final CTA — asymmetric typography composition. The section is clipped with
 * `data-footer-tuck` so its bottom forms the reference’s trapezoid pocket;
 * the black footer shoulders show through the cut corners.
 */
export function FinalCta({ content = finalCta, showForm = false }: FinalCtaProps) {
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
        <div
          className={
            showForm
              ? "grid grid-cols-1 items-start gap-12 pt-[clamp(2rem,5vw,3.5rem)] lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16"
              : "grid grid-cols-1 gap-12 pt-[clamp(2rem,5vw,3.5rem)] lg:grid-cols-12 lg:gap-8"
          }
        >
          <div
            className={
              showForm
                ? "lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:col-span-5"
                : "lg:col-span-7 xl:col-span-7"
            }
          >
            <h2
              data-split-body
              className={
                showForm
                  ? "text-[clamp(2.35rem,8.5vw,3.65rem)] font-black uppercase leading-[0.92] tracking-tight text-ink"
                  : "text-[11vw] font-black uppercase leading-[0.92] tracking-tight text-ink sm:text-[5.5vw] lg:text-[clamp(3.25rem,4.6vw,5.25rem)]"
              }
            >
              {content.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            {showForm ? (
              <p
                data-split-body
                className="mt-8 max-w-md text-base leading-relaxed text-ink-muted sm:mt-10 sm:text-lg"
              >
                {content.body}
              </p>
            ) : null}
            <p
              data-split-meta
              className="mt-8 max-w-md text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-orange-600 sm:mt-10 sm:text-xs sm:tracking-[0.16em]"
            >
              {footer.tagline}
            </p>
          </div>

          {showForm ? (
            <div className="lg:col-span-7">
              <ContactForm compact />
            </div>
          ) : (
            <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9 lg:pt-[min(28vw,12rem)] xl:col-start-9">
              <p
                data-split-body
                className="max-w-sm text-base leading-relaxed text-ink-muted sm:text-lg"
              >
                {content.body}
              </p>
              <TextCtaLink
                data-split-meta
                href={site.discoveryCallHref}
                arrow="↗"
                className="mt-10 text-sm font-semibold tracking-[0.12em] sm:text-sm"
              >
                {content.cta}
              </TextCtaLink>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
