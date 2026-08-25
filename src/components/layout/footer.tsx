import Image from "next/image";
import { footer, nav, site } from "@/lib/content";
import { Container } from "@/components/layout/container";

/**
 * Footer — black panel modelled on the CCTP / SSTR reference grid.
 * `data-footer-panel` pulls the panel up under FinalCta’s trapezoid clip so
 * black shoulders frame the light section above (see globals.css).
 */

function FooterHeading({ children }: { children: string }) {
  return (
    <p className="text-sm font-semibold tracking-tight text-white">
      <span className="text-white/40">[</span> {children}{" "}
      <span className="text-white/40">]</span>
    </p>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.09 15.9 2 14.5 2 11.6 2 9.5 3.79 9.5 7.15V9.5H7v4h2.5V22h4.5z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.94 8.5H3.75V21h3.19V8.5zM5.34 3A1.84 1.84 0 1 0 5.35 6.68 1.84 1.84 0 0 0 5.34 3zM20.25 21h-3.18v-6.59c0-1.84-.74-2.87-2.16-2.87-1.59 0-2.42 1.07-2.42 2.87V21H9.31V8.5h3.05v1.5c.52-.9 1.68-1.74 3.55-1.74 2.77 0 4.34 1.79 4.34 5.2V21z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-footer-panel className="relative z-0 bg-black text-white">
      <Container className="px-0 sm:px-0 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Brand column */}
          <div className="flex flex-col justify-between gap-10 px-6 py-12 sm:px-10 md:col-span-4 md:py-14 lg:px-16 lg:py-16">
            <a href="#top" className="inline-flex w-fit items-center">
              <Image
                src="/logo/wordmark-white.png"
                alt="Cameron Clark Fitness"
                width={360}
                height={90}
                className="h-12 w-auto sm:h-14 lg:h-16"
              />
            </a>
            <p className="max-w-[18rem] text-sm leading-relaxed text-white/50">
              {footer.tagline}
            </p>
          </div>

          {/* Pages + Contact */}
          <div className="grid grid-cols-2 gap-10 px-6 py-12 sm:px-10 md:col-span-5 md:py-14 lg:gap-14 lg:px-12 lg:py-16 xl:px-14">
            <div>
              <FooterHeading>Pages</FooterHeading>
              <nav aria-label="Footer" className="mt-6 flex flex-col gap-3.5">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <FooterHeading>Contact</FooterHeading>
              <div className="mt-6 flex flex-col gap-3.5 text-sm">
                <a
                  href={site.emailHref}
                  className="break-all text-white/80 transition-colors duration-300 hover:text-white"
                >
                  {site.email}
                </a>
                <a
                  href={site.phoneHref}
                  className="text-white/80 transition-colors duration-300 hover:text-white"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Connect / social — fills the reference’s third column. */}
          <div className="flex flex-col justify-between gap-10 px-6 py-12 sm:px-10 md:col-span-3 md:py-14 lg:px-12 lg:py-16">
            <div>
              <FooterHeading>Connect</FooterHeading>
              <p className="mt-6 max-w-[16rem] text-sm leading-relaxed text-white/50">
                Currently accepting new clients for online and in-person coaching.
              </p>
              <a
                href={site.discoveryCallHref}
                className="mt-5 inline-flex px-2.5 py-1.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-orange-600"
              >
                Book a Discovery Call →
              </a>
            </div>
            <div className="flex gap-2.5">
              {site.social.map((item) => {
                const Icon = SOCIAL_ICONS[item.network];
                return (
                  <a
                    key={item.network}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex size-10 items-center justify-center border border-white/20 text-white transition-colors duration-300 hover:border-orange-600 hover:bg-orange-600"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col gap-3 px-6 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <p>
            © {year} {site.name}
          </p>
          <p className="sm:text-center">{footer.credit}</p>
          <a
            href={site.emailHref}
            className="transition-colors duration-300 hover:text-white sm:text-right"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
