"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { NavOverlay } from "@/components/layout/nav-overlay";
import { Container } from "@/components/layout/container";

export function Header() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-nav)]">
      <div className="border-b border-hairline bg-surface/70 backdrop-blur-md">
        <Container className="flex h-18 items-center justify-between sm:h-20">
          <a href="#top" className="flex items-center gap-2.5">
            <Image
              src="/logo/wordmark-white.png"
              alt="Cameron Clark Fitness"
              width={220}
              height={55}
              priority
              className="h-6 w-auto sm:h-7"
            />
          </a>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="group flex items-center gap-3 text-ink"
          >
            <span className="hidden text-xs font-medium uppercase tracking-[0.2em] sm:block">
              Menu
            </span>
            <span className="relative flex h-9 w-9 items-center justify-center">
              <span className="flex flex-col items-end gap-[5px]">
                <motion.span
                  animate={{ width: 22 }}
                  className="h-[1.5px] w-[22px] bg-ink transition-colors group-hover:bg-copper"
                />
                <motion.span
                  animate={{ width: 14 }}
                  className="h-[1.5px] bg-ink transition-colors group-hover:bg-copper group-hover:w-[22px]"
                />
              </span>
            </span>
          </button>
        </Container>
      </div>

      <NavOverlay open={open} onClose={close} />
    </header>
  );
}
