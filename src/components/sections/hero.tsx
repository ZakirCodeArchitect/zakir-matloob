"use client";

import { ArrowUpRight, Github, Linkedin } from "lucide-react";
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
    <section className="relative min-h-[100svh] overflow-hidden bg-[#e9e5e0] text-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_32%,#f7f4f0_0%,#e8e3dd_52%,#d2c9bf_100%)]" />
      <div
        aria-hidden
        className="hero-paper-texture pointer-events-none absolute inset-0"
      />

      <HeroTopBar />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-5 pb-28 pt-24 md:px-8 md:pb-32 md:pt-28">
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
          <div className="relative z-10 max-w-[920px] pt-6 md:pt-0">
            <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-ink/45 md:mb-5">
              {site.shortRole}
            </p>
            <h1 className="hero-manifesto select-none text-left">
              <span className="sr-only">
                {site.name} — I engineer systems from the ground up
              </span>
              <span
                aria-hidden
                className="block font-condensed text-[13.5vw] uppercase leading-[0.88] tracking-[0.04em] text-ink md:text-[5.5rem]"
              >
                I engineer
              </span>
              <span
                aria-hidden
                className="hero-manifesto-accent -mt-1 block font-condensed text-[17vw] uppercase leading-[0.82] tracking-[0.05em] text-orange md:-mt-3 md:text-[7rem]"
              >
                systems
              </span>
              <span
                aria-hidden
                className="mt-5 block max-w-[22rem] font-display text-[4.5vw] font-medium leading-snug tracking-[-0.03em] text-ink/45 md:mt-8 md:max-w-lg md:text-[1.5rem] md:pl-0.5"
              >
                From the ground up.
              </span>
            </h1>
          </div>

          <div className="absolute bottom-[26%] left-0 z-30 hidden max-w-[190px] lg:block">
            <div className="relative pr-28">
              <p className="text-right text-sm font-medium leading-snug text-ink/75">
                12+ Completed
                <br />
                Projects
              </p>
              <svg
                className="absolute top-1/2 right-0 h-8 w-28 -translate-y-1/2"
                viewBox="0 0 120 32"
                fill="none"
                aria-hidden
              >
                <path d="M0 16 H98" stroke="rgba(10,10,10,0.22)" strokeWidth="1.2" />
                <circle cx="108" cy="16" r="6.5" fill="white" stroke="rgba(10,10,10,0.08)" />
                <circle cx="108" cy="16" r="2.6" fill="#FF4D1C" />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-[22%] right-0 z-30 hidden w-[250px] lg:block">
            <div className="relative pl-24">
              <svg
                className="absolute top-8 left-0 h-8 w-24"
                viewBox="0 0 100 32"
                fill="none"
                aria-hidden
              >
                <circle cx="8" cy="16" r="6.5" fill="white" stroke="rgba(10,10,10,0.08)" />
                <circle cx="8" cy="16" r="2.6" fill="#FF4D1C" />
                <path d="M16 16 H100" stroke="rgba(10,10,10,0.22)" strokeWidth="1.2" />
              </svg>
              <div className="rounded-2xl border border-black/8 bg-white/80 p-4 shadow-[0_16px_40px_rgba(40,30,20,0.08)] backdrop-blur-md">
                <p className="text-sm font-semibold text-ink">2+ Years of Experience</p>
                <p className="mt-2 text-[12px] leading-relaxed text-ink/65">
                  Full-stack, applied AI, and SAP-adjacent systems — clean delivery with
                  enterprise constraints attached.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8 grid gap-3 lg:hidden">
          <p className="text-sm font-medium text-ink/80">12+ Completed Projects</p>
          <div className="rounded-2xl border border-white/60 bg-white/55 p-4 backdrop-blur-md">
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
          className="inline-flex items-center overflow-hidden rounded-full bg-white pl-4 text-sm font-medium text-ink shadow-[0_8px_24px_rgba(40,30,20,0.1)] transition hover:shadow-[0_12px_28px_rgba(40,30,20,0.14)]"
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
      className="flex size-9 items-center justify-center rounded-md border border-black/8 bg-white/55 text-ink/70 backdrop-blur-md transition hover:bg-white hover:text-ink"
    >
      {children}
    </a>
  );
}

function HeroDock() {
  const pathname = usePathname();
  return (
    <nav className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-black/8 bg-white/55 p-1.5 shadow-[0_14px_40px_rgba(40,30,20,0.12)] backdrop-blur-xl md:bottom-8">
      {dock.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-3.5 py-2 text-xs font-medium transition md:px-5 md:text-sm",
              active
                ? "bg-orange text-white shadow-[0_8px_20px_rgba(255,77,28,0.3)]"
                : "text-ink/75 hover:bg-white hover:text-ink",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
