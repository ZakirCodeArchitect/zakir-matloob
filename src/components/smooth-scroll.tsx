"use client";

import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let frame = 0;
    let running = true;
    const raf = (time: number) => {
      if (!running) return;
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else {
        running = true;
        frame = requestAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
