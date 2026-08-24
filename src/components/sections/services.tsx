"use client";

import { useRef } from "react";
import Image from "next/image";
import { services, servicesIntro } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { CtaLink } from "@/components/shared/cta-link";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";

function ServiceRow({
  service,
  reversed,
}: {
  service: (typeof services)[number];
  reversed: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGsap(root, () => {
    gsap.fromTo(
      root.current!.querySelector("[data-service-image]"),
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      }
    );
    gsap.fromTo(
      root.current!.querySelectorAll("[data-service-text]"),
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      }
    );
  }, []);

  return (
    <div
      ref={root}
      className={`grid grid-cols-1 items-center gap-10 border-t border-hairline py-16 first:border-t-0 sm:py-20 lg:grid-cols-2 lg:gap-16 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div data-service-image className="relative aspect-[4/5] overflow-hidden bg-surface-2 lg:aspect-[3/4]">
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-cover object-top grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
      </div>

      <div>
        <div data-service-text className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-copper">{service.index}</span>
          <span className="h-px flex-1 bg-hairline" />
          <span className="text-xs uppercase tracking-[0.2em] text-ink-muted">
            {service.statLabel}: <span className="text-ink">{service.stat}</span>
          </span>
        </div>

        <h3
          data-service-text
          className="mt-6 text-[9vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[3.4vw]"
        >
          {service.title}
        </h3>

        <p data-service-text className="mt-6 max-w-lg text-lg text-ink-muted">
          {service.description}
        </p>
        <p data-service-text className="mt-4 max-w-lg text-ink-muted">
          {service.detail}
        </p>

        <div data-service-text className="mt-8">
          <CtaLink href="#contact" variant="outline">
            {service.cta}
          </CtaLink>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="section-pad bg-surface">
      <Container>
        <div className="flex flex-col gap-8 border-b border-hairline pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow className="mb-6 text-ink-muted">Services</Eyebrow>
            <h2 className="max-w-2xl text-[10vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[4vw]">
              {servicesIntro.heading}
            </h2>
          </div>
          <p className="max-w-sm text-ink-muted">{servicesIntro.body}</p>
        </div>

        {services.map((service, i) => (
          <ServiceRow key={service.id} service={service} reversed={i % 2 === 1} />
        ))}
      </Container>
    </section>
  );
}
