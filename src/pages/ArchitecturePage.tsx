import { Fragment } from "react";
import { Alert } from "antd";
import { BridgeInvariant } from "../components/BridgeInvariant";
import { CallDivision } from "../components/CallDivision";
import { JavaSupport } from "../components/JavaSupport";
import { ModuleMap } from "../components/ModuleMap";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { WeaveMap } from "../components/WeaveMap";
import { isolationLayers } from "../data/content";

const FLOW = [
  { name: "premain", text: "启动时挂入目标 JVM" },
  { name: "plugins/", text: "按 jar 发现能力" },
  { name: "Registry", text: "登记拦截器与配置" },
  { name: "Advice", text: "内联进目标方法" },
];

const BRIDGES = ["注入桥接类，Advice 才能回连注册表", "只有 public API 跨过这条边界"];

export function ArchitecturePage() {
  return (
    <>
      <PageHero
        kicker="HOW IT WORKS"
        title="底座是怎么工作的"
        lede="它不碰业务逻辑，只在程序运行时，把插件登记的代码“织”到指定位置。一次挂载，四步完成：进入系统、发现插件、登记位置、织入逻辑。"
      />

      <div className="page-body">
        <Reveal className="prose" variant="fade">
          插件看到的是方法参数、返回值和异常，不是业务实现。底座负责发现、隔离和加载，
          至于拦到之后做什么判断，由插件自己决定。
        </Reveal>

        <Reveal className="weave-map-shell page-weave" variant="scale">
          <WeaveMap />
        </Reveal>

        <div className="flow" style={{ marginTop: 36 }}>
          {FLOW.map((node, i) => (
            <span key={node.name} style={{ display: "contents" }}>
              {i > 0 && <span className="flow-arrow">→</span>}
              <div className="flow-node">
                <em className="flow-step">{String(i + 1).padStart(2, "0")}</em>
                <b>{node.name}</b>
                <span>{node.text}</span>
              </div>
            </span>
          ))}
        </div>

        <Reveal variant="fade">
          <Alert
            className="arch-alert"
            type="info"
            showIcon={false}
            message="agent jar 本身不含插件实现"
            description="能力按 jar 拆分：内置插件放在 agent 旁边的 plugins/，运行时能力配置对应键后才加载。少了 plugins/，agent 能启动，但不会拦截任何东西。"
          />
        </Reveal>

        <Reveal as="h2" className="subhead">
          底座、应用与管控
        </Reveal>
        <Reveal className="call-division-visual" variant="fade">
          <CallDivision />
        </Reveal>

        <Reveal as="h2" className="subhead">
          模块
        </Reveal>
        <Reveal variant="fade">
          <ModuleMap />
        </Reveal>

        <Reveal as="h2" className="subhead">
          类加载隔离
        </Reveal>
        <Reveal className="bridge-invariant-visual" variant="fade">
          <BridgeInvariant />
        </Reveal>

        <div className="iso-stack">
          {isolationLayers.map((layer, index) => (
            <Fragment key={layer.key}>
              <Reveal className={`iso-layer tone-${layer.tone}`} delay={index * 90} variant="left">
                <div className="iso-head">
                  <span className="iso-label">{layer.label}</span>
                  <span className="iso-owns">{layer.owns}</span>
                </div>
                <p>{layer.detail}</p>
              </Reveal>
              {index < isolationLayers.length - 1 && (
                <div className="iso-bridge" aria-hidden="true">
                  <span>{BRIDGES[index]}</span>
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <Reveal as="h2" className="subhead">
          运行时要求
        </Reveal>
        <Reveal className="java-support-visual" variant="fade">
          <JavaSupport />
        </Reveal>
      </div>
    </>
  );
}
