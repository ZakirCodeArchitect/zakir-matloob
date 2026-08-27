"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Magnetic } from "@/components/magnetic";
import { caseStudies, site } from "@/lib/data";

export function Hero() {
  const featured = caseStudies[0];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-orange text-white">
      <div className="hero-grid absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,transparent_0%,rgba(226,58,18,0.35)_70%)]" />

      <p className="pointer-events-none absolute left-1/2 top-[18%] z-0 w-[140%] -translate-x-1/2 text-center font-display text-[22vw] font-extrabold leading-none tracking-[-0.06em] text-white/18 select-none">
        ZAKIR
      </p>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-between px-5 pb-8 pt-24 md:px-8 md:pb-10 md:pt-28">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_minmax(280px,42%)_auto]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-xs text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-white/90 md:text-xs"
          >
            {site.headline}
          </motion.p>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/images/hero-portrait.png"
                alt={`${site.name}, software engineer`}
                fill
                priority
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 80vw, 42vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-orange via-orange/50 to-transparent" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="hidden self-center lg:block"
          >
            <Link
              href={`/work/${featured.slug}`}
              className="block w-48 overflow-hidden rounded-2xl bg-white p-2 text-ink shadow-2xl transition hover:-translate-y-1"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/images/project-hardware.png"
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between px-2 py-3 text-[11px] font-semibold uppercase tracking-wider">
                <span>❄️ {featured.title}</span>
                <span className="text-muted">/{featured.category}</span>
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="relative z-20 mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-1 font-mono text-[11px] tracking-[0.2em] text-white/80">
              ©{site.year}
            </p>
            <h1 className="font-display text-[18vw] font-extrabold leading-[0.8] tracking-[-0.05em] md:text-[9vw]">
              ZAKIR
            </h1>
          </div>

          <Magnetic>
            <Link
              href="/contact"
              className="flex items-center gap-3 rounded-2xl bg-[#1c120f]/90 p-2 pr-2 text-white shadow-xl backdrop-blur"
            >
              <Image
                src="/images/avatar-small.png"
                alt=""
                width={44}
                height={44}
                className="size-11 rounded-full object-cover"
              />
              <div className="pr-2">
                <p className="text-sm font-medium">Let&apos;s Talk</p>
                <p className="text-[11px] text-white/60">
                  {site.name} — {site.shortRole}
                </p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-xl bg-white text-ink">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
