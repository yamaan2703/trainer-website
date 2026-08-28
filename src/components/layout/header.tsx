"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavOverlay } from "@/components/layout/nav-overlay";
import { Container } from "@/components/layout/container";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { AppLink } from "@/components/shared/app-link";

/** Inner pages: hairline after this much scroll. Homepage uses the hero instead. */
const BORDER_THRESHOLD = 8;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Written to data attributes rather than React state: this runs on every
  // scroll frame, and re-rendering the header that often would be waste.
  //
  // Homepage: stay fully transparent while the black hero is still under the
  // bar. Inner pages: frost after a few pixels.
  //
  // Subscribes to Lenis, NOT to `window`'s scroll event — Lenis swallows the
  // native event entirely. The window fallback covers the first frames before
  // Lenis mounts.
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const sync = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero-scrub]");
      if (hero) {
        const stillOverHero = hero.getBoundingClientRect().bottom > 72;
        el.dataset.overHero = String(stillOverHero);
        el.dataset.scrolled = String(!stillOverHero);
        return;
      }

      el.dataset.overHero = "false";
      el.dataset.scrolled = String(window.scrollY > BORDER_THRESHOLD);
    };

    sync();

    if (!lenis) {
      window.addEventListener("scroll", sync, { passive: true });
      return () => window.removeEventListener("scroll", sync);
    }
    return lenis.on("scroll", sync);
  }, [lenis, pathname]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-nav)]">
      <div
        ref={barRef}
        data-header-bar
        data-over-hero="false"
        data-scrolled="false"
        data-menu-open={open ? "true" : "false"}
      >
        <Container className="flex h-[var(--header-h)] items-center justify-between gap-4">
          <AppLink
            href="/"
            className="flex shrink-0 items-center"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo/wordmark-white.png"
              alt="Cameron Clark Fitness"
              width={220}
              height={55}
              priority
              data-theme-logo
              className="h-6 w-auto sm:h-7"
            />
          </AppLink>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            className="site-nav-toggle"
          >
            <span aria-hidden className="site-nav-menu">
              <span className="site-nav-menu-lines">
                <span />
                <span />
              </span>
            </span>
          </button>
        </Container>
      </div>

      <NavOverlay open={open} onClose={close} />
    </header>
  );
}
