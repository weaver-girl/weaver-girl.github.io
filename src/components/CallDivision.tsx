const ROWS = [
  {
    n: "01",
    tone: "clay",
    who: "底座",
    verb: "提供机制",
    text: "看到参数、返回值与异常；负责拦截植入、上下文、上报与加载。",
    mark: "weaver-girl",
  },
  {
    n: "02",
    tone: "olive",
    who: "插件",
    verb: "做判断",
    text: "金额是否合法、卡号要不要打码、连续失败几次熔断——规则由插件决定。",
    mark: "你的规则",
  },
  {
    n: "03",
    tone: "plum",
    who: "产品层",
    verb: "接住结果",
    text: "控制台、规则下发、存储与告警，由你的平台团队实现。",
    mark: "你的平台",
  },
];

/**
 * One intercepted call, read downwards: what the base exposes, what a plugin
 * decides with it, and what the product layer owns afterwards. This is the
 * three-layer argument shown at the scale of a single method instead of a
 * paragraph about ownership.
 */
export function CallDivision() {
  return (
    <div
      className="call-division"
      role="img"
      aria-label="一次 PaymentService.charge 调用：底座提供拦截位置、上下文、上报与加载；插件决定判定、脱敏与熔断规则；产品层负责控制台、存储与告警。"
    >
      <div className="cd-call">
        <span>一次调用</span>
        <code>PaymentService#charge</code>
        <span className="cd-call-args">amount · card</span>
      </div>

      <div className="cd-rows">
        {ROWS.map((row) => (
          <div className={`cd-row cd-${row.tone} tone-${row.tone}`} key={row.n}>
            <span className="cd-num">{row.n}</span>
            <div className="cd-copy">
              <b>
                {row.who}
                <span>· {row.verb}</span>
              </b>
              <p>{row.text}</p>
            </div>
            <span className="cd-mark">{row.mark}</span>
          </div>
        ))}
      </div>

      <div className="cd-contract">
        <code>weaver-girl-api</code>
        <span>插件只通过它和底座通信；控制台与存储不走这条线</span>
      </div>
    </div>
  );
}
