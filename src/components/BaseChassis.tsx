import { basePrimitives } from "../data/content";

/**
 * The four responsibilities as one machine rather than four rows: configuration
 * sits above the weave path, loading sits underneath everything, and the only
 * thing leaving the JVM is the export stream.
 */
export function BaseChassis() {
  const [config, weaving, exporter, loader] = basePrimitives;

  return (
    <div className="base-chassis">
      <div className="chassis-head">
        <span>运行中的 JVM</span>
        <span>底座不碰业务逻辑</span>
      </div>

      <article className="chassis-control">
        <span className="chassis-n">{config.n}</span>
        <div className="chassis-copy">
          <h3>
            {config.name}
            <small>{config.en}</small>
          </h3>
          <p>{config.detail}</p>
        </div>
        <code className="chassis-impl">{config.impl}</code>
      </article>

      <div className="chassis-core">
        <article className="chassis-node chassis-node-weave">
          <span className="chassis-n">{weaving.n}</span>
          <div className="chassis-copy">
            <h3>
              {weaving.name}
              <small>{weaving.en}</small>
            </h3>
            <p>{weaving.detail}</p>
          </div>
          <code className="chassis-impl">{weaving.impl}</code>
        </article>

        <span className="chassis-arrow" aria-hidden="true">
          →
        </span>

        <article className="chassis-node chassis-node-export">
          <span className="chassis-n">{exporter.n}</span>
          <div className="chassis-copy">
            <h3>
              {exporter.name}
              <small>{exporter.en}</small>
            </h3>
            <p>{exporter.detail}</p>
          </div>
          <code className="chassis-impl">{exporter.impl}</code>
        </article>

        <span className="chassis-arrow" aria-hidden="true">
          →
        </span>

        <div className="chassis-output">
          <span>你的平台</span>
          <small>监控 · 安全 · 审计</small>
        </div>
      </div>

      <article className="chassis-load">
        <span className="chassis-n">{loader.n}</span>
        <div className="chassis-copy">
          <h3>
            {loader.name}
            <small>{loader.en}</small>
          </h3>
          <p>{loader.detail}</p>
        </div>
        <div className="chassis-jars" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <small>plugins/</small>
        </div>
        <code className="chassis-impl">{loader.impl}</code>
      </article>
    </div>
  );
}
