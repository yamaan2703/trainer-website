"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { EASE_OUT } from "@/lib/animations/motion-variants";

const AUTO_ADVANCE_MS = 6500;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const active = testimonials[index];

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, prefersReducedMotion]);

  return (
    <section
      className="section-pad bg-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <Eyebrow className="text-ink-muted">Client Results</Eyebrow>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="min-h-[260px] lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <p className="max-w-3xl text-[6.5vw] font-medium leading-[1.15] tracking-tight text-balance sm:text-[2.4vw]">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  {active.image && (
                    <Image
                      src={active.image}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover grayscale"
                    />
                  )}
                  <span className="text-sm uppercase tracking-[0.15em] text-ink-muted">
                    {active.name}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-row gap-2 lg:col-span-3 lg:flex-col lg:justify-center lg:gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={i === index}
                className="group flex items-center gap-3 py-1 text-left"
              >
                <span
                  className={`h-px flex-1 transition-colors lg:flex-none lg:w-8 ${
                    i === index ? "bg-copper" : "bg-hairline group-hover:bg-ink-muted"
                  }`}
                />
                <span
                  className={`hidden text-xs uppercase tracking-[0.1em] transition-colors lg:block ${
                    i === index ? "text-ink" : "text-ink-muted"
                  }`}
                >
                  {t.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
