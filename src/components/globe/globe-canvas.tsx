"use client";

import dynamic from "next/dynamic";

export const GlobeCanvas = dynamic(
  () => import("./globe-scene").then((mod) => mod.GlobeSceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[320px] items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/35">
          Loading globe…
        </p>
      </div>
    ),
  },
);
