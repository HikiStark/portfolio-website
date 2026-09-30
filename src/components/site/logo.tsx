import Link from "next/link";
import { cn } from "@/lib/utils";

// 5×5 pixel "H" — the same glyph as the favicon.
const H_PIXELS = [
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
];

export function PixelMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-6 text-brand", className)}>
      {H_PIXELS.flatMap((row, y) =>
        row.map((on, x) =>
          on ? <rect key={`${x}-${y}`} x={x * 5} y={y * 5} width={4} height={4} fill="currentColor" /> : null,
        ),
      )}
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Hiki — home" className={cn("flex items-center gap-2.5", className)}>
      <PixelMark />
      <span className="text-[26px] leading-none font-medium tracking-[-0.05em] text-ink">hiki</span>
    </Link>
  );
}
