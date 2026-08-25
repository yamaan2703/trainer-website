"use client";

import { useRef } from "react";
import { faq } from "@/lib/content";
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
          gsap.from(items, {
            autoAlpha: 0,
            y: 18,
            duration: 0.7,
            stagger: 0.07,
            ease: "expo.out",
            scrollTrigger: {
              trigger: items[0],
              start: "top 88%",
              once: true,
            },
          });
        }

        return () => cleanHeader();
      });

      return () => mm.revert();
    },
    []
  );

  return (
    <section ref={root} className="section-pad bg-surface">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div data-faq-header className="lg:col-span-4">
          <div data-split-meta>
            <Eyebrow className="text-ink-muted">Frequently Asked</Eyebrow>
          </div>
          <h2
            data-split-body
            className="mt-6 text-[10vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[3.2vw]"
          >
            Questions
          </h2>
        </div>

        <Accordion className="lg:col-span-8">
          {faq.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`item-${i}`}
              data-faq-item
              className="border-t border-hairline not-last:border-b-0 first:border-t-0"
            >
              <AccordionTrigger className="rounded-none py-6 text-lg font-semibold text-ink hover:no-underline sm:text-xl">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base text-ink-muted sm:text-lg">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
