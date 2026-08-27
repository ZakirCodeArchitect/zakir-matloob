import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { journal } from "@/lib/data";

export const metadata = {
  title: "Journal",
};

export default function JournalPage() {
  return (
    <main className="bg-black text-white">
      <PageHeader
        dark
        eyebrow="Writing"
        title="Journal"
        description="Field notes from shipping AI into real workflows, and from learning the grammar of enterprise systems."
      />
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 pb-24 md:grid-cols-2 md:px-8">
        {journal.map((post) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="group">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image src={post.image} alt="" fill className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-white/50">
              {post.date} · {post.read}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold leading-snug">{post.title}</h2>
            <p className="mt-2 text-sm text-white/60">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
