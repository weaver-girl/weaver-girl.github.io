import { modules, type ModuleRow } from "../data/content";

interface Layer {
  key: string;
  label: string;
  en: string;
  note: string;
  count: string;
  names: string[];
}

const LAYERS: Layer[] = [
  { key: "entry", label: "入口", en: "ENTRY", note: "挂载目标 JVM", count: "1", names: ["agent"] },
  {
    key: "capabilities",
    label: "能力",
    en: "CAPABILITIES",
    note: "按目录与配置加载",
    count: "126 · 14 · 2",
    names: ["plugins", "runtime-plugins", "bridge"],
  },
  {
    key: "engine",
    label: "引擎",
    en: "ENGINE",
    note: "发现、登记、织入",
    count: "3",
    names: ["core", "annotation", "annotation-runtime"],
  },
  { key: "contract", label: "契约", en: "CONTRACT", note: "插件唯一依赖", count: "1", names: ["api"] },
];

const TOOL_NAMES = ["testkit", "sample"];

function byName(name: string): ModuleRow | undefined {
  return modules.find((mod) => mod.key === name);
}

/**
 * Ten modules, grouped by the job they do rather than listed as ten rows.
 * The columns are roles, not a dependency chain: plugins depend on api, the
 * agent discovers and loads them, and that relationship is spelled out below.
 */
export function ModuleMap() {
  return (
    <div className="module-map">
      <div className="module-map-grid">
        {LAYERS.map((layer) => (
          <section className={`module-layer module-layer-${layer.key}`} key={layer.key}>
            <header className="module-layer-head">
              <span>{layer.label}</span>
              <small>{layer.en}</small>
              <p>{layer.note}</p>
              <em>{layer.count}</em>
            </header>
            <div className="module-cards">
              {layer.names.map((name) => {
                const mod = byName(name);
                if (!mod) return null;
                return (
                  <article className="module-card" key={mod.key}>
                    <code>{mod.name}</code>
                    <p>{mod.description}</p>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="module-tools">
        <div className="module-tools-head">
          <span>开发与示例</span>
          <small>不进入线上运行时</small>
        </div>
        <div className="module-tools-cards">
          {TOOL_NAMES.map((name) => {
            const mod = byName(name);
            if (!mod) return null;
            return (
              <article className="module-card" key={mod.key}>
                <code>{mod.name}</code>
                <p>{mod.description}</p>
              </article>
            );
          })}
        </div>
      </div>

      <p className="module-map-note">
        <span aria-hidden="true">↳</span>
        插件只依赖 <code>weaver-girl-api</code>；agent 负责发现、隔离并加载它们。
      </p>
    </div>
  );
}
