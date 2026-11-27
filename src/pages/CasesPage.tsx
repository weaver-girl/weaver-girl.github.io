import { Alert } from "antd";
import { CaseEffect } from "../components/CaseEffect";
import { CaseTrace } from "../components/CaseTrace";
import { CodeBlock } from "../components/CodeBlock";
import { CountUp } from "../components/CountUp";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { TwoRunHarness } from "../components/TwoRunHarness";
import { caseStudies } from "../data/content";

const TONES: Record<string, string> = {
  blue: "slate",
  volcano: "clay",
  purple: "plum",
};

/**
 * Case studies read top to bottom: what was happening, what the plugin does, and the two real
 * outputs from the repo's demo scripts (with the agent and without it).
 */
export function CasesPage() {
  return (
    <>
      <PageHero
        kicker="REAL, RUNNABLE STORIES"
        title="三个小故事，看它改变了什么"
        lede="三个真实可运行的小程序：同一段业务，跑两遍——先不装底座，再装上。差别由程序自己断言，不给演示稿留余地。"
      />

      <div className="page-body">
        <nav className="case-quicknav" aria-label="案例导航">
          {caseStudies.map((study, i) => (
            <Reveal
              as="a"
              key={study.key}
              className={`case-quicknav-item tone-${TONES[study.tagColor] ?? "clay"}`}
              href={`#${study.key}`}
              delay={i * 80}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{study.tag}</b>
              <small>{study.title}</small>
            </Reveal>
          ))}
        </nav>

        <Reveal className="case-harness" variant="fade">
          <TwoRunHarness />
        </Reveal>

        {caseStudies.map((study, index) => (
          <Reveal
            as="article"
            key={study.key}
            id={study.key}
            className={`case-study tone-${TONES[study.tagColor] ?? "clay"}`}
            delay={index * 60}
          >
            <header className="case-head">
              <div className="case-meta">
                <span className="case-tag">{study.tag}</span>
                <code className="case-demo">{study.demo}</code>
              </div>
              <h2>
                <span className="case-index">{String(index + 1).padStart(2, "0")}</span>
                {study.title}
              </h2>
              <p className="case-sub">{study.subtitle}</p>
            </header>

            <CaseTrace trace={study.trace} tone={TONES[study.tagColor] ?? "clay"} />
            <CaseEffect study={study} tone={TONES[study.tagColor] ?? "clay"} />

            <div className="case-body">
              <div className="case-narrative">
                <section>
                  <h3>现场</h3>
                  <p>{study.scene}</p>
                </section>
                <section>
                  <h3>问题</h3>
                  <p>{study.problem}</p>
                </section>
                <section>
                  <h3>插件做了什么</h3>
                  {study.plain && <p className="case-plain">{study.plain}</p>}
                  <p>{study.approach}</p>
                </section>
                <section>
                  <h3>带来的变化</h3>
                  <ul>
                    {study.value.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside className="case-side">
                <div className="case-metrics">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="case-metric">
                      <b className="case-metric-value">
                        <CountUp value={metric.value} />
                      </b>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
                <Alert
                  type="info"
                  showIcon={false}
                  message="自己跑一遍"
                  description={
                    <>
                      <p>在仓库根目录执行，脚本会同时跑有、无 agent 两遍，并用退出码断言结果：</p>
                      <code className="case-run">{study.run}</code>
                    </>
                  }
                />
              </aside>
            </div>

            <div className="case-output">
              <div>
                <h4>{study.beforeLabel}</h4>
                <CodeBlock code={study.before} file="without agent" />
              </div>
              <div>
                <h4>{study.afterLabel}</h4>
                <CodeBlock code={study.after} file="with agent" />
              </div>
            </div>

            <footer className="case-source">
              <span>源码</span>
              {study.sources.map((source) => (
                <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              ))}
            </footer>
          </Reveal>
        ))}

        <Reveal as="section" className="case-common" variant="fade">
          <p className="eyebrow">为什么这些案例可信</p>
          <h2>三个程序，同一个接入方式。</h2>
          <ul>
            <li>业务程序不 import 任何插件，也没有为插件预留接口。</li>
            <li>插件 jar 放进 <code className="inline">plugins/</code> 就被发现；拿掉后，行为立刻回到原样。</li>
            <li>脚本对两份结果做退出码断言：有 agent 是 0，没有是 2——输出不是手工截的。</li>
            <li>三个插件都只依赖 <code className="inline">weaver-girl-api</code>；换场景，就是换一个插件。</li>
          </ul>
        </Reveal>
      </div>
    </>
  );
}
