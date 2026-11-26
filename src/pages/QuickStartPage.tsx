import { Tabs } from "antd";
import { AttachSchematic } from "../components/AttachSchematic";
import { CodeBlock } from "../components/CodeBlock";
import { ModeConvergence } from "../components/ModeConvergence";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { VerifyConsole } from "../components/VerifyConsole";
import {
  annotationExample,
  configExample,
  containerInstall,
  observabilityExample,
  pluginDependencyExample,
  prerequisites,
  programmaticExample,
  quickStart,
  releaseInstall,
  troubleshoots,
} from "../data/content";

const INSTALL_TABS = [
  {
    key: "release",
    label: "发行包",
    file: "terminal",
    code: releaseInstall,
    note: "推荐方式。v1.0.0 的 GitHub Release 提供 dist.zip、SHA-256 与 GPG 签名；zip 里已经包含 agent jar 和它需要的 plugins/ 目录。",
  },
  {
    key: "source",
    label: "源码构建",
    file: "terminal",
    code: quickStart,
    note: "target/plugins/ 与 agent jar 必须放在一起。只拷 jar 不会拦截任何东西。",
  },
  {
    key: "container",
    label: "容器镜像",
    file: "terminal",
    code: containerInstall,
    note: "仓库自带 Dockerfile 与 Helm chart，agent、plugins/ 和配置一起进镜像。",
  },
];

const MODE_TABS = [
  {
    key: "yaml",
    label: "YAML 配置",
    file: "weaver.yml",
    code: configExample,
    note: (
      <>
        用 <code className="inline">config=</code> 指定配置文件，<code className="inline">watch=true</code>{" "}
        开启热加载，<code className="inline">disabledPlugins</code> 按名关闭插件。
      </>
    ),
  },
  {
    key: "api",
    label: "编程式 API",
    file: "MyPlugin.java",
    code: programmaticExample,
    note: "在自己的 WeaverPlugin 里向注册表登记拦截器。",
  },
  {
    key: "annotation",
    label: "注解",
    file: "MyInterceptor.java",
    code: annotationExample,
    note: "用声明式注解描述拦截点，方法必须是 static。",
  },
];

export function QuickStartPage() {
  return (
    <>
      <PageHero
        kicker="BUILD & ATTACH"
        title="三步，把它跑起来"
        lede="构建底座、挂到你的 Java 程序、看结果。支持 Java 8 及以上；不需要改业务代码，也不需要额外安装中间件。"
      />

      <div className="page-body">
        <Reveal className="prose" variant="fade">
          如果只是先看看效果：把 agent jar 和它旁边的 <code className="inline">plugins/</code> 目录一起放进服务器，
          在启动命令里加一个 <code className="inline">-javaagent</code> 参数就行——相当于告诉 Java“启动时先加载这个工具”。
          业务代码不用改，程序照常启动。
        </Reveal>

        <Reveal className="attach-visual" variant="fade">
          <AttachSchematic />
        </Reveal>

        <Reveal as="h2" className="subhead">
          开始之前
        </Reveal>
        <div className="preflight-grid">
          {prerequisites.map((item, index) => (
            <Reveal key={item.key} className="preflight-card" delay={index * 70} variant="left">
              <span className="preflight-check" aria-hidden="true">
                ✓
              </span>
              <div>
                <b>{item.label}</b>
                <p>{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="h2" className="subhead">
          安装与挂载
        </Reveal>
        <Reveal variant="fade">
          <Tabs
            className="site-tabs"
            items={INSTALL_TABS.map((tab) => ({
              key: tab.key,
              label: tab.label,
              children: (
                <>
                  <p className="prose">{tab.note}</p>
                  <CodeBlock code={tab.code} file={tab.file} />
                </>
              ),
            }))}
          />
        </Reveal>

        <Reveal as="h2" className="subhead">
          三种写法，同一套注册表
        </Reveal>
        <Reveal className="mode-converge-visual" variant="fade">
          <ModeConvergence />
        </Reveal>
        <Reveal variant="fade">
          <Tabs
            className="site-tabs"
            items={MODE_TABS.map((tab) => ({
              key: tab.key,
              label: tab.label,
              children: (
                <>
                  <p className="prose">{tab.note}</p>
                  <CodeBlock code={tab.code} file={tab.file} />
                </>
              ),
            }))}
          />
        </Reveal>

        <Reveal as="h2" className="subhead">
          写自己的插件
        </Reveal>
        <Reveal className="prose" variant="fade">
          第三方插件只依赖 <code className="inline">weaver-girl-api</code>。实现{" "}
          <code className="inline">WeaverPlugin</code> 后把 jar 放进 <code className="inline">plugins/</code>
          ，它会和内置插件一起被加载。1.0.0 已发布在 GitHub；Maven Central 尚未上线，当前从 JitPack 解析依赖，
          本地开发也可以先从源码 <code className="inline">mvn install</code> 安装 SDK。
        </Reveal>
        <Reveal variant="scale">
          <CodeBlock code={pluginDependencyExample} file="pom.xml" />
        </Reveal>

        <Reveal as="h2" className="subhead">
          指标与健康检查
        </Reveal>
        <Reveal className="prose" variant="fade">
          metrics、health、OTLP 等都是运行时能力 jar，配置对应端口后才启用；Prometheus 抓取{" "}
          <code className="inline">/metrics</code>，Kubernetes 探针直接打{" "}
          <code className="inline">/health</code> 与 <code className="inline">/ready</code>。
        </Reveal>
        <Reveal variant="scale">
          <CodeBlock code={observabilityExample} file="terminal" />
        </Reveal>

        <Reveal as="h2" className="subhead">
          确认它真的在工作
        </Reveal>
        <Reveal className="prose" variant="fade">
          挂上之后不要只看“进程没崩”。下面四个端点逐个打一遍，能回答“agent 进来了没有、插件登记了没有、
          指标出没出来”。
        </Reveal>
        <Reveal className="verify-visual" variant="fade">
          <VerifyConsole />
        </Reveal>

        <Reveal as="h2" className="subhead">
          出问题先看这里
        </Reveal>
        <div className="trouble-list">
          {troubleshoots.map((item, index) => (
            <Reveal as="details" key={item.key} className="trouble-item" delay={index * 45}>
              <summary>
                <span className="trouble-symptom">{item.symptom}</span>
                <span className="trouble-icon" aria-hidden="true">
                  +
                </span>
              </summary>
              <dl>
                <div>
                  <dt>常见原因</dt>
                  <dd>{item.cause}</dd>
                </div>
                <div>
                  <dt>先这么做</dt>
                  <dd>{item.fix}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
