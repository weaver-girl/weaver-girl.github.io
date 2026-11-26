import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { docLinks, docTopics } from "../data/content";

export function DocsPage() {
  return (
    <>
      <PageHero
        kicker="DOCS & CONTRACT"
        title="文档与契约"
        lede="文档和代码放在同一个仓库、同一个版本。下面按“先看懂、再接入、再上线、再维护”的顺序排好，从上往下读即可。"
      />
      <div className="page-body">
        <Reveal className="doc-path" variant="fade">
          {docTopics.map((topic, index) => (
            <span key={topic.key} className="doc-path-step">
              <i aria-hidden="true">0{index + 1}</i>
              {topic.label}
            </span>
          ))}
        </Reveal>

        {docTopics.map((topic, index) => {
          const docs = docLinks.filter((doc) => doc.topic === topic.key);
          return (
            <Reveal
              as="section"
              key={topic.key}
              className={`doc-topic doc-topic-${topic.key}`}
              delay={index * 40}
            >
              <header className="doc-topic-head">
                <span className="doc-topic-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <h2 className="subhead">{topic.label}</h2>
                <p>{topic.hint}</p>
              </header>
              <div className="doc-grid">
                {docs.map((doc) => (
                  <a
                    key={doc.href}
                    className="doc-card"
                    href={doc.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="doc-kicker">{doc.title}</span>
                    <h3>{doc.description}</h3>
                    <span className="doc-open">打开 →</span>
                  </a>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
