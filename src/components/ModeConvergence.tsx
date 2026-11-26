const MODES = [
  {
    key: "yaml",
    kicker: "YAML",
    title: "weaver.yml",
    code: "interceptors:",
    note: "配置里登记类名、方法与 Advice",
    tone: "clay",
  },
  {
    key: "api",
    kicker: "API",
    title: "WeaverPlugin",
    code: "registerInterceptors(registry)",
    note: "代码里用 registry 登记切点",
    tone: "olive",
  },
  {
    key: "annotation",
    kicker: "ANNOTATION",
    title: "@WeaveClass",
    code: "@Before · @After · @Around",
    note: "注解描述切点，运行时扫描加载",
    tone: "ochre",
  },
];

/**
 * Three authoring styles, one destination. The tabs below show the syntax; this
 * drawing shows that the syntax is the only thing that differs — every mode
 * ends in the same registry and the same transformer.
 */
export function ModeConvergence() {
  return (
    <div
      className="mode-converge"
      role="img"
      aria-label="YAML 配置、编程式 API 与注解三种写法，最终都登记到同一个 InterceptorRegistry，再由 WeaverTransformer 织入目标方法、字段或异常。"
    >
      <div className="mode-inputs">
        {MODES.map((mode) => (
          <div className={`mode-input tone-${mode.tone}`} key={mode.key}>
            <span className="mode-kicker">{mode.kicker}</span>
            <b>{mode.title}</b>
            <code>{mode.code}</code>
            <small>{mode.note}</small>
          </div>
        ))}
      </div>

      <div className="mode-drops" aria-hidden="true">
        <span>↓</span>
        <span>↓</span>
        <span>↓</span>
      </div>

      <div className="mode-registry">
        <span className="mode-registry-label">同一张注册表</span>
        <b>InterceptorRegistry</b>
        <small>切点 · 顺序 · 熔断 · 采样都记在这里</small>
      </div>

      <div className="mode-down" aria-hidden="true">
        ↓
      </div>

      <div className="mode-target">
        <code>WeaverTransformer</code>
        <span>→</span>
        <span>方法 / 字段 / 异常</span>
        <small>业务代码不改一行</small>
      </div>
    </div>
  );
}
