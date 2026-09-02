"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { videoTestimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ImpactCarousel() {
  const [index, setIndex] = useState(1);
  const prev = () => setIndex((i) => (i === 0 ? videoTestimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % videoTestimonials.length);
  const active = videoTestimonials[index];

  return (
    <section className="overflow-hidden bg-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
              Impact
            </p>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-bold md:text-6xl">
              Engineering impact &amp; client feedback
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="flex size-11 items-center justify-center rounded-xl border border-white/20"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="flex size-11 items-center justify-center rounded-xl border border-white/20"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-14 flex items-end gap-4 overflow-x-auto pb-4 md:gap-6">
          {videoTestimonials.map((person, i) => {
            const focused = i === index;
            return (
              <button
                key={person.name}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "relative shrink-0 overflow-hidden rounded-[28px] transition-all duration-500",
                  focused ? "h-[460px] w-[280px] md:h-[520px] md:w-[320px]" : "h-[380px] w-[220px] grayscale",
                )}
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="(max-width: 768px) 280px, 320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                  <Play className="ml-0.5 size-5 fill-white text-white" />
                </span>
                <div className="absolute bottom-5 left-5 text-left">
                  <p className="font-display text-xl font-bold">{person.name}</p>
                  <p className="text-sm text-white/70">{person.title}</p>
                </div>
              </button>
            );
          })}
        </div>
        <Reveal>
          <p className="mt-10 max-w-2xl font-display text-2xl font-semibold leading-snug text-white/85">
            “{active.quote}”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
