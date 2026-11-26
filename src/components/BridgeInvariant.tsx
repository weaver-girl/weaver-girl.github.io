const BRIDGE = ["InterceptorHolder", "SamplingController", "AgentStatus", "api.*"];
const BODY = ["WeaverGirl", "Transformer", "PluginLoader", "plugins", "shaded ByteBuddy"];

/**
 * The classloader invariant drawn as three loaders and one shared class table:
 * advice is inlined into the app-loaded target, the registry is written from the
 * isolated agent body, and both must meet on the same system-loaded bridge
 * classes. Replaces the paragraph that had to explain this in prose.
 */
export function BridgeInvariant() {
  return (
    <div
      className="bridge-invariant"
      role="img"
      aria-label="目标方法在应用加载器里运行内联的 Advice，它读取 system loader 上的桥接类；AgentClassLoader 里的 WeaverGirl 向同一份桥接类写入注册表。两边必须是同一份 Class 对象，否则注册表读到 null，拦截静默失效。"
    >
      <div className="bi-stack">
        <div className="bi-target">
          <header>
            <span className="bi-kicker">APP LOADER · 目标方法</span>
            <code>TicketStore#render</code>
          </header>
          <div className="bi-inline">
            <span>内联</span>
            <b>InterceptAdvice 的字节码</b>
            <small>被复制进这个方法，跟业务类一起运行</small>
          </div>
        </div>

        <div className="bi-arrow">
          <i aria-hidden="true">↓</i>
          <span>运行时读取注册表</span>
        </div>

        <div className="bi-bridge">
          <header>
            <span className="bi-kicker">SYSTEM LOADER · 父优先</span>
            <b>桥接类只此一份</b>
          </header>
          <ul>
            {BRIDGE.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>

        <div className="bi-arrow">
          <i aria-hidden="true">↑</i>
          <span>setRegistry 写入</span>
        </div>

        <div className="bi-body">
          <header>
            <span className="bi-kicker">AGENTCLASSLOADER · 子优先</span>
            <b>底座与插件待在这一层</b>
          </header>
          <ul>
            {BODY.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="bi-aside">
        <span className="bi-split-kicker">不变量</span>
        <b>两边必须是同一份 Class</b>
        <p>各加载一份 InterceptorHolder，写入的是 A、读取的是 B：端点全绿，拦截却不发生。</p>
        <dl>
          <div>
            <dt>CI 断言</dt>
            <dd>
              <code>byteBuddyClassLoader=AgentClassLoader</code>
            </dd>
          </div>
          <div>
            <dt>并驱动真实流量</dt>
            <dd>
              <code>weavergirl_operation_duration_ms_count &gt; 0</code>
            </dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
