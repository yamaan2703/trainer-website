"use client";

import { useRef } from "react";
import { process } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";

function StepPanel({ step }: { step: (typeof process.steps)[number] }) {
  return (
    <div className="flex h-full w-full shrink-0 flex-col justify-center border-l border-hairline px-8 first:border-l-0 sm:px-16 lg:w-1/3">
      <span className="font-mono text-sm text-copper">{step.index}</span>
      <h3 className="mt-6 max-w-md text-[9vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[3vw]">
        {step.title}
      </h3>
      <p className="mt-6 max-w-sm text-lg text-ink-muted">{step.description}</p>
    </div>
  );
}

export function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGsap(
    wrapRef,
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!trackRef.current || !wrapRef.current) return;
        const getDistance = () =>
          trackRef.current!.scrollWidth - window.innerWidth;

        gsap.to(trackRef.current, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    []
  );

  return (
    <section id="process" className="bg-surface">
      <Container className="section-pad !pb-10 sm:!pb-14">
        <Reveal>
          <Eyebrow className="text-ink-muted">{process.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-[10vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[4vw]">
            <span className="text-copper">{process.heading}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg text-lg text-ink-muted">{process.intro}</p>
        </Reveal>
      </Container>

      {/* Mobile / tablet: simple stacked composition, no pinning. */}
      <Container className="grid grid-cols-1 gap-10 pb-20 lg:hidden">
        {process.steps.map((step) => (
          <div key={step.index} className="border-t border-hairline pt-8">
            <span className="font-mono text-sm text-copper">{step.index}</span>
            <h3 className="mt-4 text-[9vw] font-black uppercase leading-[0.95] tracking-tight">
              {step.title}
            </h3>
            <p className="mt-4 text-ink-muted">{step.description}</p>
          </div>
        ))}
      </Container>

      {/* Desktop: pinned horizontal scroll — one of this page's two deliberate grid breaks. */}
      <div ref={wrapRef} className="relative hidden lg:block" style={{ height: "260vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden border-t border-hairline">
          <div ref={trackRef} className="flex h-full w-[300%]">
            {process.steps.map((step) => (
              <StepPanel key={step.index} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
