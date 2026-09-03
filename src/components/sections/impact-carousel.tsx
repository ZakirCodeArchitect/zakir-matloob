"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { videoTestimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ImpactCarousel() {
  const [index, setIndex] = useState(1);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prev = () => setIndex((i) => (i === 0 ? videoTestimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % videoTestimonials.length);
  const active = videoTestimonials[index];

  useEffect(() => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;
    const left = card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2;
    scroller.scrollTo({ left, behavior: "smooth" });
  }, [index]);

  return (
    <section className="overflow-hidden bg-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
              Impact
            </p>
            <h2 className="mt-3 max-w-xl font-display text-[1.75rem] font-bold leading-tight sm:text-4xl md:text-6xl">
              Engineering impact &amp; client feedback
            </h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="flex size-9 items-center justify-center rounded-xl border border-white/20 sm:size-11"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="flex size-9 items-center justify-center rounded-xl border border-white/20 sm:size-11"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/*
          Fixed track height = active card height.
          Real width/height (not scale) so cards never overlap.
          items-end keeps bottoms locked so the row doesn't bounce.
        */}
        <div
          ref={scrollerRef}
          className="mt-14 h-[400px] overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:h-[520px]"
        >
          <div className="flex h-full snap-x snap-mandatory items-end gap-4 md:gap-6">
            {videoTestimonials.map((person, i) => {
              const focused = i === index;
              return (
                <button
                  key={person.name}
                  type="button"
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "relative shrink-0 snap-center overflow-hidden rounded-[28px]",
                    "transition-[width,height,filter] duration-500 ease-out",
                    focused
                      ? "h-full w-[min(78vw,320px)] grayscale-0"
                      : "h-[82%] w-[min(58vw,220px)] grayscale md:h-[78%]",
                  )}
                >
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="320px"
                    className={cn(
                      "object-cover transition-[filter] duration-500 ease-out",
                      focused ? "grayscale-0" : "grayscale",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-3 text-left sm:bottom-5 sm:left-5 sm:right-4">
                    <p className="font-display text-lg font-bold sm:text-xl">{person.name}</p>
                    <p className="text-xs text-white/70 sm:text-sm">{person.title}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <Reveal>
          <p className="mt-10 max-w-2xl font-display text-xl font-semibold leading-snug text-white/85 sm:text-2xl">
            “{active.quote}”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
