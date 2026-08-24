"use client";

import { Suspense, type ComponentProps, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";

type SceneCanvasProps = Omit<ComponentProps<typeof Canvas>, "children"> & {
  children: ReactNode;
  /** Rendered while the R3F scene's own Suspense boundary is pending. */
  fallback?: ReactNode;
};

/**
 * Baseline <Canvas> wrapper: sane defaults for a marketing-site hero/section
 * (capped DPR for perf, no antialias fighting Tailwind's own layout, a
 * Suspense boundary for async assets, and adaptive DPR via
 * PerformanceMonitor so low-end devices don't tank the frame rate).
 *
 * Always a client component — anything importing three.js/R3F must live
 * behind "use client", and should generally be lazy-loaded with
 * `next/dynamic({ ssr: false })` from the server component that renders it.
 */
export function SceneCanvas({
  children,
  fallback = null,
  dpr = [1, 1.5],
  gl,
  camera,
  ...props
}: SceneCanvasProps) {
  return (
    <Canvas
      dpr={dpr}
      gl={gl ?? { antialias: true, alpha: true }}
      camera={camera ?? { fov: 45, position: [0, 0, 5] }}
      {...props}
    >
      <PerformanceMonitor>
        <Suspense fallback={fallback}>{children}</Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
