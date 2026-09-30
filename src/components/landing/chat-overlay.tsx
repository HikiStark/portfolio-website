"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { ArrowUpIcon, MicrophoneIcon, SpeakerWaveIcon, StopIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PixelMark } from "@/components/site/logo";
import { cn } from "@/lib/utils";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
}

type VoiceStatus = "idle" | "connecting" | "listening" | "speaking";

type VoiceSession = {
  pc: RTCPeerConnection;
  dc: RTCDataChannel;
  mic: MediaStream;
  audio: HTMLAudioElement;
  timer: number;
};

// Subset of OpenAI Realtime server events the bar reacts to.
type ServerEvent = {
  type: string;
  item_id?: string;
  delta?: string;
  transcript?: string;
  error?: { message?: string };
};

const VOICE_LIMIT_MS = 5 * 60 * 1000;
const GREETING = "Greet the visitor in one short sentence as Hiki and ask what they would like to know.";

export function ChatOverlay() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>("idle");
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<VoiceSession | null>(null);
  // Bumped on every start/stop so a slow connect can tell it was cancelled.
  const attemptRef = useRef(0);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const isActive = messages.length > 0 || voiceStatus !== "idle" || isLoading;

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const history = [...messages, userMessage]
      .filter((m) => !m.pending && m.content)
      .map(({ role, content }) => ({ role, content }));
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) throw new Error("Failed");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let content = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          content += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content };
            return updated;
          });
        }
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Try again." }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleServerEvent(ev: ServerEvent) {
    switch (ev.type) {
      // Placeholder keeps the user's turn above the reply while it transcribes.
      case "input_audio_buffer.committed":
        setMessages((prev) => [...prev, { id: ev.item_id, role: "user", content: "", pending: true }]);
        break;
      case "conversation.item.input_audio_transcription.completed":
        setMessages((prev) =>
          prev.map((m) => (m.id === ev.item_id ? { ...m, content: ev.transcript?.trim() || "…", pending: false } : m)),
        );
        break;
      case "conversation.item.input_audio_transcription.failed":
        setMessages((prev) => prev.filter((m) => m.id !== ev.item_id));
        break;
      case "response.output_audio_transcript.delta":
        setMessages((prev) => {
          const i = prev.findIndex((m) => m.id === ev.item_id);
          if (i === -1) return [...prev, { id: ev.item_id, role: "assistant", content: ev.delta ?? "" }];
          const next = [...prev];
          next[i] = { ...next[i], content: next[i].content + (ev.delta ?? "") };
          return next;
        });
        break;
      case "response.output_audio_transcript.done":
        setMessages((prev) => prev.map((m) => (m.id === ev.item_id ? { ...m, content: ev.transcript ?? m.content } : m)));
        break;
      case "output_audio_buffer.started":
        setVoiceStatus("speaking");
        break;
      case "output_audio_buffer.stopped":
      case "output_audio_buffer.cleared":
        setVoiceStatus("listening");
        break;
      case "error":
        console.warn("Realtime error:", ev.error?.message);
        break;
    }
  }

  function stopConversation() {
    attemptRef.current++;
    const session = sessionRef.current;
    sessionRef.current = null;
    if (session) {
      window.clearTimeout(session.timer);
      session.dc.close();
      session.mic.getTracks().forEach((t) => t.stop());
      session.pc.close();
      session.audio.srcObject = null;
    }
    setVoiceStatus("idle");
  }

  async function startConversation() {
    if (sessionRef.current || voiceStatus !== "idle") return;
    const attempt = ++attemptRef.current;
    setVoiceStatus("connecting");

    let mic: MediaStream | null = null;
    let pc: RTCPeerConnection | null = null;
    const cancelled = () => attempt !== attemptRef.current;

    try {
      // Ask for the mic first so a denied prompt doesn't mint a session.
      mic = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (cancelled()) throw new Error("cancelled");

      const tokenRes = await fetch("/api/voice", { method: "POST" });
      if (!tokenRes.ok) throw new Error("Failed to create voice session");
      const { value } = (await tokenRes.json()) as { value: string };
      if (cancelled()) throw new Error("cancelled");

      pc = new RTCPeerConnection();
      const audio = document.createElement("audio");
      audio.autoplay = true;
      pc.ontrack = (e) => {
        audio.srcObject = e.streams[0];
      };
      for (const track of mic.getTracks()) pc.addTrack(track, mic);

      const dc = pc.createDataChannel("oai-events");
      dc.addEventListener("open", () => {
        if (cancelled()) return;
        setVoiceStatus("listening");
        dc.send(JSON.stringify({ type: "response.create", response: { instructions: GREETING } }));
      });
      dc.addEventListener("message", (e) => {
        if (!cancelled()) handleServerEvent(JSON.parse(e.data) as ServerEvent);
      });
      pc.addEventListener("connectionstatechange", () => {
        if (pc?.connectionState === "failed" || pc?.connectionState === "closed") stopConversation();
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      const sdpRes = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: offer.sdp,
        headers: { Authorization: `Bearer ${value}`, "Content-Type": "application/sdp" },
      });
      if (!sdpRes.ok) throw new Error("Failed to connect voice session");
      await pc.setRemoteDescription({ type: "answer", sdp: await sdpRes.text() });
      if (cancelled()) throw new Error("cancelled");

      const timer = window.setTimeout(stopConversation, VOICE_LIMIT_MS);
      sessionRef.current = { pc, dc, mic, audio, timer };
    } catch (err) {
      mic?.getTracks().forEach((t) => t.stop());
      pc?.close();
      if (cancelled()) return;
      console.warn("Voice error:", err);
      setVoiceStatus("idle");
      setMessages((prev) => [...prev, { role: "assistant", content: "Voice unavailable. Use text chat instead." }]);
    }
  }

  function handleVoiceToggle() {
    if (voiceStatus !== "idle") stopConversation();
    else startConversation();
  }

  // Release the mic and close the WebRTC session if the bar unmounts mid-call.
  const onUnmount = useEffectEvent(() => {
    if (sessionRef.current) stopConversation();
  });
  useEffect(() => () => onUnmount(), []);

  const voiceStatusText =
    voiceStatus === "connecting"
      ? "Connecting…"
      : voiceStatus === "listening"
        ? "Listening — speak now"
        : voiceStatus === "speaking"
          ? "Hiki is speaking"
          : null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 sm:bottom-6">
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 rounded-[12px] bg-[linear-gradient(180deg,#3b3b3b_0%,#1b1b1b_100%)] px-4 py-3 text-[15px] font-medium whitespace-nowrap text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5"
        >
          {voiceStatus !== "idle" ? (
            <>
              <span className="size-2.5 animate-pulse bg-brand" />
              Hiki is live — {voiceStatus === "speaking" ? "speaking" : "listening"}
            </>
          ) : (
            <>
              <PixelMark className="size-4 text-white" />
              Ask Hiki anything
              <MicrophoneIcon className="size-4 stroke-2 text-white/60" />
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[640px] -translate-x-1/2 flex-col gap-2.5 px-3 pt-2 pb-4 sm:px-4 sm:pb-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Messages */}
      {messages.length > 0 && (
        <div className="overflow-hidden rounded-[14px] border border-[#e3e3e3] bg-surface shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between border-b border-rule py-2 pr-2 pl-4">
            <span className="flex items-center gap-2 text-[12px] tracking-[0.04em] text-subtle uppercase">
              <PixelMark className="size-3.5" /> Ask Hiki
            </span>
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="flex size-8 items-center justify-center rounded-lg text-subtle transition-colors hover:bg-hover hover:text-ink"
              aria-label="Minimize chat"
            >
              <XMarkIcon className="size-4 stroke-2" />
            </button>
          </div>
          <div ref={scrollAreaRef} className="flex max-h-[300px] flex-col gap-2 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={msg.id ?? i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-[10px] px-3.5 py-2.5 text-[14.5px] leading-relaxed whitespace-pre-wrap",
                    msg.role === "assistant" ? "rounded-bl-[3px] bg-canvas text-ink" : "rounded-br-[3px] bg-brand text-white",
                  )}
                >
                  {msg.pending ? <span className="animate-pulse">…</span> : msg.content}
                  {i === messages.length - 1 && msg.role === "assistant" && isLoading && (
                    <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-brand align-middle" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hint — on hover while idle */}
      {!isActive && isHovered && (
        <div className="rounded-[14px] border border-[#e3e3e3] bg-surface p-4 shadow-[0_16px_32px_-20px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <p className="text-[14px] leading-relaxed text-body">
            Hiki answers by text here or in a live voice conversation. Click the microphone to talk, or type your
            question below.
          </p>
        </div>
      )}

      {/* Voice status */}
      {voiceStatusText && (
        <div className="flex items-center gap-3 rounded-[12px] border border-[#e3e3e3] bg-surface py-2 pr-2 pl-4 shadow-[0_16px_32px_-20px_rgba(0,0,0,0.3)]">
          <span
            className={cn(
              "size-2.5 shrink-0",
              voiceStatus === "connecting" ? "animate-pulse bg-subtle" : "animate-pulse bg-brand",
            )}
          />
          <p className="flex-1 text-[14px] text-ink">{voiceStatusText}</p>
          <button
            type="button"
            onClick={stopConversation}
            className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-medium text-body transition-colors hover:bg-hover hover:text-ink"
          >
            <StopIcon className="size-4 stroke-2" /> End
          </button>
        </div>
      )}

      {/* Input bar */}
      <div className="flex w-full items-center gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex flex-1 items-center gap-2 rounded-[12px] border border-[#e3e3e3] bg-surface p-1.5 pl-4 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.35)] transition-colors focus-within:border-brand/50"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Hiki anything…"
            aria-label="Message Hiki"
            disabled={voiceStatus !== "idle"}
            className="h-9 min-w-0 flex-1 bg-transparent text-[15px] text-ink placeholder:text-subtle focus:outline-none disabled:opacity-40"
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={isLoading || !input.trim() || voiceStatus !== "idle"}
            className="flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-[linear-gradient(180deg,#3b3b3b_0%,#1b1b1b_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition-opacity disabled:opacity-30"
          >
            <ArrowUpIcon className="size-4 stroke-2" />
          </button>
        </form>

        {/* Voice button */}
        <div className="group relative shrink-0">
          <button
            type="button"
            onClick={handleVoiceToggle}
            disabled={isLoading}
            aria-label={voiceStatus === "idle" ? "Start voice conversation" : "End voice conversation"}
            className={cn(
              "flex size-[50px] items-center justify-center rounded-[12px] border shadow-[0_12px_32px_-16px_rgba(0,0,0,0.35)] transition-colors disabled:opacity-40",
              voiceStatus === "idle" && "border-[#e3e3e3] bg-surface text-brand hover:border-brand/50",
              voiceStatus === "connecting" && "border-[#e3e3e3] bg-surface text-subtle",
              (voiceStatus === "listening" || voiceStatus === "speaking") && "border-brand bg-brand text-white",
            )}
          >
            {voiceStatus === "speaking" ? (
              <SpeakerWaveIcon className="size-6 animate-pulse" />
            ) : voiceStatus === "connecting" ? (
              <span className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <MicrophoneIcon className={cn("size-6", voiceStatus === "listening" && "animate-pulse")} />
            )}
          </button>

          {/* CTA label — left of the mic on hover, hidden on mobile */}
          {!isActive && isHovered && (
            <div className="pointer-events-none absolute top-1/2 right-full mr-3 hidden -translate-y-1/2 animate-in fade-in slide-in-from-right-2 duration-200 sm:block">
              <div className="flex items-center">
                <span className="rounded-[9px] bg-ink px-3.5 py-2 text-[13px] font-medium whitespace-nowrap text-white shadow-lg">
                  Talk to Hiki live
                </span>
                <svg width="6" height="12" viewBox="0 0 6 12" className="text-ink">
                  <path d="M6 6L0 0v12z" fill="currentColor" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
