import { fits } from "../data/content";

/**
 * A fork, not two cards: the reader's goal decides the branch. The copy under
 * each branch is the original fit text, kept because it explains the trade-off.
 */
export function FitFork() {
  return (
    <div className="fit-fork">
      <div className="fit-question">
        <span>先问一句</span>
        <b>你要的是底座，还是现成产品？</b>
      </div>
      <div className="fit-branches">
        {fits.map((fit, index) => (
          <article className={`fit-branch tone-${fit.tone}`} key={fit.key}>
            <span className="fit-branch-mark" aria-hidden="true">
              {index === 0 ? "✓" : "✕"}
            </span>
            <div>
              <span className="fit-branch-kicker">
                {index === 0 ? "自建监控 / 安全 / 审计产品" : "直接买现成的 APM 平台"}
              </span>
              <h3>{fit.label}</h3>
              <p>{fit.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
