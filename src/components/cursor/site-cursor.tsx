"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/animations/gsap";

type CursorState = "default" | "hover" | "media" | "card" | "native";

const INTERACTIVE =
  "a, button, [role='button'], summary, label, .btn-cta, [data-cursor='hover']";
const NATIVE = "input, textarea, select, [contenteditable='true']";
const MEDIA = "img, picture, video, canvas, [data-cursor='media']";
const CARD = "article, figure, [data-cursor='card']";
const ACCENT = "[class*='bg-orange-600'], [data-cursor-accent]";
const CURSOR_ROOT = ".site-cursor";

const RING_SCALE: Record<CursorState, number> = {
  default: 1,
  hover: 1.72,
  media: 2.4,
  card: 1.38,
  native: 1,
};

const DOT_SCALE: Record<CursorState, number> = {
  default: 1,
  hover: 0.32,
  media: 0,
  card: 0.5,
  native: 1,
};

const MAGNET = 0.2;
const MAGNET_MAX = 12;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function stackAt(x: number, y: number) {
  return document.elementsFromPoint(x, y).filter((el) => !el.closest(CURSOR_ROOT));
}

function firstClosest(stack: Element[], selector: string) {
  for (const el of stack) {
    const match = el.closest(selector);
    if (match instanceof Element) return match;
  }
  return null;
}

function readCursorContext(x: number, y: number) {
  const stack = stackAt(x, y);
  const native = firstClosest(stack, NATIVE);
  const interactive = firstClosest(stack, INTERACTIVE);
  const media = firstClosest(stack, MEDIA);
  const card = firstClosest(stack, CARD);
  const accent = Boolean(firstClosest(stack, ACCENT));

  let state: CursorState = "default";
  if (native) state = "native";
  else if (interactive) state = "hover";
  else if (media && media.getBoundingClientRect().width >= 72) state = "media";
  else if (card) state = "card";

  return { state, magnet: interactive, accent };
}

/**
 * Dual-piece custom cursor: orange core + trailing hairline ring.
 * GSAP `quickTo` drives position (no React re-renders on pointermove).
 * Touch / coarse pointers and reduced-motion keep the native cursor.
 */
export function SiteCursor() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const syncRef = useRef<(x: number, y: number) => void>(() => undefined);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return;

    const html = document.documentElement;
    html.classList.add("has-custom-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -80, y: -80 });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.16, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.16, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    let state: CursorState = "default";
    let pressed = false;
    let visible = false;

    function applyState(next: CursorState) {
      if (next === state) return;
      state = next;
      root.dataset.state = next;

      const press = pressed && next !== "native" ? 0.86 : 1;
      gsap.to(ring, {
        scale: RING_SCALE[next] * press,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: DOT_SCALE[next] * press,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(root, {
        opacity: next === "native" ? 0 : 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    function applyPress() {
      const press = pressed && state !== "native" ? 0.86 : 1;
      gsap.to(ring, {
        scale: RING_SCALE[state] * press,
        duration: 0.22,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: DOT_SCALE[state] * press,
        duration: 0.22,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    function moveTo(x: number, y: number) {
      pointerRef.current = { x, y };
      const { state: next, magnet, accent } = readCursorContext(x, y);

      let mx = 0;
      let my = 0;
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        mx = clamp((rect.left + rect.width / 2 - x) * MAGNET, -MAGNET_MAX, MAGNET_MAX);
        my = clamp((rect.top + rect.height / 2 - y) * MAGNET, -MAGNET_MAX, MAGNET_MAX);
      }

      xDot(x);
      yDot(y);
      xRing(x + mx);
      yRing(y + my);

      applyState(next);
      root.dataset.accent = accent ? "true" : "false";
      return next;
    }

    syncRef.current = moveTo;

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const next = moveTo(event.clientX, event.clientY);
      if (!visible) {
        visible = true;
        if (next !== "native") {
          gsap.to(root, { opacity: 1, duration: 0.28, ease: "power2.out" });
        }
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      pressed = true;
      applyPress();
    }

    function onPointerUp() {
      pressed = false;
      applyPress();
    }

    function onPointerLeave() {
      visible = false;
      gsap.to(root, { opacity: 0, duration: 0.2, ease: "power2.out" });
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      syncRef.current = () => undefined;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", onPointerLeave);
      html.classList.remove("has-custom-cursor");
      gsap.killTweensOf([root, dot, ring]);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const { x, y } = pointerRef.current;
    if (!x && !y) return;
    syncRef.current(x, y);
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className="site-cursor"
      data-state="default"
      data-accent="false"
      aria-hidden
    >
      <div ref={ringRef} className="site-cursor__ring" />
      <div ref={dotRef} className="site-cursor__dot" />
    </div>
  );
}
