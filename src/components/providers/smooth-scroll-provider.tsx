"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

const LenisContext = createContext<Lenis | null>(null);

/** Access the shared Lenis instance, e.g. to call `lenis.scrollTo(...)`. */
export function useLenis() {
  return useContext(LenisContext);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
  /** Forwarded to the Lenis constructor. See https://lenis.darkroom.engineering/ */
  options?: ConstructorParameters<typeof Lenis>[0];
}

/**
 * Wires Lenis into GSAP's own ticker so there is a single requestAnimationFrame
 * loop driving both smooth scroll and ScrollTrigger, instead of two competing
 * rAF loops (which is what causes jitter/desync when mixing Lenis and GSAP).
 */
export function SmoothScrollProvider({
  children,
  options,
}: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (!lenis) return;
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  useEffect(() => {
    // Lenis is created once for the app's lifetime; changes to `options`
    // after the first mount are intentionally not applied (a smooth-scroll
    // instance is meant to be reconfigured via `lenis.on/off`, not torn down
    // and rebuilt on every prop change further up the tree).
    const instance = new Lenis({
      autoRaf: false,
      anchors: true,
      ...options,
    });

    // Lenis touches `window` at construction time, so it can only be built
    // client-side inside this effect — there's no render-time value to
    // compute instead. Exposing it via context necessarily costs one extra
    // render (null -> instance) on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    // In its default mode (no `wrapper`/`content` options) Lenis smooths
    // scrolling by updating the real `window` scroll position every frame,
    // it does not transform-translate a wrapper. That means ScrollTrigger's
    // default scroller (the window) already reads the correct, smoothed
    // value on its own — no scrollerProxy override needed. We only need to
    // tell ScrollTrigger to re-measure after every Lenis tick.
    instance.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      // gsap.ticker reports elapsed time in seconds; Lenis expects ms.
      instance.raf(time * 1000);
    };
    gsap.ticker.add(onTick);

    const refreshListener = () => instance.resize();
    ScrollTrigger.addEventListener("refresh", refreshListener);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      ScrollTrigger.removeEventListener("refresh", refreshListener);
      instance.destroy();
      setLenis(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deliberately mount-only, see comment above
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
