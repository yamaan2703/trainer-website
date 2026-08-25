"use client";

import { useRef } from "react";
import Image from "next/image";
import { outcomes } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

/**
 * Outcomes — typographic rows with a desktop hover preview:
 * related image slides in from the right and fades out on leave.
 * Header copy uses the Story SplitText reveal.
 */
export function Outcomes() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const header = scope.querySelector<HTMLElement>("[data-outcomes-header]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-outcome-row]", scope);
      if (rows.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cleanHeader = header
          ? setupSplitTextReveal({ scope: header, trigger: header })
          : () => undefined;

        rows.forEach((row) => {
          const index = row.querySelector("[data-outcome-index]");
          const text = row.querySelector("[data-outcome-text]");
          const rule = row.querySelector("[data-outcome-rule]");

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
      id="results"
      className="relative overflow-hidden bg-surface pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(1.5rem,4vw,3rem)]"
    >
      <Container>
        <div className="border-t border-hairline pt-12 lg:pt-16">
          <div
            data-outcomes-header
            className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-12"
          >
            <div className="lg:col-span-5">
              <div data-split-meta>
                <Eyebrow className="text-ink-muted">{outcomes.eyebrow}</Eyebrow>
              </div>
              <h2
                data-split-body
                className="mt-5 max-w-[10ch] text-[12vw] font-black uppercase leading-[0.9] tracking-tight text-ink sm:text-6xl lg:text-[clamp(2.75rem,4.2vw,4.25rem)]"
              >
                {outcomes.heading}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p
                data-split-body
                className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg"
              >
                {outcomes.intro}
              </p>
            </div>
          </div>

          <ol className="mt-14 lg:mt-20">
            {outcomes.items.map((item, i) => (
              <li
                key={item.text}
                data-outcome-row
                className="group relative grid grid-cols-1 gap-4 border-t border-hairline py-2 sm:grid-cols-[5rem_1fr] sm:gap-8 lg:grid-cols-[7rem_minmax(0,1fr)_minmax(16rem,22rem)] lg:items-center lg:gap-10"
              >
                <span
                  data-outcome-index
                  className="font-mono text-3xl font-light tracking-tight text-orange-600 sm:text-4xl lg:text-5xl"
                >
                  0{i + 1}
                </span>

                <div className="min-w-0 overflow-hidden lg:pr-6">
                  <p
                    data-outcome-text
                    className="max-w-2xl text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]"
                  >
                    {item.text}
                  </p>
                  <span
                    data-outcome-rule
                    aria-hidden
                    className="mt-5 block h-px w-16 bg-orange-600 transition-all duration-500 group-hover:w-28"
                  />
                </div>

                {/* Hover preview — slides in from the right on desktop. */}
                <div className="pointer-events-none relative hidden h-40 overflow-hidden lg:block xl:h-44">
                  <div className="absolute inset-0 translate-x-5 opacity-0 transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="352px"
                      className="object-contain object-center"
                    />
                  </div>
                  <span
                    aria-hidden
                    className="absolute bottom-0 right-0 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted transition-opacity duration-300 group-hover:opacity-0"
                  >
                    Result
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
