import { NextResponse } from "next/server";
import { site } from "@/lib/data";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const name = String(body.name).slice(0, 200);
  const email = String(body.email).slice(0, 200);
  const message = String(body.message).slice(0, 5000);
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Mail not configured" },
      { status: 503 },
    );
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [site.email],
      reply_to: email,
      subject: `Portfolio note from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return NextResponse.json(
      { ok: false, error: detail || "Could not send" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
