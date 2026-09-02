"use client";

import { GlobeCanvas } from "@/components/globe/globe-canvas";
import { Reveal } from "@/components/reveal";
import { productLocations } from "@/lib/data";

export function GlobalReach() {
  return (
    <section className="relative overflow-hidden bg-black py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(82,255,150,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
              Global delivery
            </p>
            <h2 className="mt-3 max-w-md font-display text-4xl font-bold leading-tight md:text-5xl">
              Products live where operators actually run
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              Drag to explore. Orange pins mark regions where platforms are in
              production — from audit software in Pakistan to booking in Malta and
              SaaS abroad.
            </p>

            <ul className="mt-8 space-y-3">
              {productLocations.map((loc) => (
                <li
                  key={loc.id}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-orange shadow-[0_0_12px_rgba(255,77,28,0.65)]" />
                  <span>
                    <span className="font-medium text-white">{loc.country}</span>
                    <span className="text-white/45"> — </span>
                    {loc.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(82,255,150,0.12),transparent_62%)] blur-2xl" />
              <GlobeCanvas />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
