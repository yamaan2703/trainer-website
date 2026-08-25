"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { process } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

const STEP_DURATION = 5;

/**
 * Process — accordion + image panel.
 * Active step shows a 5s line loader; when it finishes, the next step opens.
 * Hover/click jumps to a step and restarts the loader.
 */

export function Process() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const prevActive = useRef(0);
  const isFirstPaint = useRef(true);
  const loaderTween = useRef<gsap.core.Tween | null>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const list = scope.querySelector<HTMLElement>("[data-process-list]");
      const header = scope.querySelector<HTMLElement>("[data-process-header]");
      const rows = gsap.utils.toArray<HTMLElement>(
        "[data-process-row]",
        scope
      );
      if (!list || rows.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cleanHeader = header
          ? setupSplitTextReveal({ scope: header, trigger: header })
          : () => undefined;

        gsap.from(rows, {
          autoAlpha: 0,
          y: 18,
          duration: 0.7,
          stagger: 0.07,
          ease: "expo.out",
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
            once: true,
          },
        });

        return () => cleanHeader();
      });

      return () => mm.revert();
    },
    []
  );

  // Accordion open/close + image crossfade
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const bodies = gsap.utils.toArray<HTMLElement>(
      "[data-process-body]",
      scope
    );
    const images = gsap.utils.toArray<HTMLElement>(
      "[data-process-image]",
      scope
    );

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const from = prevActive.current;
    const to = active;

    if (isFirstPaint.current) {
      isFirstPaint.current = false;
      bodies.forEach((body, i) => {
        gsap.set(body, {
          height: i === to ? "auto" : 0,
          autoAlpha: i === to ? 1 : 0,
        });
      });
      images.forEach((img, i) => {
        gsap.set(img, { autoAlpha: i === to ? 1 : 0, scale: 1 });
      });
      prevActive.current = to;
      return;
    }

    if (from === to) return;

    const prevBody = bodies[from];
    const nextBody = bodies[to];
    const prevImage = images[from];
    const nextImage = images[to];

    if (reduced) {
      bodies.forEach((body, i) => {
        gsap.set(body, {
          height: i === to ? "auto" : 0,
          autoAlpha: i === to ? 1 : 0,
        });
      });
      images.forEach((img, i) => {
        gsap.set(img, { autoAlpha: i === to ? 1 : 0, scale: 1 });
      });
      prevActive.current = to;
      return;
    }

    if (prevBody) {
      gsap.killTweensOf(prevBody);
      gsap.set(prevBody, { height: prevBody.scrollHeight, autoAlpha: 1 });
      gsap.to(prevBody, {
        height: 0,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }

    if (nextBody) {
      gsap.killTweensOf(nextBody);
      gsap.set(nextBody, { autoAlpha: 1, height: 0 });
      gsap.to(nextBody, {
        height: "auto",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }

    if (prevImage) {
      gsap.killTweensOf(prevImage);
      gsap.to(prevImage, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
    }
    if (nextImage) {
      gsap.killTweensOf(nextImage);
      gsap.fromTo(
        nextImage,
        { autoAlpha: 0, scale: 1.03 },
        { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power3.out" }
      );
    }

    prevActive.current = to;
  }, [active]);

  // 5s line loader → advance to next step
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const loaders = gsap.utils.toArray<HTMLElement>(
      "[data-process-loader]",
      scope
    );

    loaderTween.current?.kill();
    loaders.forEach((line, i) => {
      gsap.killTweensOf(line);
      gsap.set(line, {
        scaleX: i === active ? 0 : 0,
        transformOrigin: "left center",
      });
    });

    const activeLine = loaders[active];
    if (!activeLine) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      const id = window.setTimeout(() => {
        setActive((i) => (i + 1) % process.steps.length);
      }, STEP_DURATION * 1000);
      return () => window.clearTimeout(id);
    }

    gsap.set(activeLine, { scaleX: 0 });
    loaderTween.current = gsap.to(activeLine, {
      scaleX: 1,
      duration: STEP_DURATION,
      ease: "none",
      onComplete: () => {
        setActive((i) => (i + 1) % process.steps.length);
      },
    });

    return () => {
      loaderTween.current?.kill();
    };
  }, [active]);

  function selectStep({ index }: { index: number }) {
    setActive(index);
  }

  return (
    <section
      ref={root}
      id="process"
      className="relative overflow-hidden bg-surface pb-[clamp(3.5rem,8vw,7.5rem)] pt-[clamp(1.5rem,4vw,3rem)]"
    >
      <Container>
        <div className="pt-12 lg:pt-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-x-10 xl:gap-x-12">
            {/* Left — constrained so type never spills into the image column */}
            <div className="@container/process min-w-0 w-full max-w-full lg:col-span-6">
              <div data-process-header className="min-w-0 max-w-full">
                <div data-split-meta>
                  <Eyebrow className="text-ink-muted">{process.eyebrow}</Eyebrow>
                </div>
                <h2
                  data-split-body
                  className="mt-5 w-full max-w-[10ch] break-words text-[clamp(2.75rem,11vw,4.25rem)] font-black uppercase leading-[0.88] tracking-tight text-ink lg:text-[clamp(3.25rem,14cqi,5rem)]"
                >
                  {process.heading}
                </h2>
              </div>

              <div
                data-process-list
                role="tablist"
                aria-label="Process steps"
                className="mt-10 w-full min-w-0 sm:mt-12"
              >
                {process.steps.map((step, i) => {
                  const isActive = i === active;

                  return (
                    <div
                      key={step.index}
                      data-process-row
                      onMouseEnter={() => {
                        if (
                          window.matchMedia(
                            "(hover: hover) and (pointer: fine)"
                          ).matches
                        ) {
                          selectStep({ index: i });
                        }
                      }}
                      className="relative w-full min-w-0 border-t border-hairline last:border-b"
                    >
                      {/* 5s progress line on the open tab */}
                      <span
                        data-process-loader
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-orange-600"
                        style={{ transform: "scaleX(0)" }}
                      />

                      <button
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`process-panel-${step.index}`}
                        id={`process-tab-${step.index}`}
                        onClick={() => selectStep({ index: i })}
                        className="flex w-full min-w-0 items-baseline gap-4 py-6 text-left sm:gap-5 sm:py-7"
                      >
                        <span
                          className={`shrink-0 font-mono text-sm tracking-tight transition-colors duration-300 ${
                            isActive ? "text-orange-600" : "text-ink-muted/55"
                          }`}
                        >
                          {step.index}
                        </span>
                        <span
                          className={`min-w-0 flex-1 break-words text-[clamp(1.45rem,5.5cqi,2.15rem)] font-semibold tracking-tight transition-colors duration-300 ${
                            isActive ? "text-ink" : "text-ink-muted/55"
                          }`}
                        >
                          {step.title}
                        </span>
                      </button>

                      <div
                        id={`process-panel-${step.index}`}
                        role="tabpanel"
                        aria-labelledby={`process-tab-${step.index}`}
                        data-process-body
                        className="overflow-hidden"
                        style={{ height: i === 0 ? "auto" : 0 }}
                      >
                        <div className="max-w-md pb-7 pl-11 sm:pb-8 sm:pl-12">
                          <p className="text-base leading-relaxed text-ink-muted sm:text-[1.05rem]">
                            {step.description}
                          </p>
                          <a
                            href={step.ctaHref}
                            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-orange-600"
                          >
                            {step.cta}
                            <span aria-hidden className="text-orange-600">
                              ↗
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — stays in its track; height follows the left column on lg+ */}
            <div className="min-w-0 w-full lg:col-span-6 lg:flex lg:flex-col">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2 sm:aspect-[3/4] lg:aspect-auto lg:min-h-[28rem] lg:flex-1 xl:min-h-[32rem]">
                {process.steps.map((step, i) => (
                  <div
                    key={step.index}
                    data-process-image
                    className="absolute inset-0"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                    aria-hidden={i !== active}
                  >
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
