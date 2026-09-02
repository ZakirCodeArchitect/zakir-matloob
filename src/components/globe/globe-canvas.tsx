"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { GlobeVariant } from "./globe-scene";
import { cn } from "@/lib/utils";

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
  const [dragging, setDragging] = useState(false);

  return (
    <div
      className={cn(
        "group/globe relative h-full w-full",
        dragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
    >
      <GlobeScene
        variant={variant}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
      />
    </div>
  );
}
