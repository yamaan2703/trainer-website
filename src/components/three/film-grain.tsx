"use client";

import { useRef } from "react";
import { extend, useFrame, type ThreeElement } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { SceneCanvas } from "@/components/three/scene-canvas";

/**
 * Procedural film-grain shader. This is the one place in the site 3D earns
 * its keep: a fullscreen plane that gives the dark hero a faint, moving
 * texture — the kind of thing a flat CSS overlay can't reproduce — without
 * shipping a single texture asset.
 */
const GrainMaterial = shaderMaterial(
  { uTime: 0, uOpacity: 0.05 },
  /* vertex */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* fragment */ `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform float uOpacity;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    void main() {
      float grain = hash(vUv * vec2(1200.0, 800.0) + uTime);
      gl_FragColor = vec4(vec3(grain), uOpacity);
    }
  `
);

extend({ GrainMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    grainMaterial: ThreeElement<typeof GrainMaterial>;
  }
}

function GrainPlane() {
  const ref = useRef<InstanceType<typeof GrainMaterial>>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.uTime += delta * 24;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <grainMaterial ref={ref} transparent depthTest={false} depthWrite={false} />
    </mesh>
  );
}

/** Default export so this can be `next/dynamic`-loaded with `ssr: false`. */
export default function FilmGrain() {
  return (
    <SceneCanvas
      orthographic
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      camera={{ position: [0, 0, 1], zoom: 1 }}
      className="pointer-events-none absolute inset-0"
    >
      <GrainPlane />
    </SceneCanvas>
  );
}
