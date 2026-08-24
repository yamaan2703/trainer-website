"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "@/lib/animations/gsap";

/** `useLayoutEffect` on the client, `useEffect` on the server (avoids the SSR warning). */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type GsapCallback = (
  context: gsap.Context,
  contextSafe: gsap.ContextSafeFunc
) => void | (() => void);

/**
 * Scopes every GSAP tween/timeline/ScrollTrigger created inside `callback` to
 * `scope`, and reverts all of it automatically on unmount or dependency
 * change. This is the one hook components should use to touch GSAP — it
 * keeps animations (and their ScrollTriggers) from leaking across re-renders
 * or route changes.
 *
 * @example
 * const root = useRef<HTMLDivElement>(null);
 * useGsap(root, () => {
 *   gsap.from(".card", { opacity: 0, y: 40, stagger: 0.1 });
 * }, [dependency]);
 */
export function useGsap(
  scope: RefObject<Element | null>,
  callback: GsapCallback,
  deps: ReadonlyArray<unknown> = []
) {
  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return;

    let cleanup: void | (() => void);

    const ctx = gsap.context((context, contextSafe) => {
      cleanup = callback(context, contextSafe!);
    }, scope.current);

    return () => {
      cleanup?.();
      ctx.revert();
    };
  }, deps);
}
