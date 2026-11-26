const JDKS = [
  { version: "8", note: "真实 attach" },
  { version: "11", note: "真实 attach" },
  { version: "17", note: "真实 attach", extra: "Jetty + H2 示例，断言拦截" },
  { version: "21", note: "真实 attach" },
];

/**
 * The support claim as a rail: four JVMs that CI actually attaches to, the
 * build JDK that produces the jar, and the one base image. Replaces a paragraph
 * of version prose with the versions themselves.
 */
export function JavaSupport() {
  return (
    <div
      className="java-support"
      role="img"
      aria-label="主代码以 --release 8 编译，在 JDK 17 上构建；打包后的 agent 在 JDK 8、11、17、21 上真实 attach。"
    >
      <div className="java-build">
        <span className="java-build-kicker">构建</span>
        <code>--release 8</code>
        <span className="java-build-note">主代码只用 JDK 8 API</span>
        <span className="java-gate">门禁 · JDK 17 完整检查</span>
      </div>

      <div className="java-rail">
        <span className="java-line" aria-hidden="true" />
        {JDKS.map((jdk) => (
          <div className={`java-node${jdk.extra ? " java-node-extra" : ""}`} key={jdk.version}>
            <span className="java-dot" aria-hidden="true" />
            <b>JDK {jdk.version}</b>
            <small>{jdk.note}</small>
            {jdk.extra && <em>{jdk.extra}</em>}
          </div>
        ))}
      </div>

      <div className="java-foot">
        <span>
          每个版本都断言 <code>/health</code> <code>/ready</code> <code>/stats</code> <code>/metrics</code>
        </span>
        <span>
          容器镜像 <code>eclipse-temurin:8-jre</code>
        </span>
      </div>
    </div>
  );
}
