import type { CSSProperties } from "react";
import { pluginGroupStats } from "../data/content";
import { Reveal } from "./Reveal";

const MAX = Math.max(...pluginGroupStats.map((group) => group.count));

/** Horizontal bars, one per functional group. Shows where the 126 plugins live. */
export function CategoryMap() {
  return (
    <div className="cat-map">
      {pluginGroupStats.map((group, index) => (
        <Reveal
          key={group.key}
          className={`cat-row tone-${group.tone}`}
          delay={index * 70}
          variant="left"
        >
          <span className="cat-label">{group.label}</span>
          <span className="cat-bar" aria-hidden="true">
            <i
              style={
                {
                  "--bar-w": `${Math.round((group.count / MAX) * 100)}%`,
                } as CSSProperties
              }
            />
          </span>
          <b className="cat-count">{group.count}</b>
          <span className="cat-names">
            {group.names.slice(0, 5).join(" · ")}
            {group.names.length > 5 ? " …" : ""}
          </span>
        </Reveal>
      ))}
    </div>
  );
}
