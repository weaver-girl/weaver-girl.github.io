import { afterBase, beforeBase } from "../data/content";

const WITHOUT = ["改业务代码", "排期", "回归", "重新发布"];
const WITH = ["放入 plugins/", "启动时加载", "生效"];

/**
 * Two delivery tracks, drawn as routes rather than bullet lists.
 *
 * The point of the section is the shape of the work — a loop that runs once per
 * capability, versus a one-time attachment — so the stages carry the argument and
 * the original bullets stay underneath as evidence, not as the main event.
 */
export function DeliveryTracks() {
  return (
    <div className="route-compare">
      <article className="route-lane route-lane-without">
        <header className="route-lane-head">
          <span className="route-lane-mark" aria-hidden="true" />
          <div>
            <b>没有底座</b>
            <small>每加一项能力，重走一遍</small>
          </div>
          <span className="route-tag">几周</span>
        </header>
        <div className="route-flow" aria-label="没有底座时的交付路径">
          {WITHOUT.map((stage, index) => (
            <span className="route-stage" key={stage}>
              {index > 0 && (
                <i className="route-arrow" aria-hidden="true">
                  →
                </i>
              )}
              {stage}
            </span>
          ))}
        </div>
        <ul className="route-notes">
          {beforeBase.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="route-lane route-lane-with">
        <header className="route-lane-head">
          <span className="route-lane-mark" aria-hidden="true" />
          <div>
            <b>有 weaver-girl</b>
            <small>接入一次，之后只加 jar</small>
          </div>
          <span className="route-tag route-tag-accent">一次接入</span>
        </header>
        <div className="route-flow" aria-label="有底座时的交付路径">
          {WITH.map((stage, index) => (
            <span className="route-stage" key={stage}>
              {index > 0 && (
                <i className="route-arrow" aria-hidden="true">
                  →
                </i>
              )}
              {stage}
            </span>
          ))}
          <span className="route-branch">
            <i aria-hidden="true">↳</i>
            插件隔离，坏了只摘自己
          </span>
        </div>
        <ul className="route-notes">
          {afterBase.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}
