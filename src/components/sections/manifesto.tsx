"use client";

import { Fragment, useRef } from "react";
import { reality } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";

/** Splits a paragraph into `<span data-word>` wrapped words for a scroll-scrubbed reveal. */
function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span data-word className="text-ink opacity-25">
            {word}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    const words = gsap.utils.toArray<HTMLElement>("[data-word]", root.current);
    if (words.length === 0) return;

    gsap.to(words, {
      opacity: 1,
      duration: 1,
      stagger: 0.06,
      ease: "none",
      scrollTrigger: {
        trigger: root.current,
        start: "top 75%",
        end: "bottom 60%",
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <section ref={root} className="section-pad bg-surface">
      <Container>
        <Eyebrow className="mb-8 text-ink-muted">{reality.eyebrow}</Eyebrow>
        <p className="max-w-5xl text-[7.5vw] font-normal uppercase leading-[1.05] tracking-tight sm:text-[3.5vw]">
          <span className="text-orange-600">{reality.heading}</span>{" "}
          {reality.body.map((paragraph) => (
            <Words key={paragraph} text={paragraph} />
          ))}
        </p>
      </Container>
    </section>
  );
}
