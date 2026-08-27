"use client";

import { useRef } from "react";
import Image from "next/image";
import { story } from "@/lib/content";
import { TextCtaLink } from "@/components/shared/text-cta-link";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, SplitText } from "@/lib/animations/gsap";

/**
 * Story — modelled on https://palominoprod.com/en "Our Story":
 * sticky 50/50 split, left copy + CTA, right portrait that opens from a
 * center clip-path (inset 50% → 0%) while scaling 1.2 → 1. Body copy
 * reveals line-by-line through SplitText masks.
 */

export function Story() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const frame = scope.querySelector<HTMLElement>("[data-story-frame]");
      const media = scope.querySelector<HTMLElement>("[data-story-media]");
      const body = scope.querySelector<HTMLElement>("[data-story-body]");
      const meta = scope.querySelectorAll<HTMLElement>("[data-story-meta]");

      if (!frame || !media || !body) return;

      const mm = gsap.matchMedia();

      // Desktop — scrubbed open while the frame is sticky (Palomino pattern).
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(body, {
          type: "lines",
          mask: "lines",
        });

        gsap.set(frame, { clipPath: "inset(50%)" });
        gsap.set(media, { scale: 1.2 });
        gsap.set(split.lines, { yPercent: 110 });
        gsap.set(meta, { autoAlpha: 0, y: 18 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

        tl.to(frame, { clipPath: "inset(0%)", duration: 0.7 }, 0.1);
        tl.to(media, { scale: 1, duration: 0.7 }, 0.1);
        tl.to(meta, { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.1 }, 0.2);
        tl.to(split.lines, { yPercent: 0, duration: 0.4, stagger: 0.045 }, 0.24);

        return () => {
          split.revert();
        };
      });

      // Mobile — one-shot entrance, no long sticky track.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(body, {
          type: "lines",
          mask: "lines",
        });

        gsap.set(frame, { clipPath: "inset(50%)" });
        gsap.set(media, { scale: 1.2 });
        gsap.set(split.lines, { yPercent: 110 });
        gsap.set(meta, { autoAlpha: 0, y: 18 });

        const enter = {
          trigger: scope,
          start: "top 72%",
          once: true,
        } as const;

        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: enter })
          .to(frame, { clipPath: "inset(0%)", duration: 1.35 }, 0)
          .to(media, { scale: 1, duration: 1.45 }, 0)
          .to(meta, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.2)
          .to(split.lines, { yPercent: 0, duration: 0.95, stagger: 0.06 }, 0.28);

        return () => {
          split.revert();
        };
      });

      return () => mm.revert();
    },
    []
  );

  return (
    <section id="story" className="bg-surface">
      <div
        ref={root}
        className="relative h-auto lg:h-[160svh] motion-reduce:!h-auto"
      >
        <div className="grid grid-cols-1 overflow-hidden bg-surface lg:sticky lg:top-[var(--header-h)] lg:h-[calc(100svh-var(--header-h))] lg:grid-cols-2 motion-reduce:static motion-reduce:h-auto">
          {/* Left — label, body, CTA. */}
          <div className="relative z-10 order-2 flex flex-col justify-between gap-12 px-6 py-14 sm:px-10 lg:order-1 lg:px-16 lg:py-16 xl:px-20">
            <div data-story-meta className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="block size-2.5 shrink-0 rounded-full bg-ink"
              />
              <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-ink sm:text-[0.8125rem]">
                {story.eyebrow}
              </h2>
            </div>

            <p
              data-story-body
              className="max-w-md text-[1.35rem] font-light leading-[1.35] tracking-tight text-ink sm:text-2xl lg:text-[1.65rem]"
            >
              {story.body}
            </p>

            <div data-story-meta>
              <TextCtaLink href={story.ctaHref}>{story.cta}</TextCtaLink>
            </div>
          </div>

          {/* Right — full portrait with studio black background kept in-frame.
              Inset slightly shrinks the frame; sticky top clears the navbar. */}
          <div className="relative order-1 min-h-[58svh] lg:order-2 lg:min-h-0">
            <div
              data-story-frame
              className="absolute inset-5 overflow-hidden will-change-[clip-path] sm:inset-6 lg:inset-8"
            >
              <div
                data-story-media
                className="absolute inset-0 origin-center will-change-transform"
              >
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
