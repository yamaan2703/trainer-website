import Image from "next/image";
import { footer, nav, site } from "@/lib/content";
import { Container } from "@/components/layout/container";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface-2">
      <Container className="flex flex-col gap-12 py-14 sm:py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Image
              src="/logo/wordmark-white.png"
              alt="Cameron Clark Fitness"
              width={220}
              height={55}
              className="h-7 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-ink-muted">{footer.tagline}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:flex sm:gap-10">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-hairline pt-8 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. {footer.credit}.</p>
          <div className="flex gap-6">
            <a href={site.emailHref} className="hover:text-ink">
              {site.email}
            </a>
            <a href={site.phoneHref} className="hover:text-ink">
              {site.phone}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
