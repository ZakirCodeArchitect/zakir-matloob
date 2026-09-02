"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/data";

export function Philosophy() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 text-white md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
        }}
      />
      <p
        aria-hidden
        className="pointer-events-none absolute right-6 top-8 font-mono text-sm tracking-[0.2em] text-white/35 md:right-10 md:top-12"
      >
        02
      </p>

      <div className="relative mx-auto max-w-[1200px] px-5 text-center md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
          The engineer behind the code
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">
          A short film on my engineering philosophy
        </h2>
      </div>

      <Reveal className="relative mx-auto mt-14 max-w-[1100px] px-5 md:mt-16 md:px-8">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative mx-auto block w-full max-w-[720px]"
        >
          {/* Polaroid frame */}
          <div className="relative mx-auto aspect-[4/5] w-[min(100%,420px)] rotate-[-6deg] rounded-[18px] bg-[#f4f1ec] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.55)] transition duration-500 group-hover:rotate-[-3deg] group-hover:scale-[1.02] md:w-[min(100%,480px)] md:p-4">
            <div className="relative h-[84%] overflow-hidden rounded-[12px] bg-black">
              <Image
                src="/images/philosophy-film-overshoulder.jpg"
                alt={`${site.name} engineering a software product`}
                fill
                className="object-cover object-[center_20%] transition duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 90vw, 480px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
            </div>
            <p className="mt-3 px-1 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-black/45 md:text-[11px]">
              Building in production — {site.year}
            </p>
          </div>

          {/* Overlapping manifesto type */}
          <p
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-[48%] text-center font-display text-[12vw] font-extrabold italic uppercase leading-[0.82] tracking-[-0.045em] text-white mix-blend-difference md:text-[6.5vw] lg:text-[5.5rem]"
          >
            <span className="block">I engineer</span>
            <span className="block">systems from</span>
            <span className="block">the ground up</span>
          </p>

          <span className="absolute bottom-[18%] left-1/2 z-30 flex size-16 -translate-x-1/2 items-center justify-center rounded-full border border-white/35 bg-white/12 text-white backdrop-blur-md transition group-hover:bg-white/20 md:size-20">
            <Play className="ml-1 size-6 fill-current md:size-7" />
          </span>
        </button>
      </Reveal>

      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-[#111] p-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-orange">
              Philosophy
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold">
              Software should speak the language of the business.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              I build for the rooms where an audit trail, a plant schedule, or a
              court citation actually matters. AI is a material. SAP is a grammar.
              The web is the surface people touch. The work is making those three
              agree — without theatre, and without leaving operators stranded when
              the demo ends.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-8 rounded-full bg-white px-5 py-2 text-sm font-medium text-ink"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
