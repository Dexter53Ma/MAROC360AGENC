import { NextResponse } from "next/server";
import { retrieve } from "@/lib/chat/engine";
import type { ChatRequest, ChatResponse } from "@/lib/chat/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const lastUser = [...messages].reverse().find((m) => m?.role === "user" && typeof m.content === "string");

  if (!lastUser) {
    return NextResponse.json(
      { error: "No user message provided" },
      { status: 400 },
    );
  }

  const result = retrieve(lastUser.content);
  const response: ChatResponse = result;
  return NextResponse.json(response);
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    provider: "knowledge-base",
    note: "POST a JSON body { messages: [{ role: 'user', content: '...' }] } to get a reply.",
  });
}
