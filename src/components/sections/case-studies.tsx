"use client";

import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { caseStudies } from "@/lib/data";

export function CaseStudies() {
  const [active, setActive] = useState(caseStudies[0].slug);
  const current = caseStudies.find((c) => c.slug === active) ?? caseStudies[0];

  return (
    <section id="work" className="bg-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col gap-6 border-b border-dashed border-white/15 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-orange text-white">
              <BookOpen className="size-5" />
            </span>
            <h2 className="font-condensed text-6xl md:text-8xl">Case study</h2>
          </div>
          <p className="max-w-sm font-mono text-sm leading-relaxed text-white/70">
            In-depth looks at how engineering decisions solved real business challenges.
          </p>
        </div>

        <ul className="mt-2">
          {caseStudies.map((study) => (
            <li key={study.slug} className="border-b border-dashed border-white/12">
              <Link
                href={`/work/${study.slug}`}
                onMouseEnter={() => setActive(study.slug)}
                onFocus={() => setActive(study.slug)}
                className="grid gap-3 py-7 md:grid-cols-[1.2fr_1fr] md:items-center"
              >
                <h3 className="font-condensed text-3xl tracking-wide text-white md:text-4xl lg:text-5xl">
                  {study.title}
                </h3>
                <p className="font-mono text-[12px] leading-7 text-orange md:text-right">
                  {study.tags.map((tag) => (
                    <span key={tag} className="ml-0 md:ml-6">
                      {`// ${tag}`}
                    </span>
                  ))}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10">
          <Link href={`/work/${current.slug}`} className="block overflow-hidden rounded-[28px]">
            <div className="relative aspect-[16/7] min-h-[220px]">
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 1440px) 100vw, 1400px"
                className="object-cover transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/70">
                  {current.kicker}
                </p>
                <p className="mt-1 font-display text-2xl font-bold">{current.title}</p>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
