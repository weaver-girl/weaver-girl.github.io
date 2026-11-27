import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/*
 * Page-level motion primitives. Everything here is decoration: no layout
 * changes, nothing under prefers-reduced-motion, and no pointer work on touch
 * devices. The pointer position is written as two CSS custom properties per
 * frame — no React re-render — so decorations lean toward the cursor with
 * plain calc().
 */

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
}

/**
 * Wraps the page and keeps `--pointer-x` / `--pointer-y` (0..1) current on the
 * wrapper. Decorations read them; React never re-renders for them.
 */
export function MotionField({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    if (prefersReducedMotion() || !canHover()) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const flush = () => {
      frame = 0;
      if (!last) return;
      const x = Math.min(1, Math.max(0, last.clientX / window.innerWidth));
      const y = Math.min(1, Math.max(0, last.clientY / window.innerHeight));
      node.style.setProperty("--pointer-x", x.toFixed(3));
      node.style.setProperty("--pointer-y", y.toFixed(3));
    };

    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root} className="motion-field">
      {children}
    </div>
  );
}

/**
 * The reading-progress rail: a clay thread that fills, with a knot riding its
 * tip so the reader can see where they are without reading the bar.
 */
export function ScrollThread({ progress }: { progress: number }) {
  return (
    <div className="scroll-thread" aria-hidden="true">
      <div className="scroll-thread-bar" style={{ transform: `scaleX(${progress})` }} />
      <i
        className="scroll-thread-knot"
        style={{ left: `${progress * 100}%`, opacity: progress > 0.004 ? 1 : 0 }}
      />
    </div>
  );
}

interface SplitHeadingProps {
  text: string;
  className?: string;
  /** Milliseconds between characters. */
  stagger?: number;
  /** Milliseconds before the first character. */
  delay?: number;
  /** Degrees of lean as the heading travels up the viewport. */
  lean?: number;
}

/**
 * A display heading that reveals character by character, rising out of a blur
 * the way a thread is drawn taut, and leans a degree or two while it travels up
 * the viewport. The plain string stays on the h1 for search engines and screen
 * readers; the split spans are hidden from assistive technology.
 */
export function SplitHeading({
  text,
  className,
  stagger = 42,
  delay = 140,
  lean = 1.4,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.style.setProperty("--tilt", "0deg");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // +1 at the very top of the screen, 0 at the midpoint, -1 above it.
      const progress = 1 - Math.min(1, Math.max(0, rect.top / viewport)) * 2;
      node.style.setProperty("--tilt", `${(progress * lean).toFixed(2)}deg`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [lean]);

  const chars = Array.from(text);

  return (
    <h1 ref={ref} className={className ? `split-title ${className}` : "split-title"} aria-label={text}>
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="split-char"
          aria-hidden="true"
          style={{ "--char-delay": `${delay + index * stagger}ms` } as CSSProperties}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </h1>
  );
}

/* -------------------------------------------------------------------------
 * The weave mesh: a sparse field of knots joined by hairlines. It stands in for
 * the cloth the site is named after — warp and weft crossing, a few knots tied
 * where they meet — and slides a fraction of a pixel away from the pointer.
 * ---------------------------------------------------------------------- */

interface Knot {
  x: number;
  y: number;
  tone: string;
}

interface Edge {
  a: number;
  b: number;
  tone: string;
}

/** Hand-placed knots on a 1000×420 canvas, so the field has rhythm, not a grid. */
const KNOTS: Knot[] = [
  { x: 62, y: 96, tone: "clay" },
  { x: 186, y: 38, tone: "olive" },
  { x: 248, y: 172, tone: "slate" },
  { x: 372, y: 84, tone: "ochre" },
  { x: 418, y: 232, tone: "plum" },
  { x: 536, y: 44, tone: "teal" },
  { x: 588, y: 168, tone: "clay" },
  { x: 704, y: 110, tone: "slate" },
  { x: 762, y: 268, tone: "olive" },
  { x: 864, y: 62, tone: "ochre" },
  { x: 928, y: 200, tone: "plum" },
  { x: 132, y: 268, tone: "teal" },
  { x: 302, y: 330, tone: "clay" },
  { x: 486, y: 344, tone: "ochre" },
  { x: 646, y: 318, tone: "teal" },
  { x: 842, y: 350, tone: "slate" },
];

/**
 * Edges join each knot to its two nearest neighbours on the same side of the
 * canvas, then a handful of crossing strands tie the rows together. Deterministic
 * by construction — no randomness, so the drawing never changes between loads.
 */
function buildEdges(): Edge[] {
  const edges: Edge[] = [];
  const seen = new Set<string>();

  KNOTS.forEach((knot, index) => {
    const distances = KNOTS.map((other, otherIndex) => ({
      index: otherIndex,
      d: Math.hypot(other.x - knot.x, other.y - knot.y),
    }))
      .filter((entry) => entry.index !== index)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);

    distances.forEach(({ index: otherIndex }) => {
      const key = index < otherIndex ? `${index}-${otherIndex}` : `${otherIndex}-${index}`;
      if (seen.has(key)) return;
      seen.add(key);
      edges.push({ a: index, b: otherIndex, tone: KNOTS[index].tone });
    });
  });

  return edges;
}

const EDGES = buildEdges();

export function WeaveMesh({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className={`weave-mesh weave-mesh-${tone}`} aria-hidden="true">
      <svg viewBox="0 0 1000 420" preserveAspectRatio="xMidYMid slice" focusable="false">
        <g className="mesh-threads">
          {EDGES.map((edge, index) => {
            const a = KNOTS[edge.a];
            const b = KNOTS[edge.b];
            return (
              <line
                key={`${edge.a}-${edge.b}`}
                className={`mesh-thread tone-${edge.tone}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                style={{ "--mesh-delay": `${index * 90}ms` } as CSSProperties}
              />
            );
          })}
        </g>
        <g className="mesh-knots">
          {KNOTS.map((knot, index) => (
            <circle
              key={`${knot.x}-${knot.y}`}
              className={`mesh-knot tone-${knot.tone}`}
              cx={knot.x}
              cy={knot.y}
              r={index % 4 === 0 ? 3.4 : 2.2}
              style={{ "--knot-delay": `${index * 120}ms` } as CSSProperties}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
