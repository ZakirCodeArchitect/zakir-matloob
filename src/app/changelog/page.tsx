import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Changelog" };

const entries = [
  {
    version: "1.0.0",
    date: "August 2026",
    notes: [
      "First public cut of the 2026 site: orange hero, case studies, journal, and contact.",
      "Motion, grain, custom cursor, and Lenis smooth scroll.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="bg-paper">
      <PageHeader eyebrow="Product" title="Change log" />
      <div className="mx-auto max-w-[720px] px-5 pb-24 md:px-8">
        {entries.map((entry) => (
          <article key={entry.version} className="border-b border-black/10 py-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {entry.version} · {entry.date}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink/80">
              {entry.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
