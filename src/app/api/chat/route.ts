import { streamText, type ModelMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { HIKI_SYSTEM_PROMPT } from "@/lib/system-prompt";
import { isSameOrigin } from "@/lib/same-origin";

const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const raw: unknown[] = Array.isArray(body?.messages) ? body.messages : [];

  // Only plain user/assistant turns; the system prompt stays server-side.
  const messages: ModelMessage[] = raw
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        typeof m === "object" &&
        m !== null &&
        ((m as { role?: unknown }).role === "user" || (m as { role?: unknown }).role === "assistant") &&
        typeof (m as { content?: unknown }).content === "string",
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0) {
    return Response.json({ error: "No messages" }, { status: 400 });
  }

  const result = streamText({
    model: openai(process.env.OPENAI_CHAT_MODEL ?? "gpt-5-mini"),
    system: HIKI_SYSTEM_PROMPT,
    messages,
    onError({ error }) {
      console.error("Chat stream error:", error);
    },
  });

  return result.toTextStreamResponse();
}
