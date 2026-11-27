import type { CSSProperties } from "react";
import { outcomes } from "../data/content";

/**
 * One base, three products: a single rail with three taps. A spark leaves the
 * core and runs down each tap's lead one after another, so the reuse reads as
 * one thing powering three outputs. The cards below carry the detail.
 */
export function OutcomeBus() {
  return (
    <div className="outcome-bus" aria-hidden="true">
      <span className="bus-rail" />
      <div className="bus-core">
        <b>同一块底座</b>
        <small>发现 · 织入 · 导出</small>
      </div>
      <div className="bus-taps">
        {outcomes.map((outcome, index) => (
          <div
            className={`bus-tap tone-${outcome.tone}`}
            key={outcome.key}
            style={{ "--tap-delay": `${index * 0.9}s` } as CSSProperties}
          >
            <span className="bus-lead" />
            <i />
            <b>{outcome.en.split(" · ")[0]}</b>
            <span className="bus-tap-label">{outcome.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
