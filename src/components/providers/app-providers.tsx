"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { ThemeTransition } from "@/components/providers/theme-transition";
import { SiteCursor } from "@/components/cursor/site-cursor";

/**
 * Single composition point for every client-side provider the app needs
 * (smooth scroll, motion defaults, ...). The root layout stays a server
 * component and only renders this one client boundary.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <MotionProvider>
        <ThemeTransition />
        <SiteCursor />
        {children}
      </MotionProvider>
    </SmoothScrollProvider>
  );
}
