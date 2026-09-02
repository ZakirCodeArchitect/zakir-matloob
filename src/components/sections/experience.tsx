import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { experience, site } from "@/lib/data";

export function Experience() {
  return (
    <section className="bg-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 text-center md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
          Experience
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">
          Professional milestones &amp; impact
        </h2>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1200px] items-start gap-10 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px]">
            <div className="relative aspect-[3/4]">
              <Image
                src={site.portrait}
                alt={site.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
            </div>
          </div>
        </Reveal>

        <div>
          {experience.slice(0, 2).map((job, i) => (
            <Reveal key={`${job.company}-${job.role}`} delay={i * 0.05}>
              <article className="border-b border-white/10 py-7 text-left first:pt-0 last:border-b-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  {job.company}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold md:text-2xl">
                  {job.role}{" "}
                  <span className="text-white/50">— ({job.dates})</span>
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/65">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
