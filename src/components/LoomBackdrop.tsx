import type { CSSProperties } from "react";

const WARP_X = Array.from({ length: 16 }, (_, i) => 34 + i * 38);

const WEFT = [
  "M-20 118 C 70 92, 150 144, 240 118 S 400 92, 490 118 S 600 144, 680 118",
  "M-20 244 C 70 218, 150 270, 240 244 S 400 218, 490 244 S 600 270, 680 244",
  "M-20 370 C 70 344, 150 396, 240 370 S 400 344, 490 370 S 600 396, 680 370",
];

const TONES = [
  "var(--clay-mark)",
  "var(--olive-mark)",
  "var(--ochre-mark)",
  "var(--slate-mark)",
  "var(--plum-mark)",
  "var(--teal-mark)",
];

const KNOTS = [
  { x: 110, y: 118, tone: 0 },
  { x: 224, y: 244, tone: 1 },
  { x: 338, y: 370, tone: 3 },
  { x: 452, y: 118, tone: 4 },
  { x: 566, y: 244, tone: 5 },
  { x: 186, y: 370, tone: 2 },
];

interface LoomBackdropProps {
  className?: string;
  /** Dark bands get brighter strokes; the page paper gets muted ones. */
  tone?: "light" | "dark";
}

/**
 * A loom: warp threads drawn top to bottom, weft threads sliding across them.
 * Purely decorative — it gives the flat paper a slow, quiet texture without a
 * gradient wash behind the copy.
 */
export function LoomBackdrop({ className, tone = "light" }: LoomBackdropProps) {
  const classes = ["loom", tone === "dark" ? "loom-dark" : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <div className={classes} aria-hidden="true">
      <svg viewBox="0 0 640 520" preserveAspectRatio="xMidYMid slice" focusable="false">
        <g className="loom-warp">
          {WARP_X.map((x, i) => (
            <path
              key={x}
              d={`M${x} -30 C ${x + 16} 90, ${x - 16} 190, ${x} 290 S ${x + 14} 410, ${x - 8} 520`}
              pathLength={1}
              style={
                {
                  stroke: TONES[i % TONES.length],
                  "--loom-delay": `${i * 85}ms`,
                } as CSSProperties
              }
            />
          ))}
        </g>
        <g className="loom-weft">
          {WEFT.map((d, i) => (
            <path
              key={d}
              d={d}
              style={
                {
                  stroke: TONES[(i + 2) % TONES.length],
                  "--loom-delay": `${i * 1.7}s`,
                } as CSSProperties
              }
            />
          ))}
        </g>
        <g className="loom-knots">
          {KNOTS.map((knot, i) => (
            <circle
              key={`${knot.x}-${knot.y}`}
              cx={knot.x}
              cy={knot.y}
              r={2.6}
              style={
                {
                  fill: TONES[knot.tone],
                  "--loom-delay": `${600 + i * 220}ms`,
                } as CSSProperties
              }
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
