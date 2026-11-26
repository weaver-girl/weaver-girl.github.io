import { boundaries } from "../data/content";

/**
 * The three layers as a stack with one labelled contract line. The detailed
 * columns underneath stay the source of truth; this drawing answers "who owns
 * what" at a glance.
 */
export function BoundaryStack() {
  const control = boundaries.find((layer) => layer.tone === "control");
  const app = boundaries.find((layer) => layer.tone === "app");
  const base = boundaries.find((layer) => layer.tone === "base");

  if (!control || !app || !base) return null;

  return (
    <div className="boundary-stack" aria-hidden="true">
      <div className="boundary-stack-row boundary-stack-control">
        <span className="boundary-stack-owner">{control.owner}</span>
        <b>{control.layer}</b>
        <span className="boundary-stack-state">{control.state}</span>
      </div>
      <div className="boundary-stack-row boundary-stack-app">
        <span className="boundary-stack-owner">{app.owner}</span>
        <b>{app.layer}</b>
        <span className="boundary-stack-state">{app.state}</span>
      </div>
      <div className="boundary-stack-contract">
        <span />
        只通过 weaver-girl-api 通信
        <span />
      </div>
      <div className="boundary-stack-row boundary-stack-base">
        <span className="boundary-stack-owner">{base.owner}</span>
        <b>{base.layer}</b>
        <span className="boundary-stack-state">{base.state}</span>
      </div>
    </div>
  );
}
