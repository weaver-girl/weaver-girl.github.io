import { PageHero } from "../components/PageHero";
import { docLinks } from "../data/content";

export function DocsPage() {
  return (
    <>
      <PageHero
        kicker="DOCS & CONTRACT"
        title="文档与契约"
        lede="完整文档随源码一起维护在 docs 目录，保证和代码同一个版本。先读定位与架构，再决定要不要把它接进产品。"
      />
      <div className="page-body">
      <div className="doc-grid" style={{ marginTop: 36 }}>
        {docLinks.map((doc, i) => (
          <a key={doc.href} className="doc-card" href={doc.href} target="_blank" rel="noreferrer">
            <span className="doc-kicker">{String(i + 1).padStart(2, "0")} · 仓库文档</span>
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
          </a>
        ))}
      </div>
      </div>
    </>
  );
}
