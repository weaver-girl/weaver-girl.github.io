import { docLinks, docTopics } from "../data/content";

const TONES = ["clay", "olive", "ochre", "slate"];

/**
 * The reading order as a route: four stations, the number of documents at each,
 * and arrows between them. The cards below are the destinations; this is the
 * map.
 */
export function DocRoute() {
  return (
    <div
      className="doc-route"
      role="img"
      aria-label="文档按四个阶段排列：先弄清楚、接进系统、放到线上、长期维护；每个阶段分别有若干篇文档。"
    >
      {docTopics.map((topic, index) => {
        const count = docLinks.filter((doc) => doc.topic === topic.key).length;
        return (
          <div className="doc-route-stop" key={topic.key}>
            {index > 0 && (
              <span className="doc-route-arrow" aria-hidden="true">
                →
              </span>
            )}
            <div className={`doc-route-node tone-${TONES[index] ?? "clay"}`}>
              <span className="doc-route-index">{String(index + 1).padStart(2, "0")}</span>
              <b>{topic.label}</b>
              <small>{topic.hint}</small>
              <em>{count} 篇</em>
            </div>
          </div>
        );
      })}
    </div>
  );
}
