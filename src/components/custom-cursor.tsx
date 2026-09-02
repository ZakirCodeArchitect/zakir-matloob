"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], [data-cursor], label, summary, .site-cursor-hover";
const TEXT = "input, textarea, [contenteditable='true']";

function canUseCustomCursor() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(hover: hover)").matches
  );
}

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pointer = pointerRef.current;
    const follower = followerRef.current;
    if (!root || !pointer || !follower) return;
    if (!canUseCustomCursor()) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerTime = reduce ? 0.01 : 0.16;
    const followTime = reduce ? 0.01 : 0.55;

    const movePointerX = gsap.quickTo(pointer, "x", {
      duration: pointerTime,
      ease: "power3.out",
    });
    const movePointerY = gsap.quickTo(pointer, "y", {
      duration: pointerTime,
      ease: "power3.out",
    });
    const moveFollowX = gsap.quickTo(follower, "x", {
      duration: followTime,
      ease: "power3.out",
    });
    const moveFollowY = gsap.quickTo(follower, "y", {
      duration: followTime,
      ease: "power3.out",
    });

    let armed = false;

    const arm = (x: number, y: number) => {
      if (armed) return;
      armed = true;
      gsap.set(pointer, { x, y });
      gsap.set(follower, { x, y });
      document.documentElement.classList.add("has-custom-cursor");
      root.classList.add("is-visible");
    };

    const readTarget = (event: Event) => {
      const node = event.target as HTMLElement | null;
      if (!node) return { hover: false, text: false };
      const text = Boolean(node.closest(TEXT));
      const hover = !text && Boolean(node.closest(INTERACTIVE));
      return { hover, text };
    };

    const applyMode = (hover: boolean, text: boolean) => {
      root.classList.toggle("is-hover", hover);
      root.classList.toggle("is-text", text);
    };

    const onMove = (event: MouseEvent) => {
      arm(event.clientX, event.clientY);
      movePointerX(event.clientX);
      movePointerY(event.clientY);
      moveFollowX(event.clientX);
      moveFollowY(event.clientY);
      const mode = readTarget(event);
      applyMode(mode.hover, mode.text);
    };

    const onDown = () => root.classList.add("is-down");
    const onUp = () => root.classList.remove("is-down");
    const onLeave = () => {
      root.classList.remove("is-visible", "is-hover", "is-text", "is-down");
    };
    const onOut = (event: MouseEvent) => {
      if (!event.relatedTarget) onLeave();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={rootRef} className="site-cursor" aria-hidden>
      <div ref={followerRef} className="site-cursor__follower">
        <span className="site-cursor__plus" />
        <span className="site-cursor__frame" />
      </div>
      <div ref={pointerRef} className="site-cursor__pointer">
        <OrigamiPointer />
        <IBeam />
      </div>
    </div>
  );
}

function OrigamiPointer() {
  return (
    <svg
      className="site-cursor__mark"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.2 1.4v22.6l6.6-5.9 4.7 10.8 4.6-2-5-11.4H27.8L2.2 1.4Z"
        fill="#F7F4EF"
      />
      <path d="M4 4.1 23.4 15.2H12.2L4 4.1Z" fill="#6A6A6A" />
      <path d="M4 4.1v17.4l5.4-4.8 3-6.8L4 4.1Z" fill="#2A2A2A" />
      <path d="M4 4.1 12.2 15.2" stroke="#FF4D1C" strokeWidth="0.85" />
      <path d="M9.4 16.7 12.2 15.2" stroke="#1A1A1A" strokeWidth="0.6" />
    </svg>
  );
}

function IBeam() {
  return (
    <svg
      className="site-cursor__ibeam"
      width="18"
      height="24"
      viewBox="0 0 18 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 2h12M3 22h12M9 2v20"
        stroke="#F7F4EF"
        strokeWidth="4"
        strokeLinecap="square"
      />
      <path
        d="M3 2h12M3 22h12M9 2v20"
        stroke="#2A2A2A"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}
