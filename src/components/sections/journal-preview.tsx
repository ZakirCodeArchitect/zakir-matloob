import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { journal } from "@/lib/data";

export function JournalPreview() {
  return (
    <section className="bg-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-orange">
              <BookOpen className="size-5" />
            </span>
            <h2 className="font-condensed text-6xl md:text-8xl">Journal</h2>
          </div>
          <p className="max-w-sm font-mono text-sm leading-relaxed text-white/70">
            Thoughts, lessons, and behind-the-scenes notes from building enterprise software and AI.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {journal.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 font-mono text-sm leading-relaxed text-white/90 md:text-base">
                  {post.title}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
