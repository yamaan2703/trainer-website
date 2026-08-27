import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/content";
import { Container } from "@/components/layout/container";

interface LegalBlock {
  heading?: string;
  paragraphs: string[];
}

interface LegalSection {
  title: string;
  blocks: LegalBlock[];
}

interface LegalDocumentProps {
  heading: string;
  intro?: LegalBlock[];
  sections: LegalSection[];
}

/**
 * Shared Terms / Privacy layout — light editorial surface, site font stack,
 * footer tuck so the black footer frames like other interior pages.
 */
export function LegalDocument({
  heading,
  intro = [],
  sections,
}: LegalDocumentProps) {
  return (
    <section
      data-footer-tuck
      className="relative z-10 bg-surface pb-[clamp(5rem,12vw,8rem)] pt-[calc(var(--header-h)+clamp(2rem,5vw,3.5rem))] font-sans"
    >
      <Container>
        <h1 className="text-[clamp(2.5rem,8vw,4.25rem)] font-black uppercase leading-[0.92] tracking-tight text-ink">
          {heading}
        </h1>

        <div className="mt-10 space-y-10 text-base leading-relaxed text-ink-muted sm:mt-12 sm:text-[1.05rem] sm:leading-relaxed lg:max-w-none">
          {intro.map((block) => (
            <LegalBlockView key={block.heading ?? block.paragraphs[0]} block={block} />
          ))}

          {sections.map((section) => (
            <article key={section.title} className="space-y-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-ink sm:text-[0.95rem]">
                {section.title}
              </h2>
              {section.blocks.map((block) => (
                <LegalBlockView
                  key={`${section.title}-${block.heading ?? block.paragraphs[0]}`}
                  block={block}
                />
              ))}
            </article>
          ))}
        </div>

        <p className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-hairline pt-8 text-sm text-ink-muted">
          <a
            href={site.emailHref}
            className="transition-colors hover:text-orange-600"
          >
            {site.email}
          </a>
          <a
            href={site.phoneHref}
            className="transition-colors hover:text-orange-600"
          >
            {site.phone}
          </a>
          <Link
            href="/privacy-policy"
            className="transition-colors hover:text-orange-600"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="transition-colors hover:text-orange-600"
          >
            Terms and Conditions
          </Link>
        </p>
      </Container>
    </section>
  );
}

function LegalBlockView({ block }: { block: LegalBlock }) {
  return (
    <div className="space-y-4">
      {block.heading ? (
        <h3 className="text-[0.95rem] font-semibold italic text-ink">
          {block.heading}
        </h3>
      ) : null}
      {block.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{linkifyContact(paragraph)}</p>
      ))}
    </div>
  );
}

function linkifyContact(text: string) {
  const email = site.email;
  const phone = "650 776 0600";
  const phoneAlt = site.phone;

  if (!text.includes(email) && !text.includes(phone) && !text.includes(phoneAlt)) {
    return text;
  }

  const parts: (string | ReactNode)[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const emailIdx = remaining.indexOf(email);
    const phoneIdxA = remaining.indexOf(phone);
    const phoneIdxB = remaining.indexOf(phoneAlt);

    const candidates = [
      emailIdx >= 0 ? { idx: emailIdx, len: email.length, href: site.emailHref, label: email } : null,
      phoneIdxA >= 0
        ? { idx: phoneIdxA, len: phone.length, href: site.phoneHref, label: phone }
        : null,
      phoneIdxB >= 0
        ? { idx: phoneIdxB, len: phoneAlt.length, href: site.phoneHref, label: phoneAlt }
        : null,
    ].filter(Boolean) as {
      idx: number;
      len: number;
      href: string;
      label: string;
    }[];

    if (candidates.length === 0) {
      parts.push(remaining);
      break;
    }

    candidates.sort((a, b) => a.idx - b.idx);
    const match = candidates[0];
    if (match.idx > 0) parts.push(remaining.slice(0, match.idx));
    parts.push(
      <a
        key={`c-${key++}`}
        href={match.href}
        className="font-medium text-ink underline decoration-orange-600/40 underline-offset-2 transition-colors hover:text-orange-600"
      >
        {match.label}
      </a>
    );
    remaining = remaining.slice(match.idx + match.len);
  }

  return <>{parts}</>;
}
