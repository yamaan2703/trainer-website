"use client";

import { useRef } from "react";
import { contactPage, site } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";
import { setupSplitTextReveal } from "@/lib/animations/split-text-reveal";

/**
 * Contact page composition — editorial left column + themed form.
 * Light theme (non-home) via ThemeTransition; GSAP split reveal matches About.
 */
export function ContactSection() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    root,
    () => {
      const scope = root.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        return setupSplitTextReveal({ scope, trigger: scope, start: "top 85%" });
      });
      return () => mm.revert();
    },
    []
  );

  return (
    <section
      ref={root}
      id="contact"
      className="relative overflow-hidden bg-surface pb-[clamp(4rem,10vw,8rem)] pt-[calc(var(--header-h)+clamp(2rem,5vw,3.5rem))]"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <div data-split-meta>
              <Eyebrow className="text-ink-muted">{contactPage.eyebrow}</Eyebrow>
            </div>
            <h1
              data-split-body
              className="mt-5 max-w-[10ch] text-[clamp(3rem,11vw,5.5rem)] font-black uppercase leading-[0.88] tracking-tight text-ink"
            >
              {contactPage.heading}
            </h1>
            <p
              data-split-meta
              className="mt-6 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {contactPage.body}
            </p>

            <ul data-split-meta className="mt-10 space-y-4">
              <li>
                <a
                  href={site.emailHref}
                  className="group inline-flex items-center gap-3 text-sm font-medium text-ink transition-colors hover:text-orange-600 sm:text-base"
                >
                  <span
                    aria-hidden
                    className="flex size-9 shrink-0 items-center justify-center border border-hairline text-orange-600 transition-colors group-hover:border-orange-600"
                  >
                    <MailIcon />
                  </span>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="group inline-flex items-center gap-3 text-sm font-medium text-ink transition-colors hover:text-orange-600 sm:text-base"
                >
                  <span
                    aria-hidden
                    className="flex size-9 shrink-0 items-center justify-center border border-hairline text-orange-600 transition-colors group-hover:border-orange-600"
                  >
                    <PhoneIcon />
                  </span>
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6.5h16v11H4v-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m4.5 7 7.5 6 7.5-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 4.5h3l1 4.5-2 1.5a12 12 0 0 0 5 5l1.5-2 4.5 1v3a2 2 0 0 1-2 2A14.5 14.5 0 0 1 4.5 6.5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
