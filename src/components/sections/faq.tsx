"use client";

import { useRef } from "react";
import { faq, site } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

/**
 * FAQ — reference UX (left copy + CTA, right card accordion)
 * styled entirely with site tokens: surface, ink, orange-600, navbar CTA.
 */
export function Faq() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const header = scope.querySelector<HTMLElement>("[data-faq-header]");
      const items = gsap.utils.toArray<HTMLElement>("[data-faq-item]", scope);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cleanHeader = header
          ? setupSplitTextReveal({ scope: header, trigger: header })
          : () => undefined;

        if (items.length > 0) {
          items.forEach((item, i) => {
            gsap.set(item, { autoAlpha: 0, y: 18 });
            gsap.to(item, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.07,
              ease: "expo.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                once: true,
              },
            });
          });
        }

        return () => cleanHeader();
      });

      return () => mm.revert();
    },
    []
  );

  return (
    <section
      ref={root}
      id="faq"
      className="relative overflow-hidden bg-surface pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(1.5rem,4vw,3rem)]"
    >
      <Container>
        <div className="pt-12 lg:pt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-14 xl:gap-x-20">
            {/* Left — heading, support copy, CTA */}
            <div
              data-faq-header
              className="flex flex-col lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start"
            >
              <div data-split-meta>
                <Eyebrow className="text-ink-muted">FAQ</Eyebrow>
              </div>
              <h2
                data-split-body
                className="mt-5 max-w-[14ch] text-[clamp(2.5rem,8vw,3.75rem)] font-black uppercase leading-[0.95] tracking-tight text-ink"
              >
                Questions clients ask before they start
              </h2>
              <p
                data-split-body
                className="mt-6 max-w-sm text-base leading-relaxed text-ink-muted sm:text-lg"
              >
                Straight answers on coaching, travel, results, and what comes
                after the first eight weeks.
              </p>
              <a
                data-split-meta
                href={site.discoveryCallHref}
                className="btn-cta mt-8 w-fit px-5 py-2.5 text-xs sm:mt-10"
              >
                Discovery Call
              </a>
            </div>

            {/* Right — card accordion */}
            <Accordion
              defaultValue={["item-0"]}
              className="flex flex-col gap-4 sm:gap-5 lg:col-span-7"
            >
              {faq.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  value={`item-${i}`}
                  data-faq-item
                  className="group/faq-card border-0 bg-transparent not-last:border-b-0 transition-colors duration-300"
                >
                  <AccordionTrigger
                    className={[
                      "group/accordion-trigger flex w-full items-center gap-5 rounded-none border-0 px-5 py-5 text-left hover:no-underline sm:gap-6 sm:px-7 sm:py-6",
                      "focus-visible:ring-0 focus-visible:outline-none",
                      "**:data-[slot=accordion-trigger-icon]:hidden",
                    ].join(" ")}
                  >
                    <span className="min-w-0 flex-1 pr-2 text-[clamp(1.05rem,2vw,1.3rem)] font-semibold leading-snug tracking-tight text-ink">
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className="relative flex size-5 shrink-0 items-center justify-center"
                    >
                      <span className="absolute h-px w-3.5 bg-ink transition-colors duration-300 group-aria-expanded/accordion-trigger:bg-orange-600" />
                      <span className="absolute h-3.5 w-px bg-ink transition-transform duration-300 group-aria-expanded/accordion-trigger:scale-y-0 group-aria-expanded/accordion-trigger:bg-orange-600" />
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="px-5 pb-6 text-[0.95rem] leading-relaxed text-ink-muted sm:px-7 sm:pb-7 sm:text-base sm:leading-relaxed">
                    <p className="max-w-xl pt-1">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
}
