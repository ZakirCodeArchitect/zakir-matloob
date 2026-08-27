import { PageHeader } from "@/components/page-header";

export const metadata = { title: "License" };

export default function LicensePage() {
  return (
    <main className="bg-paper">
      <PageHeader eyebrow="Legal" title="License" />
      <article className="mx-auto max-w-[720px] space-y-5 px-5 pb-24 text-sm leading-7 text-ink/80 md:px-8">
        <p>
          The writing, case-study copy, and original design of this site are © 2026 Zakir Matloob. You may not republish the portfolio as a template for sale without permission.
        </p>
        <p>
          Open-source libraries used here retain their own licenses, including Next.js, Motion, GSAP-adjacent patterns, Lenis, Lucide, and Radix.
        </p>
        <p>
          Portrait and still imagery on this site are generated production assets for this personal brand. They are not stock you can lift into another product.
        </p>
      </article>
    </main>
  );
}
