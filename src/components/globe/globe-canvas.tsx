"use client";

import dynamic from "next/dynamic";
import { Minus, Plus } from "lucide-react";
import { useCallback, useState } from "react";
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

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 1.45;
const ZOOM_STEP = 0.1;

export function GlobeCanvas({
  variant = "light",
  className,
}: {
  variant?: GlobeVariant;
  className?: string;
}) {
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);

  const zoomIn = useCallback(() => {
    setZoom((current) =>
      Math.min(MAX_ZOOM, Number((current + ZOOM_STEP).toFixed(2))),
    );
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((current) =>
      Math.max(MIN_ZOOM, Number((current - ZOOM_STEP).toFixed(2))),
    );
  }, []);

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
        zoom={zoom}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
      />

      <div className="pointer-events-none absolute right-3 top-3 z-10 flex flex-col gap-1">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={zoomIn}
          disabled={zoom >= MAX_ZOOM}
          className="pointer-events-auto flex size-8 items-center justify-center rounded-full border border-black/8 bg-white/90 text-ink shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="size-3.5" />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={zoomOut}
          disabled={zoom <= MIN_ZOOM}
          className="pointer-events-auto flex size-8 items-center justify-center rounded-full border border-black/8 bg-white/90 text-ink shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
