import { Link } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";
import {
  REPO_URL,
  afterBase,
  basePrimitives,
  beforeBase,
  bootLines,
  boundaries,
  caseStudies,
  contractApis,
  coverageRows,
  guarantees,
  outcomes,
  pluginSkeleton,
  quickStart,
} from "../data/content";

const FLOW = [
  { name: "挂入程序", text: "启动时把底座接进目标系统", tone: "clay" },
  { name: "发现插件", text: "按目录里的 jar 自动识别能力", tone: "olive" },
  { name: "登记位置", text: "记下要拦截的方法、字段与异常", tone: "ochre" },
  { name: "织入逻辑", text: "把插件逻辑放进正在运行的代码", tone: "slate" },
];

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="kicker">
            <span className="kicker-index">00</span>
            PLUG-IN BASE / RUNNING SYSTEM
          </p>
          <h1>
            切面底座
            <span className="h1-sub">不用改代码，就能给系统加能力。</span>
          </h1>
          <p className="lede">
            很多系统还在跑，却已经改不动了：想加数据脱敏、审计记录、攻击拦截，都得改业务代码、
            排期、重新发布。weaver-girl 把这层能力做成“插件”，放进去就生效，业务代码一行不改。
          </p>
          <div className="cta-row">
            <a href="#problem" className="btn btn-primary">
              它解决什么问题
            </a>
            <Link to="/architecture" className="btn btn-ghost">
              看看怎么做到的
            </Link>
          </div>
          <dl className="hero-spec">
            <div>
              <dt>接入方式</dt>
              <dd>放一个 jar</dd>
            </div>
            <div>
              <dt>业务改动</dt>
              <dd>0 行</dd>
            </div>
            <div>
              <dt>支持系统</dt>
              <dd>Java 8 – 21</dd>
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

      <section className="section wrap tone-clay" id="problem">
        <header className="section-head">
          <p className="eyebrow">
            <span>01</span> 问题
          </p>
          <h2>系统还在跑，但改不动了。</h2>
          <p className="section-lede">
            给一个已经上线的系统加能力——数据脱敏、审计记录、攻击拦截——通常意味着改业务代码、
            排期、回归、重新发布。风险大、周期长，很多团队干脆不做。
          </p>
        </header>
        <div className="problem-grid">
          <article className="problem-col problem-without">
            <p className="problem-label">没有底座</p>
            <ul>
              {beforeBase.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="problem-col problem-with">
            <p className="problem-label">有 weaver-girl</p>
            <ul>
              {afterBase.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <p className="problem-note">把“给系统加能力”，从改代码变成插插件。</p>
      </section>

      <section className="section wrap tone-olive" id="outcomes">
        <header className="section-head">
          <p className="eyebrow">
            <span>02</span> 用途
          </p>
          <h2>一块底座，长出三种产品。</h2>
          <p className="section-lede">
            监控、安全、审计看起来是三件不同的事，底层都要先做同一件事：
            把逻辑插进运行中的系统，再把看到的数据送出去。换一批插件，就换一种产品。
          </p>
        </header>
        <div className="outcome-grid">
          {outcomes.map((item) => (
            <article key={item.key} className={`outcome-card outcome-${item.tone}`}>
              <span className="outcome-en">{item.en}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <p className="outcome-note">底座只负责“通电”。规则、控制台和存储，由插件与产品层决定。</p>
      </section>

      <section className="section wrap tone-ochre" id="primitives">
        <header className="section-head">
          <p className="eyebrow">
            <span>03</span> 职责
          </p>
          <h2>底座只做四件事。</h2>
          <p className="section-lede">
            读取配置、把逻辑插进程序、把数据送出去、安全地加载插件。判断规则、存储和界面，
            都不在底座里——那是上层产品的事。
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

      <section className="boundary-section tone-slate">
        <div className="wrap">
          <header className="section-head section-head-invert">
            <p className="eyebrow">
              <span>04</span> 边界
            </p>
            <h2>三层分工，各归其位。</h2>
            <p className="section-lede">
              把底座想成墙里的电线：它负责通电，不决定你插什么电器。监控、安全、审计是电器，
              控制台和存储是物业。哪一层出问题，一眼就能找到。
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

      <section className="section wrap tone-plum" id="contract">
        <header className="section-head">
          <p className="eyebrow">
            <span>05</span> 契约
          </p>
          <h2>写插件，只需要认一个接口。</h2>
          <p className="section-lede">
            插件只依赖 <code className="inline">weaver-girl-api</code> 这一个 jar。底座内部怎么实现、
            怎么升级，都不会牵连插件——写插件的人不用关心底座里有什么。
          </p>
        </header>
        <div className="contract-grid">
          <div className="contract-side">
            <p className="prose">
              一个插件声明名称、登记要插入的位置，剩下的交给底座：发现、隔离、加载。
              约定越小，插件越容易写，也越不容易被底座的变化影响。
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

      <section className="section wrap tone-teal" id="runtime">
        <header className="section-head">
          <p className="eyebrow">
            <span>06</span> 运行时
          </p>
          <h2>一次挂载，四步生效。</h2>
          <p className="section-lede">
            启动时挂上底座，它自己发现插件、登记位置、把逻辑织进程序。失败开放、隔离和自保，
            让它敢一直待在线上。
          </p>
        </header>
        <div className="flow">
          {FLOW.map((node, i) => (
            <span key={node.name} className="flow-item">
              {i > 0 && <span className="flow-arrow">→</span>}
              <div className={`flow-node tone-${node.tone}`}>
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

      <section className="section wrap tone-clay" id="coverage">
        <header className="section-head">
          <p className="eyebrow">
            <span>07</span> 覆盖
          </p>
          <h2>126 块现成能力，常见系统都覆盖。</h2>
          <p className="section-lede">
            数据库、缓存、消息队列、Web 框架、HTTP 客户端……系统里用什么，插件就拦什么；
            没用到的不会加载，也不占资源。
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

      <section className="section wrap tone-olive" id="evidence">
        <header className="section-head">
          <p className="eyebrow">
            <span>08</span> 验证
          </p>
          <h2>三个小故事，看它改变了什么。</h2>
          <p className="section-lede">
            同一段业务代码跑两遍：一遍不装底座，一遍装上。差别由程序自己断言，
            不是手工截的图，也不是准备好的演示。
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

      <section className="section wrap tone-slate" id="start">
        <header className="section-head">
          <p className="eyebrow">
            <span>09</span> 开始
          </p>
          <h2>三步，把它跑起来。</h2>
          <p className="section-lede">
            构建、挂上、观察。不需要改业务代码，也不需要额外安装中间件；插件跟着{" "}
            <code className="inline">plugins/</code> 目录走。
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
