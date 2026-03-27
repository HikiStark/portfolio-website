import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { HIKI_SYSTEM_PROMPT } from "@/lib/system-prompt";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-5-mini"),
    system: HIKI_SYSTEM_PROMPT,
    messages,
    onError({ error }) {
      console.error("Chat stream error:", error);
    },
  });

  return result.toTextStreamResponse();
}
