import { Suspense, lazy, useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { GitHubStars } from "./components/GitHubStars";
import { MotionField, ScrollThread } from "./components/Motion";
import { SectionRail } from "./components/SectionRail";
import { RouteMeta } from "./components/RouteMeta";
import { PLUGIN_TEMPLATE_URL, REPO_URL } from "./data/content";
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

/** A 2px thread of clay across the top of the page: reading progress, not decoration alone. */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <ScrollThread progress={progress} />;
}

export default function App() {
  const { pathname, hash: rawHash } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Pages serves /cases/ from cases/index.html; normalize the trailing slash so the nav
  // still highlights the current section on a direct visit.
  const normalized = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const current = NAV.some((item) => item.key === normalized) ? normalized : "/";
  const hash = rawHash.slice(1);

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
  }, [pathname, hash]);

  // Close the mobile menu on resize/blur so it never blocks a page underneath.
  useEffect(() => {
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <MotionField>
      <RouteMeta />
      <ScrollProgress />
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
          <GitHubStars />
          <Link to="/quick-start" className="nav-cta">
            开始接入
          </Link>
          <button className="nav-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            菜单
          </button>
        </div>
      </header>

      <main className="page" id="main" tabIndex={-1}>
        <SectionRail />
        <Suspense fallback={<div className="route-loading" role="status">正在加载…</div>}>
          {/* Keying by path replays the fade on every navigation instead of swapping in place. */}
          <div className="route-body" key={pathname}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quick-start" element={<QuickStartPage />} />
              <Route path="/cases" element={<CasesPage />} />
              <Route path="/plugins" element={<PluginsPage />} />
              <Route path="/architecture" element={<ArchitecturePage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Suspense>
      </main>

      <footer className="site-footer">
        <div className="footer-weave" aria-hidden="true" />
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
                <a href={PLUGIN_TEMPLATE_URL} target="_blank" rel="noreferrer">
                  插件模板
                </a>
              </li>
              <li>
                <Link to="/#contact">加微信详聊</Link>
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
          <span>MIT · Java 8–21</span>
          <span>1.0.0 · 2026-11-24</span>
          <span>文档与代码同一个版本</span>
        </div>
      </footer>
    </MotionField>
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
