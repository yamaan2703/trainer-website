"use client";

import { finalCta, footer, site } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

/**
 * Final CTA — asymmetric typography composition. The section is clipped with
 * `data-footer-tuck` so its bottom forms the reference’s trapezoid pocket;
 * the black footer shoulders show through the cut corners.
 */
export function FinalCta() {
  return (
    <section
      id="contact"
      data-footer-tuck
      className="relative z-10 bg-surface"
    >
      <Container className="section-pad !pb-[clamp(5rem,12vw,8rem)]">
        <div className="grid grid-cols-1 gap-12 pt-[clamp(2rem,5vw,3.5rem)] lg:grid-cols-12 lg:gap-8">
          {/* Left — display headline + supporting caps line. */}
          <div className="lg:col-span-7 xl:col-span-7">
            <Reveal>
              <h2 className="text-[11vw] font-black uppercase leading-[0.92] tracking-tight text-ink sm:text-[5.5vw] lg:text-[clamp(3.25rem,4.6vw,5.25rem)]">
                {finalCta.headingLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-md text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-orange-600 sm:mt-10 sm:text-xs sm:tracking-[0.16em]">
                {footer.tagline}
              </p>
            </Reveal>
          </div>

          {/* Right — body + text CTA, vertically staggered like the reference. */}
          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9 lg:pt-[min(28vw,12rem)] xl:col-start-9">
            <Reveal delay={0.12}>
              <p className="max-w-sm text-base leading-relaxed text-ink-muted sm:text-lg">
                {finalCta.body}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <a
                href={site.discoveryCallHref}
                className="group mt-10 inline-flex w-fit items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:text-orange-600"
              >
                {finalCta.cta}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
