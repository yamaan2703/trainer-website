"use client";

import dynamic from "next/dynamic";

/**
 * `FilmGrain` touches WebGL and must never run on the server. Dynamically
 * imported so its (small) three.js chunk never lands in the initial bundle.
 */
export const FilmGrainLoader = dynamic(
  () => import("@/components/three/film-grain"),
  { ssr: false, loading: () => null }
);
