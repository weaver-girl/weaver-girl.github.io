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
            <span className="h1-sub">不是 APM。</span>
          </h1>
          <p className="lede">
            weaver-girl 把切点植入、上下文改写、数据上报与模块加载做成 JVM
            基础设施。APM、IAST、RASP、审计与韧性是构建其上的切面应用，不是本仓库。
          </p>
          <div className="cta-row">
            <Link to="/architecture" className="btn btn-primary">
              阅读架构
            </Link>
            <a
              href={`${REPO_URL}/blob/main/docs/plugin-developer-guide.md`}
              className="btn btn-ghost"
              target="_blank"
              rel="noreferrer"
            >
              插件开发指南
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
          <h2>底座只做四件事。</h2>
          <p className="section-lede">
            四项之外的规则、判定、存储和界面，属于切面应用与切面管控。这条边界决定了一个
            agent 能承载多少产品，也决定了升级时什么会坏。
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
            <h2>底座 / 应用 / 管控。</h2>
            <p className="section-lede">
              同一个 agent 可以承载多个产品，但三层的责任不能混。混在一起，底座就会被某一个产品的
              规则、存储和界面拖住。
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
            第三方产品编译期只看见 <code className="inline">weaver-girl-api</code>。engine、transformer 和
            shaded ByteBuddy 都是内部实现，可以随版本演进而不破坏插件。
          </p>
        </header>
        <div className="contract-grid">
          <div className="contract-side">
            <p className="prose">
              一个插件声明名称，向注册表登记切点；运行时由 agent 发现、隔离并加载。公开面保持小，
              是为了让底座能升级，而不是为了少写几个类。
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
          <h2>一条织入链路，几条硬约束。</h2>
          <p className="section-lede">
            从 attach 到 advice 内联只有四步。真正决定它能不能进生产的是失败开放、类加载隔离和
            自我保护，而不是拦截器写得多漂亮。
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
          <h2>126 个插件是覆盖面，不是产品。</h2>
          <p className="section-lede">
            插件证明底座能落到多少运行环境；产品要做什么，仍然由你的切面应用决定。下面是可核对
            的覆盖率与质量数据。
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
          <h2>三个可运行结果。</h2>
          <p className="section-lede">
            业务代码从未引用插件；脚本把同一个程序跑两遍——没有 agent 和挂上 agent——输出由退出码
            断言，不是手工截取。
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
          <h2>把它当一个基础设施接入。</h2>
          <p className="section-lede">
            构建 agent，挂到任何 Java 进程；插件与 <code className="inline">plugins/</code> 目录随构建产出。
            如果要做产品，从插件模板开始，而不是改 engine。
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
