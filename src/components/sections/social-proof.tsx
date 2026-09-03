"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { videoTestimonials } from "@/lib/data";

const collaborators: {
  name: string;
  image: string;
  circular?: boolean;
}[] = [
  {
    name: "Farooq Sheikh",
    image: "/images/testimonial-farooq-headshot.png",
    circular: true,
  },
  {
    name: "Arsalan Azhar",
    image: "/images/testimonial-arsalan.png",
  },
  {
    name: "Sania Tahir",
    image: "/images/testimonial-sania.png",
  },
];

export function SocialProof() {
  const quote = videoTestimonials[0];
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
                  {collaborators.map((person) => (
                    <span
                      key={person.name}
                      className="relative size-9 shrink-0 overflow-hidden rounded-full border-2 border-white bg-neutral-900"
                    >
                      <Image
                        src={person.image}
                        alt={person.name}
                        width={36}
                        height={36}
                        className={
                          person.circular
                            ? "absolute inset-x-0 top-[22%] h-full w-full object-cover"
                            : "size-full object-cover object-top"
                        }
                      />
                    </span>
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
              <div className="mt-5">
                <p className="text-sm font-medium">{quote.name}</p>
                <p className="text-sm text-muted">{quote.title}</p>
              </div>
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.1} className="md:self-start">
          <article className="relative h-[18rem] w-full overflow-hidden rounded-[28px] bg-[#c5c1bb] text-white sm:h-[20rem] md:h-[22rem]">
            <div className="absolute inset-y-0 right-0 w-[62%] sm:w-[58%]">
              <Image
                src="/images/zakir-professional.png"
                alt="Zakir"
                fill
                priority
                sizes="(max-width: 768px) 70vw, 30vw"
                className="object-cover object-[12%_38%] scale-x-[-1]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#b83310] via-[#ff4d1c]/88 to-transparent to-55%" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#9a2a0d]/70 via-transparent to-transparent" />
            <div className="relative z-10 flex h-full max-w-[15rem] flex-col justify-end p-6 md:max-w-[17rem] md:p-8">
              <p className="font-display text-base font-bold md:text-lg">Zakir</p>
              <p className="mt-3 font-display text-[1.75rem] font-extrabold leading-[0.9] tracking-tight sm:text-3xl md:text-[2.2rem]">
                I DESIGN
                <br />
                SYSTEMS
                <br />
                PEOPLE TRUST.
              </p>
              <p className="mt-4 max-w-xs text-[10px] uppercase tracking-[0.16em] text-white/85 md:text-[11px]">
                Web platforms · applied AI · SAP-adjacent consultancy
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
