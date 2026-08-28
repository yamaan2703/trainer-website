"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav, site } from "@/lib/content";
import { isNavActive } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/shared/app-link";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { EASE_OUT } from "@/lib/animations/motion-variants";

interface NavOverlayProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

const curtainTransition = (reduce: boolean) => ({
  duration: reduce ? 0.01 : 0.5,
  ease: EASE_OUT,
});

const panelTransition = (reduce: boolean) => ({
  duration: reduce ? 0.01 : 0.62,
  delay: reduce ? 0 : 0.1,
  ease: EASE_OUT,
});

export function NavOverlay({ open, onClose }: NavOverlayProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const focused = document.activeElement;

      if (e.shiftKey && focused === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && focused === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open, onClose, lenis]);

  const clipHidden = reduce ? undefined : "inset(0 0 100% 0)";
  const clipShown = reduce ? undefined : "inset(0 0 0% 0)";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="nav-overlay"
          className="fixed inset-0 z-[var(--z-nav-overlay)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: reduce ? 0.01 : 0.72 }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-orange-600"
            initial={reduce ? { opacity: 0 } : { clipPath: clipHidden }}
            animate={reduce ? { opacity: 1 } : { clipPath: clipShown }}
            exit={
              reduce
                ? { opacity: 0 }
                : { clipPath: clipHidden, transition: { duration: 0.42, delay: 0.12, ease: EASE_OUT } }
            }
            transition={curtainTransition(!!reduce)}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            data-lenis-prevent
            className="site-menu-panel absolute inset-0 flex flex-col overflow-y-auto overscroll-contain bg-black text-white"
            initial={reduce ? { opacity: 0 } : { clipPath: clipHidden }}
            animate={reduce ? { opacity: 1 } : { clipPath: clipShown }}
            exit={
              reduce
                ? { opacity: 0, transition: { duration: 0.2 } }
                : { clipPath: clipHidden, transition: { duration: 0.5, ease: EASE_OUT } }
            }
            transition={panelTransition(!!reduce)}
          >
            <div className="container-edit flex h-[var(--header-h)] shrink-0 items-center justify-between gap-4">
              <AppLink
                href="/"
                onClick={onClose}
                className="flex shrink-0 items-center"
              >
                <Image
                  src="/logo/wordmark-white.png"
                  alt="Cameron Clark Fitness"
                  width={220}
                  height={55}
                  className="h-6 w-auto sm:h-7"
                />
              </AppLink>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="site-nav-toggle site-nav-toggle-on-dark"
              >
                <span aria-hidden className="site-nav-menu">
                  <span className="site-nav-close-mark" />
                </span>
              </button>
            </div>

            <div className="container-edit flex flex-1 flex-col pb-10 pt-4 sm:pb-12">
              <nav className="flex flex-1 flex-col justify-center">
                {nav.map((item, i) => {
                  const active = isNavActive({ href: item.href, pathname });

                  return (
                    <div
                      key={item.href}
                      className="site-menu-item"
                    >
                      <span className="overflow-hidden">
                        <motion.span
                          className="block font-mono text-[0.65rem] tracking-[0.14em] text-orange-600 sm:text-xs"
                          initial={{ opacity: 0, x: reduce ? 0 : -18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: reduce ? 0 : 0.34 + i * 0.07,
                            duration: 0.5,
                            ease: EASE_OUT,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </motion.span>
                      </span>

                      <div className="min-w-0 flex-1 overflow-hidden">
                        <motion.div
                          initial={{ y: reduce ? 0 : "110%" }}
                          animate={{ y: 0 }}
                          transition={{
                            delay: reduce ? 0 : 0.32 + i * 0.07,
                            duration: 0.72,
                            ease: EASE_OUT,
                          }}
                        >
                          <AppLink
                            href={item.href}
                            onClick={onClose}
                            aria-current={active ? "page" : undefined}
                            data-active={active ? "true" : undefined}
                            className={cn("site-menu-link", active && "is-active")}
                          >
                            <span className="site-menu-link-label">
                              <span>{item.label}</span>
                              <span aria-hidden>{item.label}</span>
                            </span>
                          </AppLink>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduce ? 0 : 0.62,
                  duration: 0.5,
                  ease: EASE_OUT,
                }}
                className="mt-10 flex flex-col gap-8 border-t border-white/12 pt-8 sm:mt-12 sm:flex-row sm:items-end sm:justify-between"
              >
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/45">
                    Get in touch
                  </p>
                  <a
                    href={site.emailHref}
                    className="mt-2 block text-sm font-medium text-white transition-colors duration-300 hover:text-orange-600"
                  >
                    {site.email}
                  </a>
                  <a
                    href={site.phoneHref}
                    className="mt-1 block text-sm font-medium text-white transition-colors duration-300 hover:text-orange-600"
                  >
                    {site.phone}
                  </a>
                </div>
                <AppLink
                  href={site.discoveryCallHref}
                  onClick={onClose}
                  className="btn-cta w-fit px-5 py-2.5 text-xs sm:px-7 sm:py-3 sm:text-sm"
                >
                  Discovery Call
                </AppLink>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
