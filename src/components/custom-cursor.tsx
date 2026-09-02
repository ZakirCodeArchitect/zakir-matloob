"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, [role='button'], [data-cursor], label, summary, .site-cursor-hover";
const TEXT = "input, textarea, select, [contenteditable='true']";

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const follower = followerRef.current;
    if (!root || !follower) return;

    // CSS cursor assets always apply via this class. The lagging ring
    // activates on first mouse move so remote/coarse previews still work.
    document.documentElement.classList.add("has-custom-cursor");
    root.classList.add("is-active");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const tick = () => {
      const ease = reduce ? 1 : 0.22;
      current.x += (pos.x - current.x) * ease;
      current.y += (pos.y - current.y) * ease;
      follower.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const setMode = (mode: "default" | "hover" | "text") => {
      root.dataset.mode = mode;
      document.documentElement.dataset.cursor = mode;
    };

    const onMove = (event: MouseEvent) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      if (!visible) {
        visible = true;
        current.x = event.clientX;
        current.y = event.clientY;
        root.classList.add("is-visible");
      }

      const target = event.target as HTMLElement | null;
      if (!target) {
        setMode("default");
        return;
      }
      if (target.closest(TEXT)) {
        setMode("text");
        return;
      }
      if (target.closest(INTERACTIVE)) {
        setMode("hover");
        return;
      }
      setMode("default");
    };

    const onDown = () => root.classList.add("is-down");
    const onUp = () => root.classList.remove("is-down");
    const onOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        visible = false;
        root.classList.remove("is-visible", "is-down");
        setMode("default");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseout", onOut);
    setMode("default");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("has-custom-cursor");
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  return (
    <div ref={rootRef} className="site-cursor" aria-hidden data-mode="default">
      <div ref={followerRef} className="site-cursor__follower">
        <span className="site-cursor__ring" />
        <span className="site-cursor__core" />
        <span className="site-cursor__label" data-label-hover>
          VIEW
        </span>
        <span className="site-cursor__label" data-label-text>
          TYPE
        </span>
      </div>
    </div>
  );
}
