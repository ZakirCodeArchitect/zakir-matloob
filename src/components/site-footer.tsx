import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { footerNav, site } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-white text-ink">
      <div className="mx-auto max-w-[1440px] px-5 pb-6 pt-10 md:px-8">
        <div className="paper-grid relative overflow-hidden rounded-[32px] px-6 py-16 md:rounded-[40px] md:px-16 md:py-24">
          <Image
            src="/images/cta-foliage.png"
            alt=""
            width={420}
            height={240}
            className="pointer-events-none absolute -left-8 -top-10 hidden w-64 -rotate-6 object-contain md:block lg:w-80"
          />
          <Image
            src="/images/cta-foliage.png"
            alt=""
            width={420}
            height={240}
            className="pointer-events-none absolute -bottom-16 -right-10 hidden w-72 rotate-12 scale-x-[-1] object-contain opacity-80 md:block"
          />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="font-condensed text-[12vw] leading-[0.9] text-ink md:text-7xl lg:text-8xl">
              Let&apos;s build something great together
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-orange px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_32px_rgba(255,77,28,0.3)] transition hover:bg-orange-deep"
            >
              <ArrowUpRight className="size-4" />
              Book a Call
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-b border-black/10 pb-12 md:grid-cols-3">
          <FooterCol title="Main page" items={footerNav.main} />
          <FooterCol title="Inner page" items={footerNav.inner} />
          <FooterCol title="Utility page" items={footerNav.utility} />
        </div>

        <div className="flex flex-col gap-3 py-6 font-mono text-[11px] uppercase tracking-wider text-muted md:flex-row md:items-center md:justify-between">
          <span>Designed &amp; engineered by {site.name}</span>
          <span>Copyright © {site.year} {site.name}. All rights reserved</span>
          <span>
            <a href={site.socials.github} className="hover:text-ink">
              GitHub
            </a>
            {" · "}
            <a href={site.socials.linkedin} className="hover:text-ink">
              LinkedIn
            </a>
          </span>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden px-2 pb-0">
        <p className="font-condensed text-[22vw] leading-[0.72] text-transparent [-webkit-text-stroke:1px_rgba(226,58,18,0.45)] [background:linear-gradient(to_top,rgba(226,58,18,0.22),transparent_55%)] [-webkit-background-clip:text]">
          ZAKIR MATLOOB
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-condensed text-2xl tracking-wide text-ink">{title}</h3>
      <ul className="mt-4 space-y-2 font-mono text-sm text-ink/80">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="transition hover:text-orange">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
