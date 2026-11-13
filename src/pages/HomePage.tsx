import { Link } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";
import {
  REPO_URL,
  basePrimitives,
  bootLines,
  boundaries,
  caseStudies,
  contractApis,
  coverageRows,
  guarantees,
  pluginSkeleton,
  quickStart,
} from "../data/content";

const FLOW = [
  { name: "premain", text: "挂入目标 JVM" },
  { name: "plugins/", text: "按 jar 发现能力" },
  { name: "registry", text: "登记切点与配置" },
  { name: "advice", text: "内联进目标方法" },
];

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="kicker">
            <span className="kicker-index">00</span>
            JVM INSTRUMENTATION / HOOK BASE
          </p>
          <h1>
            切面底座
            <span className="h1-sub">给 JVM 应用的一层可编程切面。</span>
          </h1>
          <p className="lede">
            weaver-girl 把切点织入、隔离加载与数据上报做成 JVM 基础设施。APM、IAST、RASP、
            审计与韧性，都是在它之上长出来的切面应用。
          </p>
          <div className="cta-row">
            <Link to="/architecture" className="btn btn-primary">
              看看架构
            </Link>
            <a
              href={`${REPO_URL}/blob/main/docs/plugin-developer-guide.md`}
              className="btn btn-ghost"
              target="_blank"
              rel="noreferrer"
            >
              写一个插件
            </a>
          </div>
          <dl className="hero-spec">
            <div>
              <dt>契约面</dt>
              <dd>weaver-girl-api</dd>
            </div>
            <div>
              <dt>拦截</dt>
              <dd>method · field · catch</dd>
            </div>
            <div>
              <dt>JDK</dt>
              <dd>8 – 21</dd>
            </div>
            <div>
              <dt>许可</dt>
              <dd>MIT</dd>
            </div>
          </dl>
        </div>

        <aside className="system-panel" aria-label="Agent 启动时的契约面">
          <div className="panel-bar">
            <span className="panel-title">agent.boot</span>
            <span className="panel-status">JVM · attached</span>
          </div>
          <div className="panel-command">
            <span className="panel-prompt">$</span>
            <code>-javaagent:weaver-girl-agent.jar=config=weaver.yml</code>
          </div>
          <dl className="panel-lines">
            {bootLines.map((line) => (
              <div key={line.key}>
                <dt>{line.key}</dt>
                <dd>{line.value}</dd>
              </div>
            ))}
          </dl>
          <p className="panel-foot">base / product boundary</p>
        </aside>
      </section>

      <section className="section wrap" id="primitives">
        <header className="section-head">
          <p className="eyebrow">
            <span>01</span> 职责
          </p>
          <h2>四项基础能力。</h2>
          <p className="section-lede">
            织入、配置、上报、加载。四项之外的规则、存储和界面，留给切面应用与管控层。
            边界清楚，升级才轻松。
          </p>
        </header>
        <ol className="primitive-list">
          {basePrimitives.map((primitive) => (
            <li key={primitive.n} className="primitive">
              <span className="primitive-n">{primitive.n}</span>
              <div className="primitive-main">
                <h3>
                  {primitive.name}
                  <span>{primitive.en}</span>
                </h3>
                <p>{primitive.detail}</p>
              </div>
              <code className="primitive-impl">{primitive.impl}</code>
            </li>
          ))}
        </ol>
      </section>

      <section className="boundary-section">
        <div className="wrap">
          <header className="section-head section-head-invert">
            <p className="eyebrow">
              <span>02</span> 边界
            </p>
            <h2>三层责任，各归其位。</h2>
            <p className="section-lede">
              同一个 agent 可以承载多个产品。底座、切面应用与管控各管一层，
              出了问题也知道该看哪里。
            </p>
          </header>
          <div className="boundary-grid">
            {boundaries.map((layer) => (
              <article key={layer.layer} className={`boundary-col boundary-${layer.tone}`}>
                <header>
                  <h3>{layer.layer}</h3>
                  <span className="boundary-state">{layer.state}</span>
                </header>
                <p className="boundary-owner">{layer.owner}</p>
                <ul>
                  {layer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" id="contract">
        <header className="section-head">
          <p className="eyebrow">
            <span>03</span> 契约
          </p>
          <h2>插件只依赖一个 jar。</h2>
          <p className="section-lede">
            编译期只需要 <code className="inline">weaver-girl-api</code>。engine、transformer 和
            shaded ByteBuddy 都是内部实现，跟着版本走，不会牵连插件。
          </p>
        </header>
        <div className="contract-grid">
          <div className="contract-side">
            <p className="prose">
              一个插件声明名称、登记切点，运行时由 agent 发现、隔离并加载。公开面小一点，
              底座就能走得更远。
            </p>
            <dl className="api-table">
              {contractApis.map((api) => (
                <div key={api.name}>
                  <dt>
                    <code>{api.name}</code>
                  </dt>
                  <dd>{api.role}</dd>
                </div>
              ))}
            </dl>
            <a
              className="link-arrow"
              href={`${REPO_URL}/tree/main/weaver-girl-plugin-template`}
              target="_blank"
              rel="noreferrer"
            >
              从插件模板开始 →
            </a>
          </div>
          <CodeBlock code={pluginSkeleton} file="PaymentPlugin.java" />
        </div>
      </section>

      <section className="section wrap" id="runtime">
        <header className="section-head">
          <p className="eyebrow">
            <span>04</span> 运行时
          </p>
          <h2>从挂载到第一行 advice。</h2>
          <p className="section-lede">
            四步完成织入。真正让它敢进生产的是失败开放、类加载隔离和自我保护。
          </p>
        </header>
        <div className="flow">
          {FLOW.map((node, i) => (
            <span key={node.name} className="flow-item">
              {i > 0 && <span className="flow-arrow">→</span>}
              <div className="flow-node">
                <b>{node.name}</b>
                <span>{node.text}</span>
              </div>
            </span>
          ))}
        </div>
        <div className="guarantee-grid">
          {guarantees.map((item) => (
            <article key={item.en} className="guarantee">
              <span className="guarantee-en">{item.en}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap" id="coverage">
        <header className="section-head">
          <p className="eyebrow">
            <span>05</span> 覆盖
          </p>
          <h2>126 个插件，覆盖真实运行环境。</h2>
          <p className="section-lede">
            每个插件对应一种真实运行环境。要做什么，由你的切面应用决定；下面的数字都可以核对。
          </p>
        </header>
        <div className="coverage-table">
          {coverageRows.map((row) => (
            <div key={row.label} className="coverage-row">
              <span className="coverage-label">{row.label}</span>
              <b className="coverage-value">{row.value}</b>
              <span className="coverage-note">{row.note}</span>
            </div>
          ))}
        </div>
        <p className="coverage-link">
          <Link to="/plugins" className="link-arrow">
            查看全部插件与运行时能力 →
          </Link>
        </p>
      </section>

      <section className="section wrap" id="evidence">
        <header className="section-head">
          <p className="eyebrow">
            <span>06</span> 验证
          </p>
          <h2>先看结果，再读代码。</h2>
          <p className="section-lede">
            三个可运行程序：同一份业务代码跑两遍，没有 agent 和挂上 agent，输出由退出码断言。
          </p>
        </header>
        <div className="evidence-table">
          {caseStudies.map((study, i) => (
            <Link key={study.key} to="/cases" className="evidence-row">
              <span className="evidence-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="evidence-tag">{study.tag}</span>
              <span className="evidence-title">{study.title}</span>
              <span className="evidence-metric">
                <b>{study.metrics[0].value}</b>
                {study.metrics[0].label}
              </span>
              <span className="evidence-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section wrap" id="start">
        <header className="section-head">
          <p className="eyebrow">
            <span>07</span> 开始
          </p>
          <h2>从一行 javaagent 参数开始。</h2>
          <p className="section-lede">
            构建 agent，挂到任意 Java 进程；插件跟着 <code className="inline">plugins/</code> 目录走。
            要做产品，从插件模板开始，不必改动 engine。
          </p>
        </header>
        <div className="start-grid">
          <CodeBlock code={quickStart} file="terminal" />
          <div className="start-links">
            <Link to="/quick-start" className="start-link">
              <span className="start-kicker">BUILD</span>
              <b>构建与挂载</b>
              <span>源码、发行包与容器三种接入方式</span>
            </Link>
            <Link to="/architecture" className="start-link">
              <span className="start-kicker">ARCHITECTURE</span>
              <b>架构与隔离</b>
              <span>四项职责、模块划分与类加载隔离</span>
            </Link>
            <a
              className="start-link"
              href={`${REPO_URL}/blob/main/docs/versioning-and-compatibility.md`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="start-kicker">CONTRACT</span>
              <b>版本与兼容性</b>
              <span>公开 API、语义化版本与 Java 支持范围</span>
            </a>
            <a
              className="start-link"
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
            >
              <span className="start-kicker">SOURCE</span>
              <b>源码与文档</b>
              <span>MIT 许可，文档与代码同一个版本</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
