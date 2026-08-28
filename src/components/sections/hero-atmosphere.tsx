"use client";

import { useRef } from "react";
import { FilmGrainLoader } from "@/components/three/film-grain-loader";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";

/**
 * Hero atmosphere — drifting warm lights behind the figure, plus the
 * site's existing film-grain shader. Sits under headline and portrait.
 */
export function HeroAtmosphere() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    root,
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduced.matches) return;

      const orbs = gsap.utils.toArray<HTMLElement>("[data-hero-orb]", root.current!);
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          x: i % 2 === 0 ? 56 : -44,
          y: i % 2 === 0 ? -32 : 48,
          scale: 1.12,
          duration: 11 + i * 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    []
  );

  return (
    <div
      ref={root}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        data-hero-orb
        className="absolute -left-[18%] top-[8%] h-[min(70vw,38rem)] w-[min(70vw,38rem)] rounded-full bg-orange-600/25 blur-[90px] sm:blur-[120px]"
      />
      <div
        data-hero-orb
        className="absolute -right-[12%] top-[22%] h-[min(52vw,28rem)] w-[min(52vw,28rem)] rounded-full bg-orange-600/18 blur-[80px] sm:blur-[110px]"
      />
      <div
        data-hero-orb
        className="absolute bottom-[-18%] left-[28%] h-[min(60vw,32rem)] w-[min(60vw,32rem)] rounded-full bg-white/[0.07] blur-[70px] sm:blur-[100px]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,black_100%)]" />
      <div className="absolute inset-0">
        <FilmGrainLoader />
      </div>
    </div>
  );
}
