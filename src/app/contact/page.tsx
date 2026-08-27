import { ContactPanel } from "@/components/sections/contact-panel";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/data";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="bg-black">
      <PageHeader
        dark
        eyebrow="Let's talk"
        title="Available for selected work"
        description={`Write to ${site.email} or use the form. I take on platforms, AI systems, and SAP-adjacent consultancy with a clear brief.`}
      />
      <ContactPanel />
    </main>
  );
}
