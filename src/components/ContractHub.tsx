import { contractApis } from "../data/content";

const AREAS = ["registry", "tracer", "invocation", "metric", "exporter"];

/**
 * The public surface as a hub: one plugin entry point in the middle, five
 * things it may talk to around it, and the jar that carries them. This replaces
 * the old six-row table so the shape of the contract is visible before it is read.
 */
export function ContractHub() {
  const [core, ...satellites] = contractApis;

  return (
    <div className="contract-hub">
      <svg className="hub-spokes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 50 L16.7 16.7" />
        <path d="M50 50 L50 16.7" />
        <path d="M50 50 L83.3 16.7" />
        <path d="M50 50 L16.7 83.3" />
        <path d="M50 50 L50 83.3" />
      </svg>

      <div className="hub-core">
        <span>插件入口</span>
        <code>{core.name}</code>
        <small>{core.role.replace("插件入口：", "")}</small>
      </div>

      {satellites.map((api, index) => (
        <div className={`hub-node hub-${AREAS[index]}`} key={api.name}>
          <code>{api.name}</code>
          <span>{api.role}</span>
        </div>
      ))}

      <div className="hub-note">
        <span>唯一依赖</span>
        <code>weaver-girl-api</code>
      </div>
    </div>
  );
}
