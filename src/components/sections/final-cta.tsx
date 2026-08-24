import { finalCta, site } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/shared/cta-link";
import { Reveal } from "@/components/motion/reveal";

export function FinalCta() {
  return (
    <section id="contact" className="section-pad bg-surface-2">
      <Container>
        <div className="grid grid-cols-1 gap-14 border-t border-hairline pt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="max-w-3xl text-[11vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[5vw]">
                {finalCta.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-lg text-lg text-ink-muted">{finalCta.body}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10">
                <CtaLink href={site.discoveryCallHref}>{finalCta.cta}</CtaLink>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-end gap-6 lg:col-span-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">Email</p>
              <a
                href={site.emailHref}
                className="mt-2 block text-xl font-medium text-ink transition-colors hover:text-copper sm:text-2xl"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">Phone</p>
              <a
                href={site.phoneHref}
                className="mt-2 block text-xl font-medium text-ink transition-colors hover:text-copper sm:text-2xl"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
