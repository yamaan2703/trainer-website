"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/content";
import { isNavActive } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/shared/app-link";
import { EASE_OUT } from "@/lib/animations/motion-variants";

interface NavOverlayProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

export function NavOverlay({ open, onClose }: NavOverlayProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

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
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[var(--z-nav-overlay)] flex flex-col bg-orange-600 text-lime-ink"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="container-edit flex flex-1 flex-col pt-28 pb-10 sm:pt-32">
            <nav className="flex flex-1 flex-col justify-center gap-1 sm:gap-2">
              {nav.map((item, i) => {
                const active = isNavActive({ href: item.href, pathname });

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.05,
                      duration: 0.5,
                      ease: EASE_OUT,
                    }}
                    className="flex items-baseline gap-4 border-b border-lime-ink/15 py-3 sm:py-4"
                  >
                    <span
                      className={cn(
                        "font-mono text-xs",
                        active ? "text-cream" : "text-lime-ink/50"
                      )}
                    >
                      0{i + 1}
                    </span>
                    <AppLink
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      data-active={active ? "true" : undefined}
                      className={cn(
                        "group text-[13vw] leading-[0.95] font-black uppercase tracking-tight transition-colors sm:text-[6vw]",
                        active ? "text-cream" : "hover:text-cream"
                      )}
                    >
                      {item.label}
                    </AppLink>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10 flex flex-col gap-8 border-t border-lime-ink/15 pt-8 text-sm sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-lime-ink/60">
                  Get in touch
                </p>
                <a
                  href={site.emailHref}
                  className="mt-1 block font-medium hover:underline"
                >
                  {site.email}
                </a>
                <a
                  href={site.phoneHref}
                  className="mt-1 block font-medium hover:underline"
                >
                  {site.phone}
                </a>
              </div>
              <AppLink
                href={site.discoveryCallHref}
                onClick={onClose}
                className="inline-flex w-fit items-center bg-lime-ink px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-cream transition-colors duration-300 hover:bg-white hover:text-lime-ink"
              >
                Discovery Call
              </AppLink>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
