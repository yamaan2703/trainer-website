import Image from "next/image";
import { outcomes } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { OutcomesList } from "@/components/sections/outcomes-list";

export function Outcomes() {
  return (
    <section className="section-pad bg-surface-2">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow className="text-ink-muted">{outcomes.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-[10vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[3.6vw]">
                {outcomes.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg text-ink-muted">{outcomes.intro}</p>
            </Reveal>

            <OutcomesList items={outcomes.items} />
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-square w-full overflow-hidden bg-surface sm:aspect-[4/3]">
              <Image
                src="/images/deadlift.png"
                alt="Cameron Clark competing in a powerlifting deadlift"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover object-[75%_20%] grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
