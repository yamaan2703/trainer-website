"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/animations/gsap";

/**
 * Framer-style cursor scrub for the hero figure.
 *
 * The figure clip was exported to `public/hero-sequence` as 121 WebP frames.
 * Moving the cursor left -> right across the hero maps to frame 0 -> last;
 * moving back scrubs in reverse. The mapped index is eased with a GSAP
 * `quickTo` so playback carries inertia instead of snapping, and the canvas is
 * repainted from the GSAP ticker only when the rounded frame actually changes.
 *
 * The canvas is layered over the existing static hero image and sized to the
 * same box, so nothing about the hero layout changes. Frames are only fetched
 * on fine-pointer devices with motion enabled — touch, coarse pointer and
 * `prefers-reduced-motion` keep the original static image and download
 * nothing extra.
 */

const FRAME_COUNT = 121;
const FRAME_SRC = (i: number) =>
  `/hero-sequence/frame-${String(i).padStart(3, "0")}.webp`;

/** Every Nth frame is fetched first so scrubbing can start almost immediately. */
const COARSE_STEP = 6;
const MAX_DPR = 2;

interface HeroFigureSequenceProps {
  /**
   * Ancestor the cursor is tracked over — the hero section, not the page.
   * Resolved from the DOM rather than a ref, because a parent's ref is not
   * attached yet when this child's layout effect runs.
   */
  scrubAreaSelector?: string;
  className?: string;
}

export function HeroFigureSequence({
  scrubAreaSelector = "[data-hero-scrub]",
  className,
}: HeroFigureSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGsap(
    canvasRef,
    () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const area = canvas.closest<HTMLElement>(scrubAreaSelector);
      if (!area) return;

      const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (!fine.matches || reduced.matches) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const frames: Array<HTMLImageElement | null> =
        new Array(FRAME_COUNT).fill(null);

      const state = { index: (FRAME_COUNT - 1) / 2 };
      let painted = -1;
      let dirty = true;
      let disposed = false;
      let revealed = false;

      /* ---------------------------------------------------------------- *
       * Painting.
       * ---------------------------------------------------------------- */

      /** Nearest already-decoded frame, so a gap never paints a blank. */
      const nearest = (i: number) => {
        if (frames[i]) return frames[i];
        for (let d = 1; d < FRAME_COUNT; d++) {
          if (frames[i - d]) return frames[i - d];
          if (frames[i + d]) return frames[i + d];
        }
        return null;
      };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        const w = Math.round(canvas.clientWidth * dpr);
        const h = Math.round(canvas.clientHeight * dpr);
        if (!w || !h || (w === canvas.width && h === canvas.height)) return;
        canvas.width = w;
        canvas.height = h;
        dirty = true;
      };

      const paint = (frame: HTMLImageElement) => {
        const { width: cw, height: ch } = canvas;
        ctx.clearRect(0, 0, cw, ch);
        // Fit by height, centred horizontally — matches how the static hero
        // image fills the same box, so the figure keeps its size and anchor.
        const w = frame.naturalWidth * (ch / frame.naturalHeight);
        ctx.drawImage(frame, (cw - w) / 2, 0, w, ch);
      };

      const render = () => {
        const i = Math.round(gsap.utils.clamp(0, FRAME_COUNT - 1, state.index));
        if (!dirty && i === painted) return;
        const frame = nearest(i);
        if (!frame) return;
        resize();
        paint(frame);
        painted = i;
        dirty = false;
      };

      const reveal = () => {
        if (revealed || disposed) return;
        revealed = true;
        resize();
        dirty = true;
        render();
        gsap.to(canvas, { opacity: 1, duration: 0.6, ease: "power2.out" });
        const fallback = area.querySelector<HTMLElement>(
          "[data-hero-figure-static]"
        );
        if (fallback) {
          gsap.to(fallback, { opacity: 0, duration: 0.6, ease: "power2.out" });
        }
      };

      /* ---------------------------------------------------------------- *
       * Loading — coarse pass first, then the in-between frames.
       * ---------------------------------------------------------------- */

      const loadFrame = (i: number, priority: "high" | "low") =>
        new Promise<void>((resolve) => {
          if (disposed || frames[i]) return resolve();
          const img = new Image();
          img.decoding = "async";
          img.fetchPriority = priority;
          img.onload = () => {
            if (!disposed) {
              frames[i] = img;
              dirty = true;
            }
            resolve();
          };
          img.onerror = () => resolve();
          img.src = FRAME_SRC(i);
        });

      const loadBatch = (
        indices: number[],
        concurrency: number,
        priority: "high" | "low"
      ) => {
        let cursor = 0;
        const worker = async () => {
          while (!disposed && cursor < indices.length) {
            await loadFrame(indices[cursor++], priority);
          }
        };
        return Promise.all(Array.from({ length: concurrency }, worker));
      };

      const coarse: number[] = [];
      for (let i = 0; i < FRAME_COUNT; i += COARSE_STEP) coarse.push(i);
      if (coarse[coarse.length - 1] !== FRAME_COUNT - 1) {
        coarse.push(FRAME_COUNT - 1);
      }
      const coarseSet = new Set(coarse);
      const rest = Array.from({ length: FRAME_COUNT }, (_, i) => i).filter(
        (i) => !coarseSet.has(i)
      );

      void (async () => {
        await loadBatch(coarse, 8, "high");
        if (disposed) return;
        reveal();
        await loadBatch(rest, 6, "low");
      })();

      /* ---------------------------------------------------------------- *
       * Cursor scrub.
       * ---------------------------------------------------------------- */

      const scrubTo = gsap.quickTo(state, "index", {
        duration: 0.85,
        ease: "power3.out",
      });

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const rect = area.getBoundingClientRect();
        if (!rect.width) return;
        const progress = gsap.utils.clamp(
          0,
          1,
          (event.clientX - rect.left) / rect.width
        );
        scrubTo(progress * (FRAME_COUNT - 1));
      };

      const markDirty = () => {
        dirty = true;
      };

      area.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("resize", markDirty);
      gsap.ticker.add(render);

      const observer = new ResizeObserver(markDirty);
      observer.observe(canvas);

      return () => {
        disposed = true;
        area.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", markDirty);
        gsap.ticker.remove(render);
        observer.disconnect();
      };
    },
    [scrubAreaSelector]
  );

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ opacity: 0 }}
    />
  );
}
