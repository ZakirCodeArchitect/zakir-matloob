"use client";

import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

const dock = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Services" },
  { href: "/work", label: "Works" },
  { href: "/journal", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[linear-gradient(180deg,#e8e6e3_0%,#d9d4ce_42%,#c7b8a8_100%)] text-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(255,255,255,0.72),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(10,10,10,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,10,0.045)_1px,transparent_1px)] [background-size:72px_72px]" />

      <HeroTopBar />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-5 pb-28 pt-24 md:px-8 md:pb-32 md:pt-28">
        <div className="relative mx-auto flex w-full max-w-5xl flex-1 items-end justify-center">
          <p
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[38%] z-0 w-[125%] -translate-x-1/2 -translate-y-1/2 text-center font-[family-name:var(--font-pixel)] text-[14vw] font-bold leading-none tracking-[-0.03em] select-none md:top-[42%] md:text-[10.5vw]"
            style={{
              WebkitTextStroke: "1.25px rgba(255,255,255,0.65)",
              color: "rgba(255,255,255,0.38)",
            }}
          >
            DEVELOPER
          </p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-[520px]"
          >
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[440px]">
              <Image
                src="/images/hero-glass-portrait.png"
                alt={`${site.name}, software engineer`}
                fill
                priority
                className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(40,30,20,0.28)]"
                sizes="(max-width: 768px) 90vw, 440px"
              />
            </div>
          </motion.div>

          <p
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[38%] z-20 w-[125%] -translate-x-1/2 -translate-y-1/2 text-center font-[family-name:var(--font-pixel)] text-[14vw] font-bold leading-none tracking-[-0.03em] text-white select-none md:top-[42%] md:text-[10.5vw]"
            style={{
              clipPath: "inset(48% 0 0 0)",
              textShadow: "0 10px 28px rgba(0,0,0,0.14)",
            }}
          >
            DEVELOPER
          </p>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="absolute left-0 top-[46%] z-30 hidden max-w-[190px] lg:block"
          >
            <div className="relative pr-28">
              <p className="text-right text-sm font-medium leading-snug text-ink/80">
                12+ Completed
                <br />
                Projects
              </p>
              <svg
                className="absolute top-1/2 right-0 h-8 w-28 -translate-y-1/2 text-white"
                viewBox="0 0 120 32"
                fill="none"
                aria-hidden
              >
                <path d="M0 16 H98" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="108" cy="16" r="6.5" fill="white" />
                <circle cx="108" cy="16" r="2.6" fill="#FF4D1C" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="absolute right-0 top-[40%] z-30 hidden w-[250px] lg:block"
          >
            <div className="relative pl-24">
              <svg
                className="absolute top-8 left-0 h-8 w-24 text-white"
                viewBox="0 0 100 32"
                fill="none"
                aria-hidden
              >
                <circle cx="8" cy="16" r="6.5" fill="white" />
                <circle cx="8" cy="16" r="2.6" fill="#FF4D1C" />
                <path d="M16 16 H100" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <div className="rounded-2xl border border-white/55 bg-white/40 p-4 shadow-[0_20px_50px_rgba(40,30,20,0.12)] backdrop-blur-xl">
                <p className="text-sm font-semibold text-ink">2+ Years of Experience</p>
                <p className="mt-2 text-[12px] leading-relaxed text-ink/70">
                  Full-stack, applied AI, and SAP-adjacent systems — clean delivery with
                  enterprise constraints attached.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-3 lg:hidden">
          <p className="text-sm font-medium text-ink/80">12+ Completed Projects</p>
          <div className="rounded-2xl border border-white/55 bg-white/45 p-4 backdrop-blur-xl">
            <p className="text-sm font-semibold">2+ Years of Experience</p>
            <p className="mt-1 text-xs leading-relaxed text-ink/70">
              Full-stack, AI, and SAP-adjacent systems shipped for real operators.
            </p>
          </div>
        </div>

        <SocialRail />
        <HeroDock />
      </div>
    </section>
  );
}

function HeroTopBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-ink md:text-base"
        >
          <span className="text-ink/45">{"{...}"}</span>
          <span className="uppercase">{site.name}.</span>
          <span className="size-2.5 shrink-0 bg-orange" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center overflow-hidden rounded-full bg-white pl-4 text-sm font-medium text-ink shadow-[0_10px_30px_rgba(40,30,20,0.12)] transition hover:shadow-[0_14px_36px_rgba(40,30,20,0.16)]"
        >
          <span className="pr-3">Book a Call</span>
          <span className="flex size-10 items-center justify-center bg-orange text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}

function SocialRail() {
  return (
    <div className="absolute bottom-8 left-5 z-30 flex gap-2 md:bottom-10 md:left-8">
      <SocialIcon href={site.socials.github} label="GitHub">
        <Github className="size-3.5" />
      </SocialIcon>
      <SocialIcon href={site.socials.linkedin} label="LinkedIn">
        <Linkedin className="size-3.5" />
      </SocialIcon>
      <SocialIcon href={`mailto:${site.email}`} label="Email">
        <span className="font-mono text-[10px]">@</span>
      </SocialIcon>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="flex size-9 items-center justify-center rounded-md border border-white/40 bg-white/30 text-ink/70 backdrop-blur-md transition hover:bg-white/60 hover:text-ink"
    >
      {children}
    </a>
  );
}

function HeroDock() {
  const pathname = usePathname();
  return (
    <nav className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/50 bg-white/40 p-1.5 shadow-[0_18px_50px_rgba(40,30,20,0.16)] backdrop-blur-xl md:bottom-8">
      {dock.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-3.5 py-2 text-xs font-medium transition md:px-5 md:text-sm",
              active
                ? "bg-orange text-white shadow-[0_8px_20px_rgba(255,77,28,0.35)]"
                : "text-ink/75 hover:bg-white/55 hover:text-ink",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
