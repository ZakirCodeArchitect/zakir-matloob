"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { writtenTestimonials } from "@/lib/data";

export function SocialProof() {
  const quote = writtenTestimonials[0];
  return (
    <section className="bg-[#f6f4f1] py-16 md:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-6 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <Reveal>
          <article className="relative overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_24px_60px_rgba(10,10,10,0.06)] md:p-10">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url(/images/contact-bg.png)", backgroundSize: "cover" }} />
            <div className="absolute inset-0 bg-white/86" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["/images/testimonial-jessica.png", "/images/testimonial-anika.png", "/images/avatar-small.png"].map((src) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={36}
                      height={36}
                      className="size-9 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-orange">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs font-medium text-muted">4.9/5 from collaborators</p>
                </div>
              </div>
              <p className="mt-6 max-w-lg font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
                “{quote.quote}”
              </p>
              <p className="mt-5 text-sm font-medium">
                {quote.name}
                <span className="text-muted"> — {quote.role}</span>
              </p>
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article className="flex h-full flex-col justify-between overflow-hidden rounded-[28px] bg-orange p-8 text-white md:p-10">
            <p className="font-display text-lg font-bold">{`Zakir®`}</p>
            <p className="mt-10 font-display text-4xl font-extrabold leading-[0.9] tracking-tight md:text-5xl">
              I DESIGN
              <br />
              SYSTEMS
              <br />
              PEOPLE TRUST.
            </p>
            <p className="mt-8 max-w-xs text-[11px] uppercase tracking-[0.16em] text-white/80">
              Web platforms · applied AI · SAP-adjacent consultancy
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
