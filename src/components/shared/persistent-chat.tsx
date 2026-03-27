"use client";

import { useState } from "react";
import { ChatOverlay } from "@/components/landing/chat-overlay";

export function PersistentChat() {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <div className="pointer-events-auto">
        <ChatOverlay
          onStartVoice={() => setIsVoiceActive(true)}
          onStopVoice={() => setIsVoiceActive(false)}
          isVoiceActive={isVoiceActive}
        />
      </div>
    </div>
  );
}
