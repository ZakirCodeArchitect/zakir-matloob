import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { whyPartner } from "@/lib/data";

export function WhyPartner() {
  return (
    <section className="bg-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
            Why partner with me
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight md:text-6xl">
            Why partner with me today and always?
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {whyPartner.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.06}>
              <article className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-[#0d0d0d] p-7 md:min-h-[280px] md:p-9">
                <div className="pointer-events-none absolute -right-10 -top-16 size-72 rounded-full bg-[radial-gradient(circle,rgba(255,77,28,0.28),transparent_62%)]" />
                <Visual kind={card.kind} />
                <h3 className="relative mt-8 font-display text-2xl font-bold">{card.title}</h3>
                <p className="relative mt-3 max-w-md text-sm leading-relaxed text-white/65">
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visual({ kind }: { kind: "stack" | "wave" | "cloud" | "globe" }) {
  if (kind === "wave") {
    return (
      <div className="relative h-28 overflow-hidden rounded-2xl">
        <Image src="/images/waveform.png" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-90" />
      </div>
    );
  }
  if (kind === "globe") {
    return (
      <div className="relative -mb-8 -mr-8 h-40 overflow-hidden rounded-2xl md:absolute md:bottom-0 md:right-0 md:h-56 md:w-[55%]">
        <Image src="/images/globe-dots.png" alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
      </div>
    );
  }
  if (kind === "cloud") {
    return (
      <div className="flex size-12 items-center justify-center rounded-2xl bg-orange/20 text-orange shadow-[0_0_30px_rgba(255,77,28,0.45)]">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 14a4 4 0 0 1 4-4h.3A5 5 0 0 1 18 12a3.5 3.5 0 0 1 .2 7H8a4 4 0 0 1-4-3Z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-orange/15 font-mono text-lg text-orange shadow-[0_0_40px_rgba(255,77,28,0.4)]">
        {"</>"}
      </div>
      <div className="flex gap-2 text-[11px] font-medium uppercase tracking-wider text-white/50">
        {["Next.js", "TypeScript", "Node", "Tailwind", "Motion"].map((t) => (
          <span key={t} className="rounded-full border border-white/10 px-2 py-1">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
