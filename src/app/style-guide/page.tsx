import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Style guide" };

const colors = [
  { name: "Orange", hex: "#FF4D1C" },
  { name: "Orange deep", hex: "#E23A12" },
  { name: "Ink", hex: "#0A0A0A" },
  { name: "Cream", hex: "#F4F1ED" },
  { name: "Paper", hex: "#FAF8F5" },
];

export default function StyleGuidePage() {
  return (
    <main className="bg-paper">
      <PageHeader
        eyebrow="System"
        title="Style guide"
        description="The visual contract for this site: orange as a signal, black as a stage, cream as rest."
      />
      <section className="mx-auto max-w-[1000px] px-5 pb-24 md:px-8">
        <h2 className="font-condensed text-4xl">Color</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
          {colors.map((color) => (
            <div key={color.hex}>
              <div className="h-24 rounded-2xl" style={{ background: color.hex }} />
              <p className="mt-2 text-sm font-medium">{color.name}</p>
              <p className="font-mono text-xs text-muted">{color.hex}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-16 font-condensed text-4xl">Type</h2>
        <p className="mt-4 font-condensed text-6xl">Bebas for impact</p>
        <p className="mt-3 font-display text-4xl font-bold">Syne for headlines</p>
        <p className="mt-3 text-lg">Geist for reading and interface copy.</p>
        <p className="mt-3 font-mono text-sm">Geist Mono for // tags, dates, and engineering asides.</p>
      </section>
    </main>
  );
}
