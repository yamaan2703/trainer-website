"use client";

import { useRef } from "react";
import { aboutPage } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

/** Core values — numbered typographic rows like Outcomes. */
export function AboutValues() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const header = scope.querySelector<HTMLElement>("[data-values-header]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-value-row]", scope);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cleanHeader = header
          ? setupSplitTextReveal({ scope: header, trigger: header })
          : () => undefined;

        rows.forEach((row) => {
          const index = row.querySelector("[data-value-index]");
          const text = row.querySelector("[data-value-text]");
          const rule = row.querySelector("[data-value-rule]");

          gsap.set(index, { autoAlpha: 0, x: -12 });
          gsap.set(text, { yPercent: 110 });
          gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: row,
                start: "top 90%",
                once: true,
              },
              defaults: { ease: "expo.out" },
            })
            .to(index, { autoAlpha: 1, x: 0, duration: 0.7 }, 0)
            .to(text, { yPercent: 0, duration: 0.85 }, 0.06)
            .to(rule, { scaleX: 1, duration: 0.8 }, 0.2);
        });

        return () => cleanHeader();
      });

      return () => mm.revert();
    },
    []
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-surface pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(1.5rem,4vw,3rem)]"
    >
      <Container>
        <div className="border-t border-hairline pt-12 lg:pt-16">
          <div data-values-header className="max-w-3xl">
            <div data-split-meta>
              <Eyebrow className="text-ink-muted">
                {aboutPage.values.eyebrow}
              </Eyebrow>
            </div>
            <h2
              data-split-body
              className="mt-5 max-w-[12ch] text-[clamp(2.25rem,6vw,3.5rem)] font-black uppercase leading-[0.95] tracking-tight text-ink"
            >
              {aboutPage.values.heading}
            </h2>
          </div>

          <ol className="mt-14 lg:mt-20">
            {aboutPage.values.items.map((item, i) => (
              <li
                key={item.title}
                data-value-row
                className="grid grid-cols-1 gap-3 border-t border-hairline py-6 sm:grid-cols-[5rem_1fr] sm:gap-8 sm:py-7 lg:grid-cols-[7rem_minmax(0,1fr)]"
              >
                <span
                  data-value-index
                  className="font-mono text-3xl font-light tracking-tight text-orange-600 sm:text-4xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 overflow-hidden">
                  <div data-value-text>
                    <p className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                      {item.title}
                    </p>
                    <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                      {item.description}
                    </p>
                  </div>
                  <span
                    data-value-rule
                    aria-hidden
                    className="mt-5 block h-px w-16 bg-orange-600"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
