"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === "/";

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = onHome && !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "bg-ink/90 text-white backdrop-blur-md"
            : light
              ? "text-white"
              : "bg-paper/80 text-ink backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-8">
          <Link href="/" className="font-display text-lg font-bold tracking-tight md:text-xl">
            {site.wordmark}
          </Link>

          <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-[0.14em] uppercase lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative opacity-80 transition-opacity hover:opacity-100",
                    active && "opacity-100",
                  )}
                >
                  {item.label}
                  {item.count ? (
                    <sup className="ml-1 text-[10px] opacity-70">{item.count}</sup>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full border border-current/20"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28 md:px-16">
          <nav className="flex flex-col gap-3">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-condensed text-[18vw] leading-[0.85] text-white md:text-[8vw]"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-sm text-sm uppercase tracking-[0.18em] text-white/60">
              {site.headline}
            </p>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-medium text-white"
            >
              Let&apos;s talk <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
