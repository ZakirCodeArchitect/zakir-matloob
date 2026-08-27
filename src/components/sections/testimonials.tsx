"use client";

import { Quote } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { writtenTestimonials } from "@/lib/data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = writtenTestimonials[index];
  const next = () => setIndex((i) => (i + 1) % writtenTestimonials.length);

  return (
    <section className="ruled-paper bg-[#f7f6f3] py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col gap-6 border-b border-black/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-orange text-white">
              <Quote className="size-5" />
            </span>
            <h2 className="font-condensed text-6xl md:text-8xl">Testimonials</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Hear from people who have sat in the rooms where the work had to hold.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative mx-auto h-[380px] w-[280px]">
              {writtenTestimonials.map((person, i) => (
                <article
                  key={person.name}
                  className="absolute inset-0 overflow-hidden rounded-3xl border border-black/8 bg-white shadow-[0_20px_50px_rgba(10,10,10,0.08)] transition-transform duration-500"
                  style={{
                    transform: `translate(${i === index ? 16 : 0}px, ${i === index ? 12 : 0}px) rotate(${i === index ? 2 : -2}deg)`,
                    zIndex: i === index ? 2 : 1,
                  }}
                >
                  <div className="paper-grid relative h-[78%]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-contain object-bottom p-4 mix-blend-multiply"
                    />
                  </div>
                  <div className="px-5 py-4">
                    <p className="font-display text-lg font-bold">{person.name}</p>
                    <p className="text-sm text-orange">{person.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-display text-7xl leading-none text-orange">&ldquo;</p>
            <p className="max-w-xl text-2xl leading-relaxed text-ink md:text-3xl">
              {current.quote}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={next}
                className="flex size-10 items-center justify-center rounded-lg border border-black/15"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button type="button" onClick={next} className="text-sm font-medium text-orange">
                Next →
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
