"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const people = [
  {
    name: "Farooq Sheikh",
    title: "Co-Founder, HarAik",
    image: "/images/testimonial-farooq-studio.png",
  },
  {
    name: "Arsalan Azhar",
    title: "Engagement Partner, HarAik Global Associates",
    image: "/images/testimonial-arsalan-studio.png",
    featured: true,
  },
  {
    name: "Sania Tahir",
    title: "Project Manager, HarAik Global Associates",
    image: "/images/testimonial-sania-studio.png",
  },
] as const;

export function SocialProof() {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="mx-auto flex max-w-[1100px] items-end justify-start gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:justify-center md:gap-3 md:px-8 [&::-webkit-scrollbar]:hidden">
        {people.map((person, i) => (
          <Reveal key={person.name} delay={i * 0.08} className="shrink-0">
            <article
              className={cn(
                "relative overflow-hidden rounded-[16px]",
                "featured" in person && person.featured
                  ? "h-[27rem] w-[15.25rem] sm:h-[33rem] sm:w-[18.5rem] lg:h-[37rem] lg:w-[20.5rem]"
                  : "h-[23.5rem] w-[14.25rem] sm:h-[28.5rem] sm:w-[17rem] lg:h-[31.5rem] lg:w-[18.75rem]",
              )}
            >
              <Image
                src={person.image}
                alt={person.name}
                fill
                sizes="(max-width: 640px) 240px, 340px"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-4 pb-4 md:px-5 md:pb-5">
                <p className="font-display text-[15px] font-bold leading-tight text-white md:text-lg">
                  {person.name}
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-white/65 md:text-[13px]">
                  {person.title}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
