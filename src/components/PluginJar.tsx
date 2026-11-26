const JAR_FILES = [
  {
    path: "META-INF/services/…WeaverPlugin",
    note: "ServiceLoader 从这里发现插件",
  },
  {
    path: "META-INF/weavergirl-capabilities",
    note: "按插件名启用或关闭",
  },
  {
    path: "com/example/MyPlugin.class",
    note: "init · registerInterceptors",
  },
];

const CHAIN = ["发现", "依赖排序", "契约检查", "注册", "织入"];

/**
 * A third-party plugin as an object: one dependency it must not bundle, the
 * three files the agent actually reads, where the jar goes, and the chain it
 * joins. Replaces the paragraph that used to describe all four.
 */
export function PluginJar() {
  return (
    <div
      className="plugin-jar"
      role="img"
      aria-label="第三方插件编译时只依赖 weaver-girl-api，jar 里包含 ServiceLoader 服务文件、能力清单与插件类，放进 agent 旁边的 plugins/ 目录后走同一条发现、排序、检查、注册与织入链路。"
    >
      <div className="pj-top">
        <div className="pj-dep">
          <span className="pj-dep-kicker">编译时只依赖</span>
          <code>weaver-girl-api</code>
          <small>agent 提供这份 jar，插件里不要再打一份</small>
        </div>

        <div className="pj-jar">
          <div className="pj-jar-head">
            <b>my-plugin.jar</b>
            <span>你打包的插件</span>
          </div>
          <ul>
            {JAR_FILES.map((file) => (
              <li key={file.path}>
                <code>{file.path}</code>
                <span>{file.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pj-drop">
        <span className="pj-drop-label">放进 agent 旁边</span>
        <div className="pj-dir">
          <span className="pj-file pj-agent">weaver-girl-agent.jar</span>
          <span className="pj-folder">plugins/</span>
          <span className="pj-file pj-own">my-plugin.jar</span>
        </div>
        <span className="pj-drop-note">目录扫描发生在 transformer 安装之前</span>
      </div>

      <div className="pj-chain">
        {CHAIN.map((step, index) => (
          <span className="pj-step" key={step}>
            {index > 0 && (
              <i aria-hidden="true" className="pj-arrow">
                →
              </i>
            )}
            <b>{step}</b>
          </span>
        ))}
        <span className="pj-chain-tail">同一条拦截、熔断、采样与导出链路</span>
      </div>
    </div>
  );
}
