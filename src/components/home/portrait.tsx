"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Dither } from "@/components/site/dither";

/** Pixel-dithered portrait; hover or toggle reveals the photo. */
export function Portrait() {
  const [mode, setMode] = useState<"pixel" | "photo">("pixel");

  return (
    <figure className="flex h-full flex-col">
      <div className="group relative aspect-[4/5] w-full overflow-hidden bg-canvas lg:aspect-auto lg:flex-1">
        <Image
          src="/images/hiki-avatar.png"
          alt="Hikmat Imanov"
          fill
          sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
          className={cn(
            "object-cover object-top transition-opacity duration-500",
            mode === "photo" ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            mode === "photo" ? "opacity-0" : "opacity-100 group-hover:opacity-0",
          )}
        >
          <Dither src="/images/hiki-avatar-small.png" cell={5} bg="#f6f6f6" label="Pixel portrait of Hikmat Imanov" />
        </div>
      </div>
      <figcaption className="flex items-center justify-between gap-4 border-t border-rule px-5 py-4 sm:px-6">
        <span className="text-[14px] text-body">
          <span className="font-medium text-ink">Hikmat Imanov</span> · Munich, Germany
        </span>
        <span role="group" aria-label="Portrait style" className="flex rounded-[9px] border border-[#e3e3e3] bg-surface p-0.5">
          {(["pixel", "photo"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded-[7px] px-2.5 py-1 text-[13px] capitalize transition-colors",
                mode === m ? "bg-hover font-medium text-ink" : "text-subtle hover:text-ink",
              )}
            >
              {m}
            </button>
          ))}
        </span>
      </figcaption>
    </figure>
  );
}
