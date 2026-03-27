// Return the ElevenLabs agent ID for the client to connect directly
export async function GET() {
  const agentId = process.env.ELEVENLABS_AGENT_ID;

  if (!agentId) {
    return Response.json(
      { error: "ELEVENLABS_AGENT_ID not configured" },
      { status: 500 }
    );
  }

  return Response.json({ agentId });
}
