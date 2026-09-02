"use client";

import { motion, useReducedMotion } from "motion/react";

const projectTiles = [
  { label: "EngagePro", tone: "from-[#1a2f4a] to-[#2d4a6a]" },
  { label: "Malta", tone: "from-[#2b2340] to-[#453560]" },
  { label: "Legal RAG", tone: "from-[#1f3330] to-[#2f5248]" },
  { label: "IdeaFlow", tone: "from-[#3a2418] to-[#5c3820]" },
  { label: "Sonic", tone: "from-[#242424] to-[#3a3a3a]" },
  { label: "Ship", tone: "from-[#ff4d1c] to-[#e23a12]" },
];

const stackLayers = [
  { label: "Interface", detail: "Next.js · React", y: 0 },
  { label: "Services", detail: "Node · APIs", y: 1 },
  { label: "Data", detail: "PostgreSQL · AI", y: 2 },
];

export function ProjectsDeliveredVisual() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="relative h-[118px] w-[156px] shrink-0 overflow-hidden rounded-2xl border border-black/8 bg-white/85 p-2.5 shadow-[0_18px_44px_rgba(40,30,20,0.12)] backdrop-blur-md"
    >
      <div className="mb-2 flex items-center justify-between px-0.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45">
          Delivered
        </span>
        <motion.span
          className="rounded-full bg-orange/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-orange"
          animate={reduce ? undefined : { opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          12+
        </motion.span>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {projectTiles.map((tile, i) => (
          <motion.div
            key={tile.label}
            className={`relative aspect-square overflow-hidden rounded-md bg-gradient-to-br ${tile.tone}`}
            initial={false}
            animate={
              reduce
                ? undefined
                : {
                    y: [0, -2, 0],
                    opacity: [0.82, 1, 0.82],
                  }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              delay: i * 0.22,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_55%)]" />
            <span className="absolute bottom-1 left-1 font-mono text-[6px] uppercase tracking-wider text-white/70">
              {tile.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="pointer-events-none absolute -right-3 -top-3 size-10 rounded-full bg-orange/15 blur-xl"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function FullStackExperienceVisual() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="relative h-[132px] w-[172px] shrink-0 overflow-hidden rounded-2xl border border-black/8 bg-[#101012] p-2.5 shadow-[0_22px_50px_rgba(0,0,0,0.28)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,77,28,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:14px_14px]" />

      <div className="relative mb-2 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
          Full stack
        </span>
        <motion.span
          className="size-1.5 rounded-full bg-orange"
          animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative space-y-1.5">
        {stackLayers.map((layer, i) => (
          <motion.div
            key={layer.label}
            className="relative overflow-hidden rounded-lg border border-white/8 bg-white/[0.04] px-2 py-1.5"
            animate={
              reduce
                ? undefined
                : {
                    x: [0, i === 1 ? 3 : 0, 0],
                    borderColor: [
                      "rgba(255,255,255,0.08)",
                      "rgba(255,77,28,0.35)",
                      "rgba(255,255,255,0.08)",
                    ],
                  }
            }
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: layer.y * 0.55,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
                {layer.label}
              </p>
              <p className="truncate font-mono text-[7px] text-white/35">{layer.detail}</p>
            </div>
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange/80 to-transparent"
              animate={reduce ? undefined : { width: ["0%", "72%", "0%"] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                delay: layer.y * 0.55,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute right-2 top-[46%] h-8 w-px bg-gradient-to-b from-transparent via-orange/70 to-transparent"
        animate={reduce ? undefined : { opacity: [0.2, 0.9, 0.2], scaleY: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
