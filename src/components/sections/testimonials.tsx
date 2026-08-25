"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function Rating({ value, name }: { value: number; name: string }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${value} out of 5 stars from ${name}`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          strokeWidth={0}
          className={`h-3.5 w-3.5 ${i < value ? "fill-orange-600" : "fill-ink/15"}`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const track = trackRef.current!;
      const items = gsap.utils.toArray<HTMLElement>("[data-t-item]", track);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const header = scope.querySelector<HTMLElement>("[data-t-header]");
        const cleanHeader = header
          ? setupSplitTextReveal({ scope: header, trigger: header })
          : () => undefined;

        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        const sizeTrack = () => {
          scope.style.height = `${window.innerHeight + distance()}px`;
        };
        sizeTrack();
        ScrollTrigger.addEventListener("refreshInit", sizeTrack);

        const grade = () => {
          const mid = window.innerWidth / 2;
          const reach = window.innerWidth * 0.62;

          items.forEach((item) => {
            const card = item.querySelector<HTMLElement>("[data-t-card]");
            const rect = item.getBoundingClientRect();
            const d = Math.min(
              1,
              Math.abs(rect.left + rect.width / 2 - mid) / reach
            );

            // Mild depth only — heavy y shifts fought the concave silhouette.
            gsap.set(item, {
              scale: 1 - d * 0.08,
              yPercent: d * 1.25,
              rotate: 0,
            });
            if (card) gsap.set(card, { opacity: 1 - d * 0.28 });
          });
        };

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: grade,
            onRefresh: grade,
          },
        });

        grade();

        return () => {
          cleanHeader();
          ScrollTrigger.removeEventListener("refreshInit", sizeTrack);
          scope.style.removeProperty("height");
          gsap.set(items, { clearProps: "transform" });
          gsap.set(
            items
              .map((item) => item.querySelector("[data-t-card]"))
              .filter(Boolean),
            { clearProps: "opacity" }
          );
        };
      });

      return () => mm.revert();
    },
    []
  );

  return (
    <section id="testimonials" className="bg-surface">
      <div
        ref={root}
        className="relative h-[320svh] sm:h-[280svh] motion-reduce:!h-auto"
      >
        {/*
          Heading lives inside the sticky frame so the gap to the cards stays
          fixed for the whole scrub — centering the rail alone left a ~½-viewport
          void under the title.
        */}
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-16">
          <Container className="shrink-0 pt-[calc(var(--header-h)+1.25rem)] pb-5 sm:pb-6">
            <div data-t-header>
              <div data-split-meta>
                <Eyebrow className="text-ink-muted">Client Results</Eyebrow>
              </div>
              <h2
                data-split-body
                className="mt-5 max-w-2xl text-[10vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[4vw]"
              >
                What Clients Say
              </h2>
            </div>
          </Container>

          <div className="flex min-h-0 flex-1 items-start pt-2 sm:pt-3 motion-reduce:items-stretch motion-reduce:pt-8">
            <div
              ref={trackRef}
              className="flex w-max items-start gap-[6vw] px-[14vw] will-change-transform sm:gap-[3vw] sm:px-[10vw] lg:gap-[2vw] lg:px-[34vw] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-8 motion-reduce:px-6"
            >
              {testimonials.map((t) => (
                <figure
                  key={t.name}
                  data-t-item
                  className="relative w-[60vw] shrink-0 will-change-transform sm:w-[36vw] lg:w-[24vw] motion-reduce:w-full motion-reduce:max-w-sm"
                >
                  <div
                    data-t-card
                    className="relative flex h-[17.5rem] flex-col bg-surface-2 px-5 py-5 text-ink sm:h-[16.5rem] sm:px-6 sm:py-6 lg:h-[15.5rem] lg:px-6 lg:py-6"
                  >
                    <Rating value={t.rating} name={t.name} />
                    <blockquote className="mt-3 line-clamp-3 flex-1 text-pretty text-sm font-medium leading-snug text-ink sm:mt-4 sm:text-[0.95rem] sm:leading-snug">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 flex shrink-0 items-center gap-2.5 border-t border-hairline/70 pt-4 sm:mt-5 sm:pt-4">
                      {t.image ? (
                        <Image
                          src={t.image}
                          alt=""
                          width={36}
                          height={36}
                          className="h-9 w-9 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-600/15 text-[0.65rem] font-semibold tracking-[0.06em] text-orange-600"
                        >
                          {initialsOf(t.name)}
                        </span>
                      )}
                      <span className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink">
                        {t.name}
                      </span>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
