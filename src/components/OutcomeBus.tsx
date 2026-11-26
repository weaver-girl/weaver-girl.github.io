import { outcomes } from "../data/content";

/**
 * One base, three products: a single rail with three taps. The cards below carry
 * the detail; this drawing makes the reuse visible before the reader gets there.
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
        {outcomes.map((outcome) => (
          <div className={`bus-tap tone-${outcome.tone}`} key={outcome.key}>
            <i />
            <b>{outcome.en.split(" · ")[0]}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
