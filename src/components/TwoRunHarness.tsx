/**
 * The method behind every case: one program, two runs, and an exit code that
 * decides who was right. This is the evidence claim drawn as a harness instead
 * of stated in a sentence.
 */
export function TwoRunHarness() {
  return (
    <div
      className="two-run"
      role="img"
      aria-label="同一个 demo 程序跑两遍：不挂 agent 时原样输出并以退出码 2 结束；挂上插件后同一段业务代码产生不同结果并以退出码 0 结束。"
    >
      <div className="two-run-source">
        <span className="two-run-kicker">SAME SOURCE</span>
        <b>三个 demo 程序</b>
        <code>RedactionDemo · ResilienceDemo · AuditDemo</code>
        <small>业务代码不 import 插件，也不预留接口</small>
      </div>

      <div className="two-run-fork" aria-hidden="true">
        <span className="two-run-fork-line" />
        <span className="two-run-fork-arrow">→</span>
      </div>

      <div className="two-run-pair">
        <div className="two-run-item two-run-off">
          <span className="two-run-cmd">java -cp … Demo</span>
          <b>没有 agent</b>
          <span className="two-run-result">原样输出 · 断言失败</span>
          <em>exit 2</em>
        </div>
        <div className="two-run-item two-run-on">
          <span className="two-run-cmd">java -javaagent:… Demo</span>
          <b>挂上插件</b>
          <span className="two-run-result">掩码 / 降级 / 审计行 · 断言通过</span>
          <em>exit 0</em>
        </div>
      </div>

      <div className="two-run-foot">
        脚本比较两份输出，用退出码断言；不是手工截的图，也不是准备好的演示。
      </div>
    </div>
  );
}
