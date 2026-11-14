import { PageHero } from "../components/PageHero";
import { docLinks } from "../data/content";

export function DocsPage() {
  return (
    <>
      <PageHero
        kicker="DOCS & CONTRACT"
        title="文档与契约"
        lede="文档和代码放在同一个仓库、同一个版本。想先弄清楚它是什么，读产品定位；准备接进系统，读架构和插件指南。"
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
