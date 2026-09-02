"use client";

import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/data";

export function AnalogFeature() {
  const project = caseStudies[2];

  return (
    <section className="relative overflow-hidden bg-[#0c0b0a] py-28 text-white md:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />
      <p className="pointer-events-none absolute left-[-4%] top-1/2 -translate-y-1/2 font-display text-[28vw] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]">
        MY
      </p>
      <p className="pointer-events-none absolute right-[-6%] top-1/2 -translate-y-1/2 font-display text-[28vw] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]">
        AI
      </p>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5">
        <div className="relative">
          <p className="absolute -top-10 right-0 font-mono text-sm text-white/50">02</p>
          <h2 className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-[42%] font-display text-[16vw] font-extrabold italic leading-none tracking-tight md:text-[9vw]">
            ENGINEER
          </h2>
          <div className="relative z-10 mx-auto w-[min(72vw,380px)] -rotate-6 overflow-hidden rounded-[28px] border-[10px] border-[#efe7d6] shadow-[0_40px_80px_rgba(0,0,0,0.55)]">
            <div className="relative aspect-square">
              <Image src="/images/analog-street.png" alt="" fill sizes="(max-width: 768px) 72vw, 380px" className="object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex w-full items-end justify-between gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
            Software engineer / {project.year}
          </p>
          <Link href={`/work/${project.slug}`} className="group relative size-28">
            <svg viewBox="0 0 100 100" className="spin-slow size-full fill-orange">
              <defs>
                <path id="circlePath" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <text fontSize="7.4" letterSpacing="2.2">
                <textPath href="#circlePath">NEXT · LISTEN TO THE NEXT PROJECT · </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 m-auto flex size-10 items-center justify-center rounded-full bg-white text-ink">
              ≫
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
