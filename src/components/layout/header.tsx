"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NavOverlay } from "@/components/layout/nav-overlay";
import { Container } from "@/components/layout/container";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { nav, site } from "@/lib/content";
import { isNavActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Distance (px) scrolled before the header grows its hairline. */
const BORDER_THRESHOLD = 8;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Written straight to a data attribute rather than React state: this runs on
  // every scroll frame, and re-rendering the header that often would be waste.
  //
  // Subscribes to Lenis, NOT to `window`'s scroll event — Lenis swallows the
  // native event entirely, so a plain listener here never runs. The window
  // fallback only covers the first frames before Lenis mounts.
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const sync = () => {
      el.dataset.scrolled = String(window.scrollY > BORDER_THRESHOLD);
    };

    sync();

    if (!lenis) {
      window.addEventListener("scroll", sync, { passive: true });
      return () => window.removeEventListener("scroll", sync);
    }
    return lenis.on("scroll", sync);
  }, [lenis]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-nav)]">
      <div
        ref={barRef}
        data-header-bar
        data-scrolled="false"
        className="bg-transparent"
      >
        <Container className="flex h-[var(--header-h)] items-center justify-between gap-6 sm:gap-8">
          <a href="/" className="relative z-10 flex shrink-0 items-center">
            <Image
              src="/logo/wordmark-white.png"
              alt="Cameron Clark Fitness"
              width={220}
              height={55}
              priority
              data-theme-logo
              className="h-6 w-auto sm:h-7"
            />
          </a>

          <div className="relative z-10 flex shrink-0 items-center gap-1 sm:gap-2">
            <nav
              aria-label="Primary"
              className="mr-1 hidden items-center lg:flex xl:mr-2"
            >
              {nav.map((item) => {
                const active = isNavActive({ href: item.href, pathname });

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    data-active={active ? "true" : undefined}
                    className={cn(
                      "px-3 py-1.5 text-[0.8125rem] font-medium tracking-[0.02em] transition-colors hover:bg-ink/10 xl:px-3.5",
                      active
                        ? "text-orange-600 hover:text-orange-600"
                        : "text-ink/80 hover:text-ink"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <a
              href={site.discoveryCallHref}
              className="btn-cta px-3.5 py-2 text-[0.6875rem] sm:px-5 sm:py-2.5 sm:text-xs"
            >
              Discovery Call
            </a>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="group ml-1 flex items-center gap-3 text-ink lg:hidden"
            >
              <span className="hidden text-xs font-medium uppercase tracking-[0.2em] sm:block">
                Menu
              </span>
              <span className="relative flex h-9 w-9 items-center justify-center">
                <span className="flex flex-col items-end gap-[5px]">
                  <motion.span
                    animate={{ width: 22 }}
                    className="h-[1.5px] w-[22px] bg-ink transition-colors group-hover:bg-orange-600"
                  />
                  <motion.span
                    animate={{ width: 14 }}
                    className="h-[1.5px] bg-ink transition-colors group-hover:w-[22px] group-hover:bg-orange-600"
                  />
                </span>
              </span>
            </button>
          </div>
        </Container>
      </div>

      <NavOverlay open={open} onClose={close} />
    </header>
  );
}
