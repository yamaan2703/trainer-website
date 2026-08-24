import Image from "next/image";
import { about } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/motion/reveal";

export function About() {
  return (
    <section id="about" className="section-pad bg-surface">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow className="text-ink-muted">{about.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-[11vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[4.5vw]">
                {about.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="mt-10 max-w-xl text-2xl font-semibold text-ink sm:text-3xl">
                {about.story.heading}
              </h3>
            </Reveal>
            <div className="mt-6 max-w-xl space-y-5">
              {about.story.paragraphs.map((p, i) => (
                <Reveal key={p} delay={0.14 + i * 0.05}>
                  <p className="leading-relaxed text-ink-muted">{p}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 border-t border-hairline pt-8 sm:grid-cols-2">
              {about.servesWho.map((item, i) => (
                <Reveal key={item.title} delay={0.1 + i * 0.06}>
                  <p className="text-lg font-semibold text-ink">{item.title}</p>
                  <p className="mt-2 text-ink-muted">{item.description}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2">
                <Image
                  src="/images/portrait-confident.jpg"
                  alt="Cameron Clark in the gym"
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="object-cover grayscale"
                />
              </div>
            </Reveal>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-hairline pt-8 sm:grid-cols-4 lg:grid-cols-2">
              {about.values.map((value, i) => (
                <Reveal key={value.title} delay={0.06 + i * 0.05}>
                  <dt className="font-mono text-xs text-copper">0{i + 1}</dt>
                  <dd className="mt-2 text-sm font-semibold text-ink">{value.title}</dd>
                  <dd className="mt-1 text-sm text-ink-muted">{value.description}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
