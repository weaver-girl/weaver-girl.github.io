const JARS = [
  { name: "jdbc.jar", tone: "clay" },
  { name: "servlet.jar", tone: "olive" },
  { name: "kafka.jar", tone: "ochre" },
  { name: "audit.jar", tone: "plum" },
];

/**
 * Three panels — plugins/, agent, target method — with animated threads between
 * them. It is the home page's "what weaving means" picture in one screen.
 */
export function WeaveMap() {
  return (
    <div className="weave-map" role="img" aria-label="plugins/ 里的插件 jar 经 agent 织入目标方法">
      <div className="weave-col weave-sources">
        <span className="weave-label">plugins/</span>
        {JARS.map((jar) => (
          <span key={jar.name} className={`weave-jar tone-${jar.tone}`}>
            <i aria-hidden="true" />
            {jar.name}
          </span>
        ))}
        <span className="weave-hint">放进去就会被发现</span>
      </div>

      <div className="weave-link" aria-hidden="true">
        <span className="weave-thread" />
        <i className="weave-spark" />
      </div>

      <div className="weave-col weave-core">
        <span className="weave-label">agent</span>
        <b>WeaverTransformer</b>
        <span className="weave-sub">Registry · ByteBuddy Advice</span>
        <span className="weave-status">fail-open · child-first</span>
      </div>

      <div className="weave-link" aria-hidden="true">
        <span className="weave-thread" />
        <i className="weave-spark weave-spark-late" />
      </div>

      <div className="weave-col weave-target">
        <span className="weave-label">target</span>
        <code>PaymentService#charge</code>
        <span className="weave-advice">OnMethodEnter</span>
        <span className="weave-advice">OnMethodExit</span>
        <span className="weave-hint">业务代码不用改一行</span>
      </div>
    </div>
  );
}
