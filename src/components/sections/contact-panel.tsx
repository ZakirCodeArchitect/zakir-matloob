"use client";

import { type FormEvent, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ContactPanel() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Could not send");
      setStatus("success");
      form.reset();
    } catch {
      const subject = encodeURIComponent(`Portfolio note from ${data.name ?? ""}`);
      const body = encodeURIComponent(String(data.message ?? ""));
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("success");
    }
  }

  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <Image
        src="/images/contact-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
      <div className="relative mx-auto grid max-w-[1100px] items-center gap-10 px-5 md:grid-cols-2 md:px-8">
        <div className="text-white">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange">Contact</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl md:text-6xl">
            Start a conversation.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            For platforms, AI systems, or SAP-adjacent work. I read every note.
            The form stores locally if mail is unavailable — you can also write{" "}
            <a className="underline decoration-orange" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white shadow-2xl">
          <div className="bg-gradient-to-r from-[#7a1d12] to-orange px-6 py-5 text-white">
            <p className="font-display text-xl font-bold">{site.wordmark}</p>
            <p className="text-xs text-white/80">{site.role}</p>
          </div>
          {status === "success" ? (
            <div className="p-8">
              <p className="font-display text-2xl font-bold">Message received.</p>
              <p className="mt-3 text-sm text-muted">
                Thank you. I will reply to the address you left. If you used the mail fallback, check your client.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-medium text-orange"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-3 p-6">
              <Field name="name" label="Full Name" required />
              <Field name="email" label="E-mail" type="email" required />
              <Field name="message" label="Message" textarea required />
              <button
                type="submit"
                disabled={status === "loading"}
                className={cn(
                  "mt-2 h-12 w-full rounded-xl bg-ink text-sm font-semibold uppercase tracking-[0.16em] text-white",
                  status === "loading" && "opacity-60",
                )}
              >
                {status === "loading" ? "Sending…" : "Your message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const cls =
    "w-full rounded-xl bg-[#f3f1ee] px-4 py-3 text-sm outline-none ring-orange/30 focus:ring-2";
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      {textarea ? (
        <textarea name={name} placeholder={label} required={required} rows={4} className={cls} />
      ) : (
        <input name={name} type={type} placeholder={label} required={required} className={cls} />
      )}
    </label>
  );
}
