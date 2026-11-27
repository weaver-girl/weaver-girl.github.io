import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { BenchmarkScale } from "../components/BenchmarkScale";
import { BaseChassis } from "../components/BaseChassis";
import { BoundaryStack } from "../components/BoundaryStack";
import { CategoryMap } from "../components/CategoryMap";
import { CodeBlock } from "../components/CodeBlock";
import { ContractHub } from "../components/ContractHub";
import { CountUp } from "../components/CountUp";
import { DeliveryTracks } from "../components/DeliveryTracks";
import { Faq } from "../components/Faq";
import { FitFork } from "../components/FitFork";
import { SplitHeading, WeaveMesh } from "../components/Motion";
import { LoomBackdrop } from "../components/LoomBackdrop";
import { OutcomeBus } from "../components/OutcomeBus";
import { Reveal } from "../components/Reveal";
import { SafetyNet } from "../components/SafetyNet";
import { TwoRunHarness } from "../components/TwoRunHarness";
import { WeaveMap } from "../components/WeaveMap";
import {
  PLUGIN_TEMPLATE_URL,
  REPO_URL,
  benchmarkCaveat,
  benchmarkEnv,
  bootLines,
  boundaries,
  caseStudies,
  contactPoints,
  coverageRows,
  outcomes,
  overheadSteps,
  pluginSkeleton,
  quickStart,
  WECHAT_ID,
} from "../data/content";

const FLOW = [
  { name: "挂入程序", text: "启动时把底座接进目标系统", tone: "clay" },
  { name: "发现插件", text: "按目录里的 jar 自动识别能力", tone: "olive" },
  { name: "登记位置", text: "记下要拦截的方法、字段与异常", tone: "ochre" },
  { name: "织入逻辑", text: "把插件逻辑放进正在运行的代码", tone: "slate" },
];

/** The chip row under the hero: what the 126 plugins actually cover. */
const HERO_CHIPS = [
  { label: "JDBC", tone: "clay" },
  { label: "Redis", tone: "olive" },
  { label: "Kafka", tone: "ochre" },
  { label: "Dubbo", tone: "slate" },
  { label: "Spring", tone: "plum" },
  { label: "Tomcat", tone: "teal" },
  { label: "MyBatis", tone: "clay" },
  { label: "Quartz", tone: "olive" },
];

const PERF_STATS = [
  { value: "1.18", unit: "ns", label: "精确类 / 方法匹配" },
  { value: "25.03", unit: "ns", label: "熔断状态检查" },
  { value: "2.74", unit: "ns", label: "采样判断" },
  { value: "3,819", unit: "个", label: "自动化测试" },
];

export function HomePage() {
  return (
    <>
      <section className="hero">
        <LoomBackdrop className="hero-loom" />
        <WeaveMesh />
        <div className="hero-orbit" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">
              <span className="kicker-index">00</span>
              PLUG-IN BASE / RUNNING SYSTEM
            </p>
            <SplitHeading text="切面底座" stagger={110} delay={260} lean={1.2} />
            <p className="hero-line">不用改代码，就能给系统加能力。</p>
            <p className="lede">
              系统还在跑，却已经改不动了：想给敏感数据打码、记录操作、挡住攻击，都要改业务代码、
              排期、回归、重新发布。weaver-girl 把这些能力做成插件——放一个 jar 进去，下一次加载就生效，
              业务代码一行不动。
            </p>
            <div className="cta-row">
              <Link to="/quick-start" className="btn btn-primary">
                开始接入
              </Link>
              <a href="#problem" className="btn btn-ghost">
                它解决什么问题
              </a>
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
                <dt>当前版本</dt>
                <dd>1.0.0</dd>
              </div>
            </dl>
          </div>

          <aside className="system-panel" aria-label="Agent 启动时的契约面">
            <div className="panel-bar">
              <span className="panel-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="panel-title">agent.boot</span>
              <span className="panel-status">JVM · attached</span>
            </div>
            <div className="panel-command">
              <span className="panel-prompt">$</span>
              <code>-javaagent:weaver-girl-agent.jar=config=weaver.yml</code>
              <span className="panel-caret" aria-hidden="true" />
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
        </div>

        <div className="hero-chips">
          <p className="chips-label">底座之上，插件决定它能做什么</p>
          <ul className="chips">
            {HERO_CHIPS.map((chip, index) => (
              <li
                key={chip.label}
                className={`tone-${chip.tone}`}
                style={{ "--chip-delay": `${index * 55}ms` } as CSSProperties}
              >
                {chip.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap tone-clay" id="problem">
        <Reveal as="header" className="section-head">
          <span className="ghost-index" aria-hidden="true">
            01
          </span>
          <p className="eyebrow">
            <span>01</span> 问题
          </p>
          <h2>系统还在跑，但改不动了。</h2>
          <p className="section-lede">
            给一个已经上线的系统加能力——打码、留痕、挡住攻击——通常意味着一轮改代码、排期、回归和发布。
            风险不小，周期又长，于是很多团队干脆不做。
          </p>
        </Reveal>
        <Reveal className="problem-visual" variant="fade">
          <DeliveryTracks />
        </Reveal>
        <Reveal className="problem-note" variant="fade">
          于是“加能力”这件事，从一次发布变成一次插电。
        </Reveal>
      </section>

      <section className="section wrap tone-olive" id="outcomes">
        <Reveal as="header" className="section-head">
          <span className="ghost-index" aria-hidden="true">
            02
          </span>
          <p className="eyebrow">
            <span>02</span> 用途
          </p>
          <h2>一块底座，长出三种产品。</h2>
          <p className="section-lede">
            监控、安全、审计看着是三件事，底层却是同一件事：把逻辑插进正在运行的系统，再把看到的数据送出去。
            换一批插件，就换一种产品——底座本身不用重写。
          </p>
        </Reveal>
        <Reveal className="outcome-visual" variant="fade">
          <OutcomeBus />
        </Reveal>
        <div className="outcome-grid">
          {outcomes.map((item, index) => (
            <Reveal
              as="article"
              key={item.key}
              className={`outcome-card outcome-${item.tone}`}
              delay={index * 90}
            >
              <span className="outcome-en">{item.en}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="outcome-note" variant="fade">
          底座只负责“通电”。规则、控制台和存储，由插件与产品层决定。
        </Reveal>
      </section>

      <section className="section wrap tone-ochre" id="primitives">
        <Reveal as="header" className="section-head">
          <span className="ghost-index" aria-hidden="true">
            03
          </span>
          <p className="eyebrow">
            <span>03</span> 职责
          </p>
          <h2>底座只做四件事。</h2>
          <p className="section-lede">
            只有四件：读配置、把逻辑插进程序、把数据送出去、安全地加载插件。
            判断规则、存储和界面都不在这里——那是上层产品的事。
          </p>
        </Reveal>
        <Reveal className="primitive-visual" variant="fade">
          <BaseChassis />
        </Reveal>
      </section>

      <section className="boundary-section tone-slate">
        <LoomBackdrop tone="dark" className="boundary-loom" />
        <div className="wrap">
          <Reveal as="header" className="section-head section-head-invert">
            <span className="ghost-index" aria-hidden="true">
              04
            </span>
            <p className="eyebrow">
              <span>04</span> 边界
            </p>
            <h2>三层分工，各归其位。</h2>
            <p className="section-lede">
              把底座想成墙里的电线：它负责通电，不决定你插什么电器。监控、安全、审计是电器，
              控制台和存储是物业。哪一层出了故障，顺着线就能找到是谁。
            </p>
          </Reveal>
          <Reveal className="boundary-visual" variant="fade">
            <BoundaryStack />
          </Reveal>
          <div className="boundary-grid">
            {boundaries.map((layer, index) => (
              <Reveal
                as="article"
                key={layer.layer}
                className={`boundary-col boundary-${layer.tone}`}
                delay={index * 110}
              >
                <header>
                  <h3>{layer.layer}</h3>
                  <span className="boundary-state">{layer.state}</span>
                </header>
                <p className="boundary-owner">{layer.owner}</p>
                {layer.summary && <p className="boundary-summary">{layer.summary}</p>}
                <ul>
                  {layer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap tone-plum" id="contract">
        <Reveal as="header" className="section-head">
          <span className="ghost-index" aria-hidden="true">
            05
          </span>
          <p className="eyebrow">
            <span>05</span> 契约
          </p>
          <h2>写插件，只需要认一个接口。</h2>
          <p className="section-lede">
            插件只依赖 <code className="inline">weaver-girl-api</code> 一个 jar。底座怎么实现、怎么升级，
            都牵连不到插件——写插件的人不需要知道底座里有什么。
          </p>
        </Reveal>
        <div className="contract-grid">
          <Reveal className="contract-side" variant="left">
            <p className="prose">
              插件只做两件事：报上名字，登记要插在哪；发现、隔离、加载都归底座。
              约定越窄，插件越好写，也越不容易被底座的变化带翻。
            </p>
            <div className="contract-visual">
              <ContractHub />
            </div>
            <a
              className="link-arrow"
              href={PLUGIN_TEMPLATE_URL}
              target="_blank"
              rel="noreferrer"
            >
              从插件模板开始 →
            </a>
          </Reveal>
          <Reveal className="contract-code" variant="scale" delay={120}>
            <CodeBlock code={pluginSkeleton} file="PaymentPlugin.java" />
          </Reveal>
        </div>
      </section>

      <section className="section wrap tone-teal" id="runtime">
        <Reveal as="header" className="section-head">
          <span className="ghost-index" aria-hidden="true">
            06
          </span>
          <p className="eyebrow">
            <span>06</span> 运行时
          </p>
          <h2>一次挂载，四步生效。</h2>
          <p className="section-lede">
            启动时挂上，它自己发现插件、登记位置、把逻辑织进程序。失败开放、类加载隔离和自保，
            让它可以一直待在线上，不靠人盯着。
          </p>
        </Reveal>
        <Reveal className="weave-map-shell" variant="fade">
          <WeaveMap />
        </Reveal>
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
        <Reveal className="safety-visual" variant="fade">
          <SafetyNet />
        </Reveal>
      </section>

      <section className="section wrap tone-clay" id="coverage">
        <Reveal as="header" className="section-head">
          <span className="ghost-index" aria-hidden="true">
            07
          </span>
          <p className="eyebrow">
            <span>07</span> 覆盖
          </p>
          <h2>126 块现成能力，常见系统都覆盖。</h2>
          <p className="section-lede">
            数据库、缓存、消息队列、Web 框架、HTTP 客户端——系统里用什么，插件就拦什么。
            没用到的根本不加载，也就不占资源。
          </p>
        </Reveal>
        <div className="coverage-table">
          {coverageRows.map((row, index) => (
            <Reveal
              as="div"
              key={row.label}
              className="coverage-row"
              delay={index * 45}
              variant="left"
            >
              <span className="coverage-label">{row.label}</span>
              <b className="coverage-value">{row.value}</b>
              <span className="coverage-note">{row.note}</span>
            </Reveal>
          ))}
        </div>
        <Reveal className="coverage-map" variant="fade">
          <div className="coverage-map-head">
            <span className="coverage-map-kicker">PLUGIN MAP</span>
            <p>126 个插件按功能分组，长条是数量。</p>
          </div>
          <CategoryMap />
        </Reveal>
        <p className="coverage-link">
          <Link to="/plugins" className="link-arrow">
            查看全部插件与运行时能力 →
          </Link>
        </p>
      </section>

      <section className="section wrap tone-teal" id="performance">
        <Reveal as="header" className="section-head">
          <span className="ghost-index" aria-hidden="true">
            08
          </span>
          <p className="eyebrow">
            <span>08</span> 性能
          </p>
          <h2>纳秒级的判断，才敢放在热路径上。</h2>
          <p className="section-lede">
            拦截发生在每一次方法调用之前，底座自身的开销必须小到可以忽略。下面这组数字直接取自仓库的
            JMH 基线，不是营销口径；真正花多少，取决于插件在回调里做什么。
          </p>
        </Reveal>
        <div className="perf-stats">
          {PERF_STATS.map((stat, index) => (
            <Reveal key={stat.label} className="perf-stat" delay={index * 70} variant="scale">
              <b>
                <CountUp value={stat.value} /> <small>{stat.unit}</small>
              </b>
              <span>{stat.label}</span>
            </Reveal>
          ))}
        </div>
        <BenchmarkScale />
        <Reveal className="overhead-ladder" variant="fade">
          <div className="overhead-step tone-clay">
            <span className="overhead-label">{overheadSteps[0].label}</span>
            <b>
              <CountUp value={overheadSteps[0].value} />
              <small>{overheadSteps[0].unit}</small>
            </b>
            <span className="overhead-note">{overheadSteps[0].note}</span>
          </div>
          <div className="overhead-arrow" aria-hidden="true">
            <span>关掉遥测</span>
            <i>→</i>
          </div>
          <div className="overhead-step tone-olive">
            <span className="overhead-label">{overheadSteps[1].label}</span>
            <b>
              <CountUp value={overheadSteps[1].value} />
              <small>{overheadSteps[1].unit}</small>
            </b>
            <span className="overhead-note">{overheadSteps[1].note}</span>
          </div>
        </Reveal>
        <p className="bench-foot">
          {benchmarkEnv}。{benchmarkCaveat}
        </p>
        <p className="bench-foot">
          上面那组 335 → 88 ns 测的是“一个匹配到插件、回调体为空”的调用：变化全部来自底座内建的观测开关，
          不是插件本身的耗时。插件在回调里做的事另算。
        </p>
      </section>

      <section className="section wrap tone-olive" id="evidence">
        <Reveal as="header" className="section-head">
          <span className="ghost-index" aria-hidden="true">
            09
          </span>
          <p className="eyebrow">
            <span>09</span> 验证
          </p>
          <h2>三个小故事，看它改变了什么。</h2>
          <p className="section-lede">
            同一段业务代码跑两遍：一遍不装，一遍装上。差别由程序自己断言、自己给出退出码，
            不是手工截的图，也不是排练过的演示。
          </p>
        </Reveal>
        <Reveal className="evidence-harness" variant="fade">
          <TwoRunHarness />
        </Reveal>
        <Reveal className="evidence-table" variant="fade">
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
        </Reveal>
      </section>

      <section className="section wrap tone-plum" id="fit">
        <Reveal as="header" className="section-head">
          <span className="ghost-index" aria-hidden="true">
            10
          </span>
          <p className="eyebrow">
            <span>10</span> 选型
          </p>
          <h2>先想清楚：它是不是给你的。</h2>
          <p className="section-lede">
            底座并不万能。它擅长“给系统加能力”，不擅长“直接交给你一个能用的产品”。
            一句话就能分清楚。
          </p>
        </Reveal>
        <Reveal className="fit-visual" variant="fade">
          <FitFork />
        </Reveal>
        <Reveal className="fit-note" variant="fade">
          想知道它和 SkyWalking、OpenTelemetry Agent 的差别，
          <a href={`${REPO_URL}/blob/main/docs/positioning.md`} target="_blank" rel="noreferrer">
            产品定位文档
          </a>
          里有一张逐项对照表。
        </Reveal>
      </section>

      <section className="section wrap tone-slate" id="faq">
        <Reveal as="header" className="section-head">
          <span className="ghost-index" aria-hidden="true">
            11
          </span>
          <p className="eyebrow">
            <span>11</span> 常见问题
          </p>
          <h2>还有几个问题，先答在这里。</h2>
          <p className="section-lede">
            接入前最常被问的就是这几件：会不会变慢、要不要改代码、插件坏了怎么办、和现成 APM 有什么不同。
            答案都在下面。
          </p>
        </Reveal>
        <Faq />
      </section>

      <section className="section wrap tone-slate" id="start">
        <Reveal as="header" className="section-head">
          <span className="ghost-index" aria-hidden="true">
            12
          </span>
          <p className="eyebrow">
            <span>12</span> 开始
          </p>
          <h2>三步，把它跑起来。</h2>
          <p className="section-lede">
            构建、挂上、观察。不改业务代码，也不装中间件；插件跟着{" "}
            <code className="inline">plugins/</code> 目录走。
          </p>
        </Reveal>
        <div className="start-grid">
          <Reveal className="start-code" variant="scale">
            <CodeBlock code={quickStart} file="terminal" />
          </Reveal>
          <Reveal className="start-links" variant="left" delay={100}>
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
            <a className="start-link" href={REPO_URL} target="_blank" rel="noreferrer">
              <span className="start-kicker">SOURCE</span>
              <b>源码与文档</b>
              <span>MIT 许可，文档与代码同一个版本</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section wrap tone-ochre" id="contact">
        <Reveal as="header" className="section-head">
          <span className="ghost-index" aria-hidden="true">
            13
          </span>
          <p className="eyebrow">
            <span>13</span> 联系
          </p>
          <h2>有具体的事，直接加微信聊。</h2>
          <p className="section-lede">
            底座是开源的，问题可以直接提到 GitHub。如果是定制插件、产品落地这类需要来回确认的事，
            加维护者微信更快：把场景和版本发过来就行。
          </p>
        </Reveal>
        <Reveal className="contact-grid" variant="fade">
          <ul className="contact-points">
            {contactPoints.map((point) => (
              <li key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </li>
            ))}
          </ul>
          <figure className="contact-card">
            <img
              className="contact-qr"
              src={`${import.meta.env.BASE_URL}wechat-qr.png`}
              alt="维护者个人微信二维码"
              width="240"
              height="240"
              loading="lazy"
            />
            <figcaption>
              <span className="contact-card-kicker">WECHAT</span>
              <b>{WECHAT_ID}</b>
              <span>扫码添加，备注说明来意即可。</span>
            </figcaption>
          </figure>
        </Reveal>
      </section>
    </>
  );
}
