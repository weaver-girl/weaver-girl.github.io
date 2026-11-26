/**
 * The whole installation as one picture: two files go on the server, one JVM
 * flag attaches the base, and optional endpoints answer whether it is alive.
 * This replaces the three text-only steps that used to sit here.
 */
export function AttachSchematic() {
  return (
    <div className="attach-map">
      <div className="attach-col">
        <span className="attach-step">01 准备</span>
        <div className="attach-files">
          <span className="attach-file">weaver-girl-agent.jar</span>
          <span className="attach-folder">
            plugins/
            <small>126 jars</small>
          </span>
        </div>
        <p>两者必须放在同一层。</p>
      </div>

      <span className="attach-arrow" aria-hidden="true">
        →
      </span>

      <div className="attach-col attach-col-jvm">
        <span className="attach-step">02 挂载</span>
        <code className="attach-command">-javaagent:weaver-girl-agent.jar</code>
        <div className="attach-jvm">
          <b>你的 JVM</b>
          <small>业务代码不改，程序照常启动</small>
        </div>
        <p>启动时挂进去，插件自动发现。</p>
      </div>

      <span className="attach-arrow" aria-hidden="true">
        →
      </span>

      <div className="attach-col">
        <span className="attach-step">03 观察</span>
        <div className="attach-endpoints">
          <span>
            <code>/health</code>
            <b>UP</b>
          </span>
          <span>
            <code>/ready</code>
            <b>READY</b>
          </span>
          <span>
            <code>/metrics</code>
            <b>指标</b>
          </span>
        </div>
        <p>运行时能力配置端口后启用。</p>
      </div>
    </div>
  );
}
