import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  dark,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <header
      className={cn(
        "px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36",
        dark ? "bg-black text-white" : "bg-paper text-ink",
      )}
    >
      <div className="mx-auto max-w-[1200px]">
        {eyebrow ? (
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-orange">{eyebrow}</p>
        ) : null}
        <h1 className="mt-4 font-condensed text-6xl leading-[0.9] md:text-8xl">{title}</h1>
        {description ? (
          <p className={cn("mt-5 max-w-xl text-sm leading-relaxed md:text-base", dark ? "text-white/65" : "text-muted")}>
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="font-mono text-xs uppercase tracking-[0.16em] text-orange">
      ← {label}
    </Link>
  );
}
