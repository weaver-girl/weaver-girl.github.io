const RUNTIME = [
  {
    trigger: "插件抛异常",
    outcome: "原方法照常返回",
    tag: "FAIL-OPEN",
    note: "兄弟类继续处理，进程不退出",
    tone: "clay",
  },
  {
    trigger: "同一拦截器持续出错",
    outcome: "自动摘除该拦截器",
    tag: "CONTAINMENT",
    note: "其它插件不受影响",
    tone: "ochre",
  },
  {
    trigger: "系统压力升高",
    outcome: "自动降低采样率",
    tag: "ADAPTIVE SAMPLING",
    note: "拦截仍在，开销先降",
    tone: "olive",
  },
  {
    trigger: "改配置 / 换 jar",
    outcome: "不重启，下一次加载生效",
    tag: "HOT RELOAD",
    note: "已有的类会被重新转换",
    tone: "slate",
  },
];

const STATIC = [
  { title: "类加载隔离", text: "插件与业务各用各的类库", mark: "child-first" },
  { title: "公开契约", text: "插件只依赖 weaver-girl-api", mark: "一个 jar" },
  { title: "可验证", text: "3,671 个测试 · JDK 8/11/17/21 实机挂载", mark: "CI" },
];

/**
 * The six guarantees as two groups: what happens when a plugin misbehaves
 * (drawn as trigger → outcome), and what is true by design. Replaces six
 * equal cards so the difference between runtime behaviour and architecture is
 * visible at a glance.
 */
export function SafetyNet() {
  return (
    <div
      className="safety-net"
      role="img"
      aria-label="插件出错时：失败开放保留原方法、持续出错自动摘除、压力大时降低采样、换配置或 jar 不用重启。设计上还有类加载隔离、唯一公开契约与自动化验证。"
    >
      <div className="sn-runtime">
        <header className="sn-head">
          <span>出事时</span>
          <b>进程继续跑</b>
          <small>四个触发器，四种收口</small>
        </header>
        <ol className="sn-list">
          {RUNTIME.map((row) => (
            <li className={`sn-item tone-${row.tone}`} key={row.tag}>
              <span className="sn-dot" aria-hidden="true" />
              <div className="sn-copy">
                <span className="sn-trigger">{row.trigger}</span>
                <span className="sn-outcome">
                  <i aria-hidden="true">→</i>
                  {row.outcome}
                </span>
                <small>{row.note}</small>
              </div>
              <em>{row.tag}</em>
            </li>
          ))}
        </ol>
      </div>

      <div className="sn-static">
        <header className="sn-static-head">
          <span>设计上</span>
          <b>不会把风险留给业务</b>
        </header>
        {STATIC.map((item) => (
          <div className="sn-static-item" key={item.title}>
            <span className="sn-static-title">{item.title}</span>
            <p>{item.text}</p>
            <em>{item.mark}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
