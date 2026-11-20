import { Suspense, lazy, useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { RouteMeta } from "./components/RouteMeta";
import { REPO_URL } from "./data/content";
import { HomePage } from "./pages/HomePage";

// The home page is the landing target; the other five routes are split out so a
// visitor who only reads the overview does not download antd's table, tabs and steps.
const ArchitecturePage = lazy(() =>
  import("./pages/ArchitecturePage").then((m) => ({ default: m.ArchitecturePage })),
);
const CasesPage = lazy(() => import("./pages/CasesPage").then((m) => ({ default: m.CasesPage })));
const DocsPage = lazy(() => import("./pages/DocsPage").then((m) => ({ default: m.DocsPage })));
const PluginsPage = lazy(() => import("./pages/PluginsPage").then((m) => ({ default: m.PluginsPage })));
const QuickStartPage = lazy(() =>
  import("./pages/QuickStartPage").then((m) => ({ default: m.QuickStartPage })),
);

const NAV = [
  { key: "/", label: "概览" },
  { key: "/architecture", label: "架构" },
  { key: "/plugins", label: "插件" },
  { key: "/cases", label: "验证" },
  { key: "/quick-start", label: "构建" },
  { key: "/docs", label: "文档" },
];

export default function App() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Pages serves /cases/ from cases/index.html; normalize the trailing slash so the nav
  // still highlights the current section on a direct visit.
  const normalized = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const current = NAV.some((item) => item.key === normalized) ? normalized : "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // BrowserRouter keeps the window position across navigations, so a link at the
  // bottom of one page would open the next page half-way down. Reset to the top,
  // and keep in-page anchors (/#problem) working.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const target = hash ? document.getElementById(hash) : null;
    if (target) {
      target.scrollIntoView({ block: "start" });
      // The skip link points at #main; drop it so later navigations start clean.
      if (hash === "main") {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Close the mobile menu on resize/blur so it never blocks a page underneath.
  useEffect(() => {
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <RouteMeta />
      <header className={scrolled ? "nav scrolled" : "nav"}>
        <a
          className="skip-link"
          href="#main"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("main")?.focus();
          }}
        >
          跳到正文
        </a>
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          {/* Same mark as favicon.svg, so the tab and the header read as one brand. */}
          <BrandMark size={20} />
          <span>weaver-girl</span>
        </Link>
        <nav className={open ? "nav-links open" : "nav-links"}>
          {NAV.map((item) => (
            <Link
              key={item.key}
              to={item.key}
              className={item.key === current ? "active" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-github" href={REPO_URL} target="_blank" rel="noreferrer">
            <GithubMark />
            <span>GitHub</span>
          </a>
          <Link to="/quick-start" className="nav-cta">
            开始接入
          </Link>
          <button className="nav-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            菜单
          </button>
        </div>
      </header>

      <main className="page" id="main" tabIndex={-1}>
        <Suspense fallback={<div className="route-loading" role="status">正在加载…</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quick-start" element={<QuickStartPage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/plugins" element={<PluginsPage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <Link to="/" className="footer-brand">
              <BrandMark size={22} />
              <span>weaver-girl</span>
            </Link>
            <p className="footer-about">
              JVM 切面底座：把监控、安全、审计这类能力做成插件，放进目录就生效，业务代码一行不改。
            </p>
          </div>
          <div className="footer-col">
            <h3>了解</h3>
            <ul>
              <li>
                <Link to="/architecture">架构与隔离</Link>
              </li>
              <li>
                <Link to="/plugins">插件清单</Link>
              </li>
              <li>
                <Link to="/cases">可运行验证</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>接入</h3>
            <ul>
              <li>
                <Link to="/quick-start">构建与挂载</Link>
              </li>
              <li>
                <Link to="/docs">文档与契约</Link>
              </li>
              <li>
                <a href={`${REPO_URL}/tree/main/weaver-girl-plugin-template`} target="_blank" rel="noreferrer">
                  插件模板
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>源码</h3>
            <ul>
              <li>
                <a href={REPO_URL} target="_blank" rel="noreferrer">
                  GitHub 仓库
                </a>
              </li>
              <li>
                <a href={`${REPO_URL}/blob/main/CHANGELOG.md`} target="_blank" rel="noreferrer">
                  变更记录
                </a>
              </li>
              <li>
                <a href={`${REPO_URL}/blob/main/LICENSE`} target="_blank" rel="noreferrer">
                  MIT 许可
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-meta-row">
          <span>weaver-girl / hook base</span>
          <span>MIT · Java 8–21 · pre-1.0</span>
          <span>文档与代码同一个版本</span>
        </div>
      </footer>
    </>
  );
}

/** The diamond mark, drawn once so header, favicon and footer stay identical. */
function BrandMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7.5" fill="currentColor" />
      <path d="M16 5.4 26.6 16 16 26.6 5.4 16Z" fill="#faf9f5" />
      <path d="M16 12 20 16l-4 4-4-4Z" fill="currentColor" />
    </svg>
  );
}

function GithubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
