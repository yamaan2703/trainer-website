"use client";

import { useRef } from "react";
import Image from "next/image";
import { story } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";

export function Story() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    gsap.to("[data-parallax-slow]", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
    });
    gsap.to("[data-parallax-fast]", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, []);

  return (
    <section
      id="story"
      ref={root}
      className="section-pad overflow-hidden bg-cream text-ink-on-cream"
    >
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:pt-8">
            <Reveal>
              <Eyebrow className="text-ink-on-cream-muted">{story.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-[11vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[3.6vw]">
                {story.heading}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-5">
              {story.paragraphs.map((p, i) => (
                <Reveal key={p} delay={0.1 + i * 0.05}>
                  <p className="text-ink-on-cream-muted leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div
              data-parallax-slow
              className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10]"
            >
              <Image
                src="/images/story-vintage-car.png"
                alt="Cameron Clark's restored vintage Triumph sports car"
                fill
                sizes="(min-width: 1024px) 55vw, 90vw"
                className="object-cover"
              />
            </div>

            <div
              data-parallax-fast
              className="absolute -bottom-10 -left-6 w-[48%] max-w-[280px] overflow-hidden border-4 border-cream bg-surface-2 shadow-2xl sm:-bottom-14 sm:left-8"
            >
              <Image
                src="/images/story-daughter.png"
                alt="Cameron Clark with his daughter"
                width={600}
                height={750}
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
