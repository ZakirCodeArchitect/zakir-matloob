import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { site, stats } from "@/lib/data";

export function Impact() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal>
          <span className="inline-flex rounded-full border border-black/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Better digital journeys.
          </span>
        </Reveal>
        <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.4fr_auto_220px]">
          <Reveal delay={0.05} className="min-w-0">
            <h2 className="max-w-full font-display text-[clamp(2.35rem,6.2vw+0.85rem,6rem)] font-extrabold leading-[0.95] tracking-[-0.04em] break-words">
              My impact{" "}
              <span className="text-black/30">through</span>{" "}
              <span className="text-black/30">engineering</span> experience
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <svg viewBox="0 0 80 80" className="size-24 text-black/20 md:size-32" aria-hidden>
              <path
                d="M40 4 L43 32 L76 40 L43 48 L40 76 L37 48 L4 40 L37 32 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </Reveal>
          <Reveal delay={0.15} className="hidden lg:block">
            <div className="relative h-48 overflow-hidden rounded-2xl">
              <Image
                src={site.portrait}
                alt=""
                fill
                className="object-cover object-top"
                sizes="220px"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 0.08}>
              <article className="rounded-3xl border border-black/6 bg-white p-5 shadow-[0_20px_50px_rgba(10,10,10,0.05)] sm:p-7">
                <p className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                  {stat.value}
                  <span className="ml-1 text-orange">*</span>
                </p>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.12em] text-ink">
                  {stat.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{stat.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
