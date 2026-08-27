import { trusted } from "@/lib/data";

export function Trusted() {
  const row = [...trusted, ...trusted];
  return (
    <section className="border-b border-black/8 bg-white py-8 md:py-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 md:flex-row md:items-center md:px-8">
        <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70">
          Trusted by leading brands
        </p>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="marquee flex w-max gap-12 pr-12">
            {row.map((brand, i) => (
              <span
                key={`${brand.name}-${i}`}
                className="font-display text-lg font-bold tracking-tight text-ink/55 md:text-xl"
              >
                {brand.mark}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
