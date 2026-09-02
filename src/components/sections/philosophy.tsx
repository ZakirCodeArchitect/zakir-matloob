"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/data";

export function Philosophy() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-black pb-24 text-white md:pb-32">
      <div className="mx-auto max-w-[1200px] px-5 text-center md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
          The engineer behind the code
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">
          A short film on my engineering philosophy
        </h2>
      </div>
      <Reveal className="mx-auto mt-12 max-w-[1200px] px-5 md:px-8">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full overflow-hidden rounded-[28px]"
        >
          <div className="relative aspect-[16/8] min-h-[240px]">
            <Image
              src="/images/philosophy-film-zakir.jpg"
              alt={`${site.name} — engineering philosophy film still`}
              fill
              className="object-cover object-[center_18%] transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-black/25" />
            <span className="absolute inset-0 m-auto flex size-20 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md">
              <Play className="ml-1 size-7 fill-current" />
            </span>
          </div>
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
