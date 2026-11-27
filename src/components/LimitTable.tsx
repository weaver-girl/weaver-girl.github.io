import { joinPointLimits } from "../data/content";

/**
 * The engine's limits, stated where a reader decides whether to adopt it. A hook
 * written without knowing these looks correct and silently behaves differently,
 * so listing them here is more honest than leaving them in a document nobody
 * opens before the first integration.
 */
export function LimitTable() {
  return (
    <div className="limit-table" role="table" aria-label="各织入位置的能力边界">
      <div className="limit-head" role="row">
        <span role="columnheader">位置</span>
        <span role="columnheader">做不到什么</span>
        <span role="columnheader">该怎么绕</span>
      </div>
      {joinPointLimits.map((row) => (
        <div className="limit-row" role="row" key={row.joint}>
          <span className="limit-joint" role="cell">
            {row.joint}
          </span>
          <span className="limit-why" role="cell">
            <em className="limit-tag" aria-hidden="true">
              做不到
            </em>
            {row.limit}
          </span>
          <span className="limit-instead" role="cell">
            <em className="limit-tag" aria-hidden="true">
              怎么办
            </em>
            {row.instead}
          </span>
        </div>
      ))}
    </div>
  );
}
