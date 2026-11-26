import type { CaseTrace as CaseTraceData } from "../data/content";

interface Props {
  trace: CaseTraceData;
  tone: string;
}

/**
 * A call path with one marked weave point. The middle node is the real class or
 * method named by the plugin; the callout says what changes at that point.
 */
export function CaseTrace({ trace, tone }: Props) {
  return (
    <div className={`case-trace tone-${tone}`}>
      <div className="case-trace-path">
        <span className="trace-node">{trace.from}</span>
        <span className="trace-arrow" aria-hidden="true">
          →
        </span>
        <span className="trace-node trace-node-method">
          <small>织入点</small>
          <code>{trace.method}</code>
        </span>
        <span className="trace-arrow" aria-hidden="true">
          →
        </span>
        <span className="trace-node">{trace.to}</span>
      </div>
      <div className="trace-callout">
        <span className="trace-stem" aria-hidden="true" />
        <div className="trace-card">
          <span className="trace-kicker">插件在做什么</span>
          <b>{trace.tap}</b>
          <small>{trace.effect}</small>
        </div>
      </div>
    </div>
  );
}
