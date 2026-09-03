"use client";

import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { caseStudies } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CaseStudies() {
  const [active, setActive] = useState(caseStudies[0].slug);
  const current = caseStudies.find((c) => c.slug === active) ?? caseStudies[0];

  return (
    <section id="work" className="bg-black py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col gap-4 border-b border-dashed border-white/15 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-orange text-white">
              <BookOpen className="size-5" />
            </span>
            <h2 className="font-condensed text-5xl sm:text-6xl md:text-8xl">Case study</h2>
          </div>
          <p className="max-w-sm font-mono text-sm leading-relaxed text-white/70">
            In-depth looks at how engineering decisions solved real business challenges.
          </p>
        </div>

        {/* Stretch so preview matches list height exactly. */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,40%)] lg:items-stretch lg:gap-10">
          <ul className="flex min-h-0 flex-col">
            {caseStudies.map((study) => {
              const isActive = study.slug === active;
              return (
                <li
                  key={study.slug}
                  className="flex flex-1 border-b border-dashed border-white/12 last:border-b-0"
                >
                  <Link
                    href={`/work/${study.slug}`}
                    onMouseEnter={() => setActive(study.slug)}
                    onFocus={() => setActive(study.slug)}
                    className="group flex w-full items-center gap-3 py-3 md:gap-4 md:py-3.5"
                  >
                    <span
                      className={cn(
                        "relative size-11 shrink-0 overflow-hidden rounded-lg sm:size-12",
                        isActive ? "ring-1 ring-orange/70" : "opacity-70 group-hover:opacity-100",
                      )}
                    >
                      <Image
                        src={study.image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={cn(
                          "font-condensed text-xl tracking-wide transition md:text-2xl lg:text-[1.65rem]",
                          isActive ? "text-white" : "text-white/70 group-hover:text-white",
                        )}
                      >
                        {study.title}
                      </h3>
                      <p className="mt-0.5 font-mono text-[10px] leading-4 text-orange/90 md:text-[11px] md:leading-5">
                        {study.tags.map((tag) => (
                          <span key={tag} className="mr-2.5 inline-block last:mr-0">
                            {`// ${tag}`}
                          </span>
                        ))}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="relative hidden lg:block">
            <Link
              href={`/work/${current.slug}`}
              className="absolute inset-0 overflow-hidden rounded-[24px] border border-white/10"
            >
              <Image
                key={current.slug}
                src={current.image}
                alt={current.title}
                fill
                sizes="40vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
                  {current.kicker}
                </p>
                <p className="mt-1 font-display text-xl font-bold md:text-2xl">{current.title}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  Hover a project · click to open
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
