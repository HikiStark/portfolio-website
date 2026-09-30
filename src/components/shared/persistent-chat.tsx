"use client";

import { ChatOverlay } from "@/components/landing/chat-overlay";

export function PersistentChat() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <div className="pointer-events-auto">
        <ChatOverlay />
      </div>
    </div>
  );
}
