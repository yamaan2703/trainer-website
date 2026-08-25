"use client";

import { useRef } from "react";
import Image from "next/image";
import { timeline } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

function setNavHidden({ hidden }: { hidden: boolean }) {
  document.documentElement.dataset.navHidden = String(hidden);
}

/**
 * Scroll distance the pinned frame holds for, per chapter. Three chapters at
 * 100svh each gives every wipe a full screen of travel plus a beat to rest on.
 */
const SCROLL_PER_CHAPTER = 100;

/**
 * Timeline positions for chapter `i` (0-based, i > 0): the wipe runs over
 * `duration` after `start`. Values are fractions of the master scrub length.
 */
function wipeWindow(i: number, count: number) {
  const slot = 1 / (count - 1);
  const start = (i - 1) * slot;
  return { start: start + slot * 0.22, duration: slot * 0.56 };
}

export function Timeline() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const layers = gsap.utils.toArray<HTMLElement>("[data-chapter]", scope);
      const copies = gsap.utils.toArray<HTMLElement>("[data-chapter-copy]", scope);
      const count = layers.length;

      // Hide the fixed navbar for the whole pinned frame so the chapters read
      // full-bleed. Lives outside the motion preference gate so reduced-motion
      // visitors get the same clear stage.
      const navTrigger = ScrollTrigger.create({
        trigger: scope,
        start: "top top",
        end: "bottom bottom",
        onToggle: ({ isActive }) => setNavHidden({ hidden: isActive }),
        onRefresh: (self) => setNavHidden({ hidden: self.isActive }),
      });

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Image layers wipe L→R. Copy is a separate fixed stack — only
        // autoAlpha swaps, never translate, so type stays locked to center.
        layers.forEach((layer, i) => {
          if (i === 0) return;
          gsap.set(layer, { clipPath: "inset(0% 100% 0% 0%)" });
        });

        // Exclusive visibility from the first paint — prevents stacked text
        // before the timeline builds (and after Strict Mode cleanup).
        gsap.set(copies, { autoAlpha: 0 });
        gsap.set(copies[0], { autoAlpha: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        layers.forEach((layer, i) => {
          const media = layer.querySelector("[data-chapter-media]");

          // Slow push-in on every image for the whole pinned run.
          tl.fromTo(
            media,
            { scale: 1.16, yPercent: -2 },
            { scale: 1.02, yPercent: 2, duration: 1 },
            0
          );

          if (i === 0) return;

          const { start, duration } = wipeWindow(i, count);

          tl.to(layer, { clipPath: "inset(0% 0% 0% 0%)", duration }, start);

          // Crossfade locked to the wipe midpoint — outgoing and incoming
          // swap in place; no y/x so the overlay never drifts with scroll.
          const fadeAt = start + duration * 0.35;
          const fadeDur = duration * 0.3;

          tl.to(copies[i - 1], { autoAlpha: 0, duration: fadeDur }, fadeAt);
          tl.fromTo(
            copies[i],
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: fadeDur, immediateRender: false },
            fadeAt
          );
        });
      });

      return () => {
        navTrigger.kill();
        setNavHidden({ hidden: false });
        mm.revert();
      };
    },
    []
  );

  return (
    <section id="timeline" className="bg-surface">
      <Container className="section-pad !pb-10">
        <Reveal>
          <Eyebrow className="text-ink-muted">{timeline.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-[10vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[4vw]">
            {timeline.heading}
          </h2>
        </Reveal>
      </Container>

      {/* Scroll track: one screen of travel per chapter. The frame inside is
          sticky rather than GSAP-pinned, which keeps Lenis in charge of the
          scroll position and avoids a pin-spacer fighting the layout. */}
      <div
        ref={root}
        style={{ height: `${timeline.chapters.length * SCROLL_PER_CHAPTER}svh` }}
        className="relative motion-reduce:!h-auto"
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-black motion-reduce:static motion-reduce:h-auto">
          {/* Image stack — clip-path wipe + Ken Burns only. Unchanged. */}
          {timeline.chapters.map((chapter, i) => (
            <article
              key={chapter.id}
              data-chapter
              style={{ zIndex: i + 1 }}
              className="absolute inset-0 overflow-hidden will-change-[clip-path] motion-reduce:relative motion-reduce:h-[75svh] motion-reduce:border-t motion-reduce:border-hairline"
            >
              <div data-chapter-media className="absolute inset-0 will-change-transform">
                <Image
                  src={chapter.image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-center brightness-[0.72] contrast-[1.06] grayscale-[0.35]"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/35" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/70" />

              {/* Reduced-motion: copy stays with each static chapter frame.
                  Hardcoded light type so a global theme scrub never darkens
                  these overlays against the cinematic image. */}
              <div className="absolute inset-0 hidden flex-col items-center justify-center px-6 text-center motion-reduce:flex">
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-orange-600 sm:text-sm">
                  {chapter.marker}
                </p>
                <h3 className="mt-6 text-[13vw] font-normal uppercase leading-[0.86] tracking-tight text-white sm:text-[7.5vw] lg:text-8xl">
                  {chapter.title}
                </h3>
                <p className="mt-8 max-w-md text-balance text-base leading-relaxed text-white/75 sm:text-lg">
                  {chapter.body}
                </p>
              </div>
            </article>
          ))}

          {/* Fixed copy stack — position locked inside the sticky frame.
              Only autoAlpha swaps per chapter; inactive layers stay invisible
              so text never stacks or scrolls away. */}
          <div className="pointer-events-none absolute inset-0 z-20 motion-reduce:hidden">
            {timeline.chapters.map((chapter, i) => (
              <div
                key={chapter.id}
                data-chapter-copy
                aria-hidden={i !== 0}
                className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center ${
                  i === 0 ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-orange-600 sm:text-sm">
                  {chapter.marker}
                </p>
                <h3 className="mt-6 text-[13vw] font-normal uppercase leading-[0.86] tracking-tight text-white sm:text-[7.5vw] lg:text-8xl">
                  {chapter.title}
                </h3>
                <p className="mt-8 max-w-md text-balance text-base leading-relaxed text-white/75 sm:text-lg">
                  {chapter.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
