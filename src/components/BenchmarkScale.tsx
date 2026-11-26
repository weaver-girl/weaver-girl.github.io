import type { CSSProperties } from "react";
import { benchmarkRows } from "../data/content";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

const MIN = 1;
const MAX = 150;
const TICKS = [1, 10, 100];

/** Log-scale position, so a 1 ns decision and a 130 ns decision are both visible. */
function position(value: number) {
  const t = (Math.log10(value) - Math.log10(MIN)) / (Math.log10(MAX) - Math.log10(MIN));
  return Math.max(0, Math.min(100, t * 100));
}

/**
 * A dot plot rather than bars: five hot-path costs span two orders of magnitude,
 * and a linear bar chart would flatten four of them into invisible slivers.
 */
export function BenchmarkScale() {
  return (
    <div className="bench-scale">
      <div className="bench-axis" aria-hidden="true">
        <span />
        <div className="bench-axis-track">
          {TICKS.map((tick) => (
            <span key={tick} style={{ left: `${position(tick)}%` } as CSSProperties}>
              <i />
              {tick} ns
            </span>
          ))}
        </div>
        <span />
      </div>

      {benchmarkRows.map((row, index) => (
        <Reveal
          key={row.key}
          className="bench-row"
          style={{ "--bench-delay": `${index * 90}ms` } as CSSProperties}
          delay={index * 80}
          variant="fade"
        >
          <span className="bench-label">
            {row.label}
            <small>{row.en}</small>
            <span className="bench-note">{row.note}</span>
          </span>
          <span className="bench-track" aria-hidden="true">
            <i style={{ left: `${position(row.value)}%` } as CSSProperties} />
          </span>
          <b className="bench-value">
            <CountUp value={row.value.toFixed(2)} duration={900} /> ns
          </b>
        </Reveal>
      ))}
    </div>
  );
}
