import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/data";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <main className="bg-paper">
      <PageHeader eyebrow="Legal" title="Privacy policy" />
      <article className="mx-auto max-w-[720px] space-y-5 px-5 pb-24 text-sm leading-7 text-ink/80 md:px-8">
        <p>
          This site is a personal portfolio. If you use the contact form, the name, email, and message you submit are used only to reply to you. Nothing is sold, and there is no advertising tracker.
        </p>
        <p>
          Contact form messages are emailed to {site.email}. If delivery fails, the form falls back to your email client addressed to the same inbox. Do not send secrets, credentials, or personal data you would not put in an ordinary email.
        </p>
      </article>
    </main>
  );
}
