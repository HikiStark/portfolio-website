"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  PaperAirplaneIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MicrophoneIcon as MicSolid } from "@heroicons/react/24/solid";
import { Conversation } from "@elevenlabs/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatOverlayProps {
  onStartVoice: () => void;
  onStopVoice: () => void;
  isVoiceActive: boolean;
}

export function ChatOverlay({
  onStartVoice,
  onStopVoice,
}: ChatOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<
    "idle" | "connecting" | "listening" | "speaking"
  >("idle");
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conversationRef = useRef<any>(null);

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
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
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
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  const startConversation = useCallback(async () => {
    setVoiceStatus("connecting");
    onStartVoice();
    try {
      const res = await fetch("/api/voice");
      if (!res.ok) throw new Error("Failed");
      const { agentId } = await res.json();

      const conversation = await Conversation.startSession({
        agentId: agentId as string,
        connectionType: "websocket" as const,
        onConnect: () => setVoiceStatus("listening"),
        onDisconnect: () => {
          setVoiceStatus("idle");
          onStopVoice();
          conversationRef.current = null;
        },
        onError: () => {
          setVoiceStatus("idle");
          onStopVoice();
        },
        onModeChange: ({ mode }: { mode: string }) =>
          setVoiceStatus(mode === "speaking" ? "speaking" : "listening"),
        onMessage: (msg: { source: string; message: string }) => {
          if (msg.source === "user")
            setMessages((prev) => [...prev, { role: "user", content: msg.message }]);
          else if (msg.source === "ai")
            setMessages((prev) => [...prev, { role: "assistant", content: msg.message }]);
        },
      });
      conversationRef.current = conversation;
    } catch {
      setVoiceStatus("idle");
      onStopVoice();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Voice unavailable. Use text chat instead." },
      ]);
    }
  }, [onStartVoice, onStopVoice]);

  const stopConversation = useCallback(async () => {
    if (conversationRef.current) {
      await conversationRef.current.endSession();
      conversationRef.current = null;
    }
    setVoiceStatus("idle");
    onStopVoice();
  }, [onStopVoice]);

  function handleVoiceToggle() {
    if (voiceStatus !== "idle") stopConversation();
    else startConversation();
  }

  const voiceStatusText =
    voiceStatus === "connecting"
      ? "Connecting..."
      : voiceStatus === "listening"
        ? "Listening — speak now..."
        : voiceStatus === "speaking"
          ? "Hiki is speaking..."
          : null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 rounded-full border-2 border-multroid-blue/40 bg-multroid-glass px-5 py-3 font-heading text-sm font-semibold text-multroid-blue shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all hover:border-multroid-blue hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)]"
        >
          <MicrophoneIcon className="h-5 w-5" />
          Ask Hiki anything
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[620px] -translate-x-1/2 flex-col items-center gap-3 px-3 pb-4 pt-2 sm:gap-4 sm:px-4 sm:pb-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Messages area — always visible when there are messages */}
      {messages.length > 0 && (
        <div className="relative w-full">
          {/* Close button on chat bubbles */}
          <button
            onClick={() => setIsMinimized(true)}
            className="absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full border border-multroid-grey/30 bg-multroid-white/90 text-multroid-grey shadow-sm backdrop-blur-sm transition-all hover:bg-multroid-white hover:text-multroid-dark hover:shadow-md sm:h-8 sm:w-8"
            aria-label="Close chat"
          >
            <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div
            ref={scrollAreaRef}
            className="flex w-full max-h-[280px] flex-col gap-2 overflow-y-auto rounded-3xl border-2 border-multroid-blue bg-multroid-glass-dark/90 p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)] backdrop-blur-md"
          >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 font-heading text-sm leading-relaxed ${
                  msg.role === "assistant"
                    ? "rounded-bl-sm bg-multroid-blue/60 text-multroid-cream"
                    : "rounded-br-sm bg-multroid-white/20 text-multroid-cream"
                }`}
              >
                {msg.content}
                {i === messages.length - 1 && msg.role === "assistant" && isLoading && (
                  <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-multroid-cream" />
                )}
              </div>
            </div>
          ))}
          </div>
        </div>
      )}

      {/* Hint text — only on hover when no messages and idle */}
      {!isActive && isHovered && (
        <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-200 rounded-3xl border-2 border-multroid-blue bg-multroid-glass-dark/90 p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)] backdrop-blur-md">
          <p className="font-heading text-sm leading-relaxed text-multroid-cream">
            Hiki will be answering either by text message here or live
            conversation. Click the microphone to start a live voice chat, or
            type your question below.
          </p>
        </div>
      )}

      {/* Voice status */}
      {voiceStatusText && (
        <div className="flex w-full items-center gap-3 rounded-2xl border-2 border-multroid-blue bg-multroid-glass-dark/90 px-4 py-3 backdrop-blur-md">
          <span
            className={`h-3 w-3 shrink-0 rounded-full ${
              voiceStatus === "speaking"
                ? "animate-pulse bg-green-400"
                : voiceStatus === "listening"
                  ? "animate-pulse bg-red-400"
                  : "bg-yellow-400"
            }`}
          />
          <p className="font-heading text-sm text-multroid-cream">{voiceStatusText}</p>
        </div>
      )}

      {/* Input Bar — glass effect */}
      <div className="flex w-full items-center gap-2.5">
        <div className="flex flex-1 items-center rounded-3xl border-2 border-multroid-blue/40 bg-multroid-glass p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all hover:border-multroid-blue hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex flex-1 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Hiki anything..."
              disabled={voiceStatus !== "idle"}
              className="min-w-0 flex-1 bg-transparent font-heading text-base text-multroid-blue placeholder:text-multroid-blue/50 focus:outline-none disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || voiceStatus !== "idle"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-multroid-blue transition-colors hover:bg-multroid-blue/10 disabled:opacity-30"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Voice Button */}
        <div className="group relative shrink-0">
          <button
            type="button"
            onClick={handleVoiceToggle}
            disabled={isLoading}
            className={`flex items-center rounded-3xl border-2 p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all disabled:opacity-40 ${
              voiceStatus === "listening"
                ? "animate-pulse border-red-500 bg-red-500 text-white"
                : voiceStatus === "speaking"
                  ? "border-multroid-blue bg-multroid-blue text-multroid-white"
                  : voiceStatus === "connecting"
                    ? "border-yellow-500 bg-yellow-500/20 text-yellow-600"
                    : "border-multroid-blue/40 bg-multroid-glass text-multroid-blue hover:border-multroid-blue hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)]"
            }`}
          >
            {voiceStatus === "listening" ? (
              <MicSolid className="h-6 w-6 sm:h-8 sm:w-8" />
            ) : voiceStatus === "speaking" ? (
              <SpeakerWaveIcon className="h-6 w-6 sm:h-8 sm:w-8 animate-pulse" />
            ) : (
              <MicrophoneIcon className="h-6 w-6 sm:h-8 sm:w-8" />
            )}
          </button>

          {/* CTA label — appears to the left on hover, hidden on mobile */}
          {!isActive && isHovered && (
            <div className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 animate-in fade-in slide-in-from-right-2 duration-200 sm:block">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap rounded-2xl bg-multroid-blue px-5 py-2.5 text-sm font-bold text-white shadow-lg">
                  Talk to Hiki live
                </span>
                <svg width="8" height="14" viewBox="0 0 8 14" className="text-multroid-blue">
                  <path d="M8 7L0 0v14z" fill="currentColor" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
