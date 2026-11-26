import type { CaseStudy } from "../data/content";

const CHARGES = [
  { n: 1, status: "fail", label: "超时" },
  { n: 2, status: "fail", label: "超时" },
  { n: 3, status: "fail", label: "超时" },
  { n: 4, status: "shed", label: "queued:400" },
  { n: 5, status: "fail", label: "超时" },
  { n: 6, status: "ok", label: "approved" },
];

/**
 * The observable effect of each case, drawn: a mask that stays at the exit, a
 * breaker that diverts one call, and an audit line written beside the payment
 * path. The prose above still explains the why; this shows the what.
 */
export function CaseEffect({ study, tone }: { study: CaseStudy; tone: string }) {
  if (study.key === "redaction") {
    return (
      <div
        className={`case-effect case-effect-redaction tone-${tone}`}
        role="img"
        aria-label="同一张工单：库里保留完整卡号与手机号，交到聊天或导出时这两处被掩码。"
      >
        <div className="ce-row">
          <span className="ce-label">工单里保存</span>
          <code className="ce-value">4111111111111234</code>
          <code className="ce-value">13812345678</code>
          <span className="ce-state">原文</span>
        </div>
        <div className="ce-arrow">
          <span>TicketStore.render 返回前改写返回值</span>
          <i aria-hidden="true">↓</i>
        </div>
        <div className="ce-row ce-row-out">
          <span className="ce-label">聊天 / 导出</span>
          <code className="ce-value">
            411111<mark>******</mark>1234
          </code>
          <code className="ce-value">
            138<mark>****</mark>5678
          </code>
          <span className="ce-state ce-state-on">已掩码</span>
        </div>
        <div className="ce-foot">
          <span>掩码 2 处</span>
          <span>业务代码 0 行</span>
          <span>指标计数 2</span>
        </div>
      </div>
    );
  }

  if (study.key === "resilience") {
    return (
      <div
        className={`case-effect case-effect-resilience tone-${tone}`}
        role="img"
        aria-label="六笔扣款：前三笔超时后熔断打开，第四笔直接返回降级结果，不再打下游；第五笔仍失败，第六笔成功。下游实际调用 5 次，原来 6 次。"
      >
        <div className="ce-breaker-head">
          <span className="ce-label">六笔扣款</span>
          <span className="ce-breaker-rule">连续 3 次失败 → 熔断打开</span>
          <span className="ce-breaker-open">第 4 笔不再打下游</span>
        </div>
        <ol className="ce-charges">
          {CHARGES.map((charge) => (
            <li className={`ce-charge ce-${charge.status}`} key={charge.n}>
              <span className="ce-charge-n">{charge.n}</span>
              <span className="ce-charge-label">{charge.label}</span>
            </li>
          ))}
        </ol>
        <div className="ce-foot">
          <span>下游实际调用 5 / 6</span>
          <span>熔断降级 1 笔</span>
          <span>恢复后自动闭合</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`case-effect case-effect-audit tone-${tone}`}
      role="img"
      aria-label="支付核心链路旁路生成三条审计记录：两笔扣款与一笔退款；被拒绝的负金额扣款不计入。"
    >
      <div className="ce-audit-top">
        <div className="ce-core">
          <span className="ce-label">核心链路</span>
          <code>PaymentService</code>
          <span>扣款 / 退款照常执行</span>
        </div>
        <div className="ce-branch" aria-hidden="true">
          <span />
          <i>拦截事件</i>
        </div>
        <div className="ce-exporter">
          <span className="ce-label">旁路</span>
          <code>DataExporter</code>
          <span>脱敏后写出审计行</span>
        </div>
      </div>
      <ul className="ce-audit-lines">
        <li>
          <span>charge</span>
          <code>card=4111********1234</code>
          <b>2599 分</b>
        </li>
        <li>
          <span>charge</span>
          <code>card=5500********9876</code>
          <b>750 分</b>
        </li>
        <li>
          <span>refund</span>
          <code>payment=1</code>
          <b>不计入扣款</b>
        </li>
        <li className="ce-rejected">
          <span>rejected</span>
          <code>amount=-1</code>
          <b>不写审计</b>
        </li>
      </ul>
      <div className="ce-foot">
        <span>审计事件 3</span>
        <span>扣款合计 3349 分</span>
        <span>支付服务 0 行改动</span>
      </div>
    </div>
  );
}
