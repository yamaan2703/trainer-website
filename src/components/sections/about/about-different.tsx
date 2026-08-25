"use client";

import { useRef } from "react";
import { aboutPage } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

/** Differentiators — intro + numbered grid matching site editorial language. */
export function AboutDifferent() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const header = scope.querySelector<HTMLElement>("[data-diff-header]");
      const items = gsap.utils.toArray<HTMLElement>("[data-diff-item]", scope);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cleanHeader = header
          ? setupSplitTextReveal({ scope: header, trigger: header })
          : () => undefined;

        items.forEach((item, i) => {
          gsap.set(item, { autoAlpha: 0, y: 18 });
          gsap.to(item, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.06,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
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

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-surface pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(1.5rem,4vw,3rem)]"
    >
      <Container>
        <div className="border-t border-hairline pt-12 lg:pt-16">
          <div
            data-diff-header
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-12"
          >
            <div className="lg:col-span-6">
              <div data-split-meta>
                <Eyebrow className="text-ink-muted">
                  {aboutPage.different.eyebrow}
                </Eyebrow>
              </div>
              <h2
                data-split-body
                className="mt-5 max-w-[16ch] text-[clamp(2.25rem,6vw,3.5rem)] font-black uppercase leading-[0.95] tracking-tight text-ink"
              >
                {aboutPage.different.heading}
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p
                data-split-body
                className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg"
              >
                {aboutPage.different.intro}
              </p>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-0 border-t border-hairline sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {aboutPage.different.items.map((item, i) => (
              <article
                key={item.title}
                data-diff-item
                className="border-b border-hairline py-8 sm:border-hairline"
              >
                <p className="font-mono text-sm text-orange-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-sm text-base leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
