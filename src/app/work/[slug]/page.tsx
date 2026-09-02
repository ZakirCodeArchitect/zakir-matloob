import Image from "next/image";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/page-header";
import { caseStudies } from "@/lib/data";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  return { title: study?.title ?? "Case study" };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();

  return (
    <main className="bg-black text-white">
      <article className="mx-auto max-w-[1100px] px-5 pb-24 pt-28 md:px-8 md:pt-36">
        <BackLink href="/work" label="All work" />
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-orange">
          {study.kicker} · {study.year}
        </p>
        <h1 className="mt-3 font-condensed text-6xl md:text-8xl">{study.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-white/70">{study.summary}</p>
        <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-[28px]">
          <Image src={study.image} alt={study.title} fill sizes="(max-width: 1100px) 100vw, 1100px" className="object-cover" priority />
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <Block title="Challenge" body={study.challenge} />
          <Block title="Approach" body={study.approach} />
          <Block title="Outcome" body={study.outcome} />
        </div>
        <div className="mt-12 flex flex-wrap gap-2">
          {study.stack.map((item) => (
            <span key={item} className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white/70">
              {item}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-orange">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">{body}</p>
    </div>
  );
}
