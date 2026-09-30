"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Ordered (Bayer 8×8) dithering — gives the checkerboard / cross textures
// seen in the reference's blue pixel fields.
const BAYER8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];
const threshold = (x: number, y: number) => (BAYER8[y & 7][x & 7] + 0.5) / 64;

function hash(x: number, y: number, seed: number) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 144269504)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function noise(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = (x - xi) * (x - xi) * (3 - 2 * (x - xi));
  const v = (y - yi) * (y - yi) * (3 - 2 * (y - yi));
  const a = hash(xi, yi, seed);
  const b = hash(xi + 1, yi, seed);
  const c = hash(xi, yi + 1, seed);
  const d = hash(xi + 1, yi + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

const fbm = (x: number, y: number, seed: number) => 0.65 * noise(x, y, seed) + 0.35 * noise(x * 2.3, y * 2.3, seed + 11);
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (a: number, b: number, t: number) => {
  const k = clamp((t - a) / (b - a));
  return k * k * (3 - 2 * k);
};

/** Density of foreground pixels (0–1) for a cell. x/y in cells, u/v normalised. */
type Field = (x: number, y: number, u: number, v: number, seed: number) => number;

const FIELDS: Record<"cta" | "band", Field> = {
  // Dense at the left and right edges and along the top, sparse bottom-centre.
  cta: (x, y, u, v, seed) => {
    const edges = Math.max((1 - smooth(0, 0.4, u)) * 0.8, smooth(0.58, 1, u) * 0.6, (1 - smooth(0, 0.45, v)) * 0.45);
    const n = fbm(x / 13, y / 13, seed);
    const hole = (1 - Math.abs(u - 0.52) * 2.2) * smooth(0.55, 1, v);
    return clamp(edges + (n - 0.5) * 0.6 - 0.04 - Math.max(0, hole) * 0.55);
  },
  // Clusters and loose pixels, thickening towards the right edge.
  band: (x, y, u, _v, seed) => clamp((fbm(x / 8, y / 8, seed) - 0.5) * 2.2 + (u - 0.45) * 0.9),
};

type DitherProps = {
  /** Procedural field to render; ignored when `src` is set. */
  field?: keyof typeof FIELDS;
  /** Image to dither (dark areas become foreground pixels). */
  src?: string;
  /** Cell size in CSS pixels. */
  cell?: number;
  fg?: string;
  bg?: string;
  seed?: number;
  className?: string;
  label?: string;
};

export function Dither({
  field = "cta",
  src,
  cell = 10,
  fg = "#4033ff",
  bg = "transparent",
  seed = 7,
  className,
  label,
}: DitherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let frame = 0;
    let image: HTMLImageElement | null = null;

    // Per-cell luminance of the image, cover-fitted to the grid.
    const sampleImage = (img: HTMLImageElement, cols: number, rows: number) => {
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return null;
      const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      octx.imageSmoothingQuality = "high";
      octx.drawImage(img, (cols - w) / 2, (rows - h) * 0.15, w, h);
      const { data } = octx.getImageData(0, 0, cols, rows);
      const lum = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        const a = data[i * 4 + 3] / 255;
        const l = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
        lum[i] = l * a;
      }
      return lum;
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cols = Math.ceil(rect.width / cell);
      const rows = Math.ceil(rect.height / cell);
      const step = cell * dpr;
      const lum = image ? sampleImage(image, cols, rows) : null;
      const density = FIELDS[field];

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (bg !== "transparent") {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.fillStyle = fg;
      for (let y = 0; y < rows; y++) {
        const y0 = Math.round(y * step);
        const y1 = Math.round((y + 1) * step);
        for (let x = 0; x < cols; x++) {
          let on: boolean;
          if (lum) {
            // Tone curve: lift mid-tones so faces keep detail.
            const t = clamp((lum[y * cols + x] - 0.06) / 0.8) ** 0.85;
            on = t < threshold(x, y);
          } else {
            on = density(x, y, x / cols, y / rows, seed) > threshold(x, y);
          }
          if (on) {
            const x0 = Math.round(x * step);
            ctx.fillRect(x0, y0, Math.round((x + 1) * step) - x0, y1 - y0);
          }
        }
      }
      setDrawn(true);
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(canvas);

    if (src) {
      const img = new Image();
      img.src = src;
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          image = img;
          schedule();
        })
        .catch(() => {});
    } else {
      schedule();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [field, src, cell, fg, bg, seed]);

  return (
    <canvas
      ref={canvasRef}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("block size-full transition-opacity duration-500", drawn ? "opacity-100" : "opacity-0", className)}
    />
  );
}
