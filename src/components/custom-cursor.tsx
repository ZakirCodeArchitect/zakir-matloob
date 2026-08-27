"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [data-cursor]");
      setHovering(Boolean(interactive));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        className="cursor-dot hidden md:block"
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className={`cursor-ring hidden md:block ${hovering ? "hovering" : ""}`}
        style={{ left: pos.x, top: pos.y }}
      />
    </>
  );
}
