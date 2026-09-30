import { cn } from "@/lib/utils";

// Isometric line illustrations in the style of the reference's product card.
// World units: x runs right-down, y runs left-down, z runs up.

type Vec = [number, number, number];
type Tone = "light" | "brand" | "glass";
type Shape =
  | { kind: "box"; at: Vec; size: Vec; tone?: Tone }
  | { kind: "line"; points: Vec[] }
  | { kind: "node"; at: Vec };

const UNIT = 18;
const COS = Math.cos(Math.PI / 6);
const BRAND = "#4033ff";

const TONES: Record<Tone, { top: string; left: string; right: string }> = {
  light: { top: "#ffffff", left: "#e3e0ff", right: "#c9c3ff" },
  brand: { top: "#6d64ff", left: "#4033ff", right: "#2a1fd6" },
  glass: { top: "rgba(64,51,255,0.05)", left: "rgba(64,51,255,0.08)", right: "rgba(64,51,255,0.12)" },
};

const project = ([x, y, z]: Vec): [number, number] => [(x - y) * COS * UNIT, ((x + y) * 0.5 - z) * UNIT];

const SCENES: Record<"hub" | "notiva" | "robotics" | "lab", Shape[]> = {
  // Glass cube fed by three blocks — the reference card's composition.
  hub: [
    { kind: "line", points: [[0.6, 7.2, 0], [3.2, 7.2, 0], [3.2, 4.6, 0], [5.4, 4.6, 0]] },
    { kind: "line", points: [[1.4, 2.4, 0], [5.4, 2.4, 0]] },
    { kind: "line", points: [[8, 9.4, 0], [8, 6.6, 0]] },
    { kind: "node", at: [3.2, 7.2, 0] },
    { kind: "node", at: [8, 8.2, 0] },
    { kind: "box", at: [0, 1.8, 0], size: [1.3, 1.3, 1.3], tone: "brand" },
    { kind: "box", at: [5.4, 1, 0], size: [5.4, 5.4, 5.4], tone: "glass" },
    { kind: "box", at: [5.4, 1, 0], size: [5.4, 5.4, 1.6], tone: "brand" },
    { kind: "box", at: [0, 6.6, 0], size: [1.3, 1.3, 1.3], tone: "light" },
    { kind: "box", at: [7.4, 9.4, 0], size: [1.3, 1.3, 1.3], tone: "brand" },
  ],
  // Documents flowing into the agent, which fans out into actions.
  notiva: [
    { kind: "line", points: [[1.4, 3, 0], [6, 3, 0]] },
    { kind: "line", points: [[11, 1.2, 0], [13, 1.2, 0]] },
    { kind: "line", points: [[11, 3.4, 0], [13, 3.4, 0]] },
    { kind: "line", points: [[11, 5.6, 0], [13, 5.6, 0]] },
    { kind: "node", at: [3.7, 3, 0] },
    { kind: "box", at: [-2, 1.2, 0], size: [3.4, 3.8, 0.25], tone: "light" },
    { kind: "box", at: [-2, 1.2, 0.7], size: [3.4, 3.8, 0.25], tone: "light" },
    { kind: "box", at: [-2, 1.2, 1.4], size: [3.4, 3.8, 0.25], tone: "brand" },
    { kind: "box", at: [6, 0.2, 0], size: [5, 5, 5], tone: "glass" },
    { kind: "box", at: [6, 0.2, 0], size: [5, 5, 1.8], tone: "brand" },
    { kind: "box", at: [13, 0.6, 0], size: [1.2, 1.2, 1.2], tone: "brand" },
    { kind: "box", at: [13, 2.8, 0], size: [1.2, 1.2, 1.2], tone: "light" },
    { kind: "box", at: [13, 5, 0], size: [1.2, 1.2, 1.2], tone: "light" },
  ],
  // Arm over a conveyor carrying parts.
  robotics: [
    { kind: "box", at: [1, 7, 0], size: [11, 1.8, 0.6], tone: "light" },
    { kind: "box", at: [2.2, 7.4, 0.6], size: [1, 1, 1], tone: "light" },
    { kind: "box", at: [3.4, 3, 0], size: [2.2, 2.2, 0.8], tone: "light" },
    { kind: "box", at: [4, 3.6, 0.8], size: [1, 1, 3.6], tone: "brand" },
    { kind: "box", at: [4, 3.6, 4.4], size: [1, 4.4, 1], tone: "light" },
    { kind: "box", at: [4.1, 7.2, 2.6], size: [0.8, 0.8, 1.8], tone: "brand" },
    { kind: "box", at: [4.05, 7.4, 0.6], size: [1, 1, 1], tone: "brand" },
    { kind: "box", at: [7.6, 7.4, 0.6], size: [1, 1, 1], tone: "light" },
    { kind: "box", at: [10, 7.4, 0.6], size: [1, 1, 1], tone: "brand" },
  ],
  // A grid of experiments at different heights.
  lab: [
    { kind: "box", at: [0, 0, 0], size: [2, 2, 1.2], tone: "light" },
    { kind: "box", at: [3, 0, 0], size: [2, 2, 2.6], tone: "brand" },
    { kind: "box", at: [6, 0, 0], size: [2, 2, 0.8], tone: "light" },
    { kind: "box", at: [0, 3, 0], size: [2, 2, 2], tone: "light" },
    { kind: "box", at: [3, 3, 0], size: [2, 2, 4], tone: "glass" },
    { kind: "box", at: [3, 3, 0], size: [2, 2, 1.8], tone: "brand" },
    { kind: "box", at: [6, 3, 0], size: [2, 2, 3], tone: "light" },
    { kind: "box", at: [0, 6, 0], size: [2, 2, 0.6], tone: "brand" },
    { kind: "box", at: [3, 6, 0], size: [2, 2, 1.4], tone: "light" },
    { kind: "box", at: [6, 6, 0], size: [2, 2, 2.2], tone: "light" },
  ],
};

function boxFaces({ at: [x, y, z], size: [w, d, h] }: { at: Vec; size: Vec }) {
  const pts = (vs: Vec[]) => vs.map((v) => project(v).map((n) => n.toFixed(1)).join(",")).join(" ");
  return {
    top: pts([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]]),
    left: pts([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]]),
    right: pts([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]]),
  };
}

function bounds(shapes: Shape[]) {
  const corners: Vec[] = shapes.flatMap((s): Vec[] => {
    if (s.kind === "line") return s.points;
    if (s.kind === "node") return [s.at];
    const [x, y, z] = s.at;
    const [w, d, h] = s.size;
    return [0, 1].flatMap((i) =>
      [0, 1].flatMap((j) => [0, 1].map((k): Vec => [x + i * w, y + j * d, z + k * h])),
    );
  });
  const xs = corners.map((c) => project(c)[0]);
  const ys = corners.map((c) => project(c)[1]);
  const pad = 16;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  return `${minX.toFixed(0)} ${minY.toFixed(0)} ${(Math.max(...xs) - minX + pad).toFixed(0)} ${(Math.max(...ys) - minY + pad).toFixed(0)}`;
}

export function IsoScene({ scene, className }: { scene: keyof typeof SCENES; className?: string }) {
  const shapes = SCENES[scene];
  return (
    <svg viewBox={bounds(shapes)} aria-hidden className={cn("h-auto w-full", className)}>
      <g stroke={BRAND} strokeWidth={1.2} strokeLinejoin="round" strokeLinecap="round">
        {shapes.map((s, i) => {
          if (s.kind === "line") {
            const d = s.points.map((p, j) => `${j ? "L" : "M"}${project(p).join(",")}`).join(" ");
            return <path key={i} d={d} fill="none" />;
          }
          if (s.kind === "node") {
            const [cx, cy] = project(s.at);
            return <ellipse key={i} cx={cx} cy={cy} rx={11} ry={6.4} fill="#ffffff" />;
          }
          const faces = boxFaces(s);
          const tone = TONES[s.tone ?? "light"];
          const [x, y, z] = s.at;
          const [w, d, h] = s.size;
          // Glass shows its hidden back edges, like the reference wireframe cube.
          // Scenes list a glass box before its "liquid" so the fill hides those edges.
          const back =
            s.tone === "glass"
              ? ([[x + w, y, z], [x, y + d, z], [x, y, z + h]] as Vec[])
                  .map((p) => `M${project([x, y, z]).join(",")} L${project(p).join(",")}`)
                  .join(" ")
              : null;
          return (
            <g key={i}>
              {back && <path d={back} fill="none" strokeOpacity={0.35} />}
              <polygon points={faces.left} fill={tone.left} />
              <polygon points={faces.right} fill={tone.right} />
              <polygon points={faces.top} fill={tone.top} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
