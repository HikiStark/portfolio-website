import { HIKI_VOICE_PROMPT } from "@/lib/system-prompt";
import { isSameOrigin } from "@/lib/same-origin";

// Mints a short-lived OpenAI Realtime client secret. The browser uses it to
// open a WebRTC session directly with OpenAI; the API key never leaves here.
export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
  }

  const res = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expires_after: { anchor: "created_at", seconds: 60 },
      session: {
        type: "realtime",
        model: process.env.OPENAI_REALTIME_MODEL ?? "gpt-realtime-mini",
        instructions: HIKI_VOICE_PROMPT,
        audio: {
          input: {
            noise_reduction: { type: "near_field" },
            transcription: { model: "gpt-4o-mini-transcribe" },
            turn_detection: { type: "semantic_vad" },
          },
          output: { voice: process.env.OPENAI_REALTIME_VOICE ?? "cedar" },
        },
      },
    }),
  });

  if (!res.ok) {
    console.error("Realtime client secret error:", res.status, await res.text());
    return Response.json({ error: "Voice unavailable" }, { status: 502 });
  }

  const { value } = (await res.json()) as { value: string };
  return Response.json({ value });
}
