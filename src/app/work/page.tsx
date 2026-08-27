import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { caseStudies } from "@/lib/data";

export const metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <main className="bg-black text-white">
      <PageHeader
        dark
        eyebrow="Selected work"
        title="Case studies"
        description="Platforms, AI systems, and enterprise workflows shipped with production constraints attached."
      />
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 pb-24 md:grid-cols-2 md:px-8">
        {caseStudies.map((study) => (
          <Link key={study.slug} href={`/work/${study.slug}`} className="group">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
              <Image
                src={study.image}
                alt={study.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-orange">
              {study.kicker} · {study.year}
            </p>
            <h2 className="mt-1 font-condensed text-4xl">{study.title}</h2>
            <p className="mt-2 max-w-md text-sm text-white/65">{study.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
