"use client";

import dynamic from "next/dynamic";
import type { GlobeVariant } from "./globe-scene";

const GlobeScene = dynamic(
  () => import("./globe-scene").then((mod) => mod.GlobeSceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[280px] items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/35">
          Loading globe…
        </p>
      </div>
    ),
  },
);

export function GlobeCanvas({
  variant = "light",
  className,
}: {
  variant?: GlobeVariant;
  className?: string;
}) {
  return (
    <div className={className ?? "h-full w-full"}>
      <GlobeScene variant={variant} />
    </div>
  );
}
