import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
};

const inbox: Payload[] = [];

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  inbox.push({
    name: String(body.name).slice(0, 200),
    email: String(body.email).slice(0, 200),
    message: String(body.message).slice(0, 5000),
  });
  return NextResponse.json({ ok: true });
}
