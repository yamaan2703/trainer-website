"use client";

import { useRef } from "react";
import Image from "next/image";
import { aboutPage } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

/** Beyond the floor — story split with audiences (Process / Story pattern). */
export function AboutBeyond() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const header = scope.querySelector<HTMLElement>("[data-beyond-header]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-beyond-row]", scope);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cleanHeader = header
          ? setupSplitTextReveal({ scope: header, trigger: header })
          : () => undefined;

        rows.forEach((row, i) => {
          gsap.set(row, { autoAlpha: 0, y: 18 });
          gsap.to(row, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: "expo.out",
            scrollTrigger: {
              trigger: row,
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

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-surface pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(1.5rem,4vw,3rem)]"
    >
      <Container>
        <div className="border-t border-hairline pt-12 lg:pt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-x-14">
            <div data-beyond-header className="lg:col-span-5">
              <div data-split-meta>
                <Eyebrow className="text-ink-muted">
                  {aboutPage.beyond.eyebrow}
                </Eyebrow>
              </div>
              <h2
                data-split-body
                className="mt-5 max-w-[14ch] text-[clamp(2.25rem,6vw,3.5rem)] font-black uppercase leading-[0.95] tracking-tight text-ink"
              >
                {aboutPage.beyond.heading}
              </h2>
              <div className="mt-6 space-y-5">
                {aboutPage.beyond.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    data-split-body
                    className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 space-y-0 border-t border-hairline">
                {aboutPage.beyond.audiences.map((item, i) => (
                  <div
                    key={item.title}
                    data-beyond-row
                    className="border-b border-hairline py-6"
                  >
                    <p className="font-mono text-sm text-orange-600">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-lg font-semibold tracking-tight text-ink sm:text-xl">
                      {item.title}
                    </p>
                    <p className="mt-2 max-w-md text-base leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="relative aspect-[4/5] h-full min-h-[24rem] w-full overflow-hidden bg-surface-2 sm:aspect-[3/4] lg:aspect-auto lg:min-h-0">
                <Image
                  src={aboutPage.beyond.image}
                  alt={aboutPage.beyond.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
