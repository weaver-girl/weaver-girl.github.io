/** Static site content. Mirrors README.md, docs/ARCHITECTURE.md and the module tree. */

export const REPO_URL = "https://github.com/weaver-girl/weaver-girl";
/** The starter repository lives on its own, not under a path in the main repo. */
export const PLUGIN_TEMPLATE_URL = "https://github.com/weaver-girl/weaver-girl-plugin-template";
export const SITE_URL = "https://weaver-girl.github.io/";

export interface Feature {
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    title: "126 个内置插件",
    description:
      "Servlet、Spring、JDBC、MyBatis、Redis、Kafka、RocketMQ、gRPC、Dubbo、Feign、Netty、Tomcat 等开箱即用。每个能力一个 jar，目标库不在场就不会加载。",
  },
  {
    title: "三种接入写法",
    description:
      "编程式 API、声明式注解、YAML 配置，共用同一套拦截器注册表。业务代码一行不改，也能精确控制拦截范围。",
  },
  {
    title: "插件即产品底座",
    description:
      "做 APM、IAST 或 RASP 只需写一个插件：方法、构造方法、字段、异常捕获、静态块和接口引入，加上追踪、指标、导出、拓扑、告警和污点分析，全部只依赖 weaver-girl-api。",
  },
  {
    title: "零分配字节码织入",
    description:
      "基于 ByteBuddy Advice 内联拦截，支持跳过原方法与改写返回值，热路径上不产生额外对象。内置插件匹配的是各框架自己的实现类（例如 H2 的 JdbcStatement），不是 JDK 自带的 java.sql 接口，所以在应用类加载器上完成织入。",
  },
  {
    title: "动态挂载与热加载",
    description:
      "agentmain 运行时挂载并重转换已加载类；YAML 变更无需重启即可生效，关闭或开启插件同样即时。",
  },
  {
    title: "生产级自我保护",
    description:
      "同一个拦截器反复出错，熔断器会在一段冷却期内跳过它，冷却后自动再试；自适应采样在高负载下自动降低采样率；插件类加载器隔离，安全策略与审计日志托底。",
  },
];

/**
 * Functional groups for the plugin catalog. Every name in `allPlugins` belongs to exactly one
 * group; a test in the site repo keeps it that way when modules are added.
 */
export const pluginGroups: { key: string; label: string; names: string[] }[] = [
  {
    key: "db",
    label: "数据库",
    names: ["jdbc", "mybatis", "hibernate", "hibernatesearch", "druid", "hikari", "dbcp", "c3p0", "vibur", "pool", "clickhouse", "cassandra", "couchbase", "mongo", "hbase", "geode", "influxdb", "elasticsearch", "opensearch", "vertxsql", "vertxredis", "rediscala"],
  },
  {
    key: "cache",
    label: "缓存",
    names: ["caffeine", "redis", "jedis", "lettuce", "redisson", "memcached"],
  },
  {
    key: "mq",
    label: "消息队列",
    names: ["kafka", "springkafka", "rocketmq", "rabbitmq", "springamqp", "pulsar", "springpulsar", "jms", "springjms", "nats"],
  },
  {
    key: "web",
    label: "Web 框架",
    names: ["servlet", "spring", "springmvc", "springws", "springbatch", "springrmi", "webflux", "reactor", "netty", "tomcat", "jetty", "jettyhttp", "jetty12http", "undertow", "grizzly", "jaxrs", "jaxws", "jersey", "resteasy", "restlet", "struts", "struts2", "jsf", "jsp", "wicket", "tapestry", "vaadin", "dropwizard", "play", "playws", "ratpack", "sparkjava", "javalin", "jfinal", "jodd", "quarkus", "liberty", "grails", "gwt", "finatra", "vertx", "websocket", "graphql", "activej", "camel", "cxf"],
  },
  {
    key: "rpc",
    label: "RPC 与 HTTP 客户端",
    names: ["dubbo", "grpc", "thrift", "feign", "resttemplate", "httpclient", "httpclient5", "commonshttp", "okhttp", "asynchttp", "async", "httpasync", "ninghttp", "ghttp", "googlehttp", "awssdk", "awssdk2", "awslambda", "azurecore", "twilio", "kubernetes"],
  },
  {
    key: "func",
    label: "异步与调度",
    names: ["scheduled", "scheduling", "quartz", "xxljob", "powerjob", "elasticjob", "hystrix", "rxjava", "scalafuture", "scalaforkjoin", "kotlin", "avaje"],
  },
  {
    key: "meta",
    label: "通用能力",
    names: ["timing", "exception", "logging", "trace", "traceanno", "traced", "withspan", "elasticapm", "estransport"],
  },
];

/** One tone per functional group, reused by the catalogue and the coverage chart. */
export const pluginTones = ["clay", "olive", "ochre", "slate", "plum", "teal", "clay"] as const;

export interface PluginGroupStat {
  key: string;
  label: string;
  count: number;
  tone: (typeof pluginTones)[number];
  names: string[];
}

/** The catalogue at a glance: group sizes drive the bar chart on the home page. */
export const pluginGroupStats: PluginGroupStat[] = pluginGroups.map((group, index) => ({
  key: group.key,
  label: group.label,
  count: group.names.length,
  tone: pluginTones[index % pluginTones.length],
  names: group.names,
}));

export interface PluginRow {
  key: string;
  name: string;
  target: string;
  config: string;
  /** Runtime name when it differs from the module/catalogue name. */
  runtimeName?: string;
}

/**
 * Most-used plugins. Every `config` entry below is a key the plugin actually reads
 * (`context.getConfig*` in the plugin's own source) — a key that does not exist in the
 * code is worse than no hint at all, because it silently does nothing. `name` is the
 * module name from the catalogue; `runtimeName` is what `disabledPlugins` and the
 * per-plugin YAML block must say when the two differ.
 */
export const pluginHighlights: PluginRow[] = [
  { key: "servlet", name: "servlet", target: "javax.servlet", config: "slowThreshold, logHeaders" },
  { key: "spring", name: "spring", target: "Spring Framework", config: "slowThreshold, logArguments" },
  { key: "springmvc", name: "springmvc", target: "Spring MVC", config: "slowRequestThreshold" },
  { key: "jdbc", name: "jdbc", target: "java.sql", config: "slowQueryThreshold, logSql, maxSqlLength" },
  { key: "mybatis", name: "mybatis", target: "MyBatis", config: "slowQueryThreshold, logStatementId" },
  { key: "hibernate", name: "hibernate", target: "Hibernate", config: "slowQueryThreshold" },
  { key: "druid", name: "druid", target: "Druid", config: "slowSqlThreshold, slowConnectionThreshold" },
  { key: "hikari", name: "hikari", target: "HikariCP", config: "leakThresholdMs, trackAcquisition" },
  { key: "redis", name: "redis", target: "Jedis / Lettuce", config: "slowCommandThreshold, logKeys, maxKeyLength" },
  { key: "redisson", name: "redisson", target: "Redisson", config: "slowCommandThreshold, slowLockThreshold" },
  { key: "caffeine", name: "caffeine", target: "Caffeine Cache", config: "slowLoadThreshold" },
  { key: "kafka", name: "kafka", target: "Apache Kafka", config: "slowThreshold, logTopic" },
  { key: "rocketmq", name: "rocketmq", target: "Apache RocketMQ", config: "slowSendThreshold, slowConsumeThreshold" },
  { key: "rabbitmq", name: "rabbitmq", target: "RabbitMQ Client", config: "slowPublishThreshold, slowConsumeThreshold, trackMessageSize" },
  { key: "pulsar", name: "pulsar", target: "Apache Pulsar", config: "slowSendThreshold, slowConsumeThreshold" },
  { key: "grpc", name: "grpc", target: "io.grpc", config: "slowThreshold" },
  { key: "dubbo", name: "dubbo", target: "Apache Dubbo", config: "slowInvocationThreshold" },
  { key: "feign", name: "feign", target: "OpenFeign", config: "slowCallThreshold" },
  { key: "httpclient", name: "httpclient", target: "Apache HttpClient", config: "slowThreshold, propagateTrace, traceHeaderName" },
  { key: "okhttp", name: "okhttp", target: "OkHttp 3.x / 4.x", config: "slowThreshold, trackConnectionPool, propagateTrace" },
  { key: "netty", name: "netty", target: "Netty pipeline", config: "slowDispatchThreshold" },
  { key: "tomcat", name: "tomcat", target: "Tomcat connector", config: "slowRequestThreshold" },
  { key: "jetty", name: "jetty", target: "Jetty handler", config: "slowRequestThreshold" },
  { key: "undertow", name: "undertow", target: "Undertow handler", config: "slowRequestThreshold" },
  { key: "quartz", name: "quartz", target: "Quartz Scheduler", config: "slowJobThreshold" },
  { key: "xxljob", name: "xxljob", target: "XXL-Job executor", config: "slowJobThreshold" },
  { key: "timing", name: "timing", target: "任意方法", config: "slowThreshold, classPattern, methodPattern", runtimeName: "method-timing" },
  { key: "exception", name: "exception", target: "任意异常", config: "maxStackTraceDepth, alertOnNewException", runtimeName: "exception-monitor" },
  { key: "logging", name: "logging", target: "SLF4J / Log4j2", config: "mdcKeys, baggageKeys" },
  { key: "trace", name: "trace", target: "W3C Trace Context", config: "headerName, mdcKey, entryPointPattern", runtimeName: "trace-correlation" },
];


/**
 * Every instrumentation plugin module in weaver-girl-plugins/. Kept as a flat list so the
 * site cannot silently drift into advertising a subset as if it were the whole product.
 */
export const allPlugins: string[] = [
  "activej", "async", "asynchttp", "avaje", "awslambda", "awssdk", "awssdk2", "azurecore",
  "c3p0", "caffeine", "camel", "cassandra", "clickhouse", "commonshttp", "couchbase", "cxf",
  "dbcp", "dropwizard", "druid", "dubbo", "elasticapm", "elasticjob", "elasticsearch",
  "estransport", "exception", "feign", "finatra", "geode", "ghttp", "googlehttp", "grails",
  "graphql", "grizzly", "grpc", "gwt", "hbase", "hibernate", "hibernatesearch", "hikari",
  "httpasync", "httpclient", "httpclient5", "hystrix", "influxdb", "javalin", "jaxrs", "jaxws",
  "jdbc", "jedis", "jersey", "jetty", "jetty12http", "jettyhttp", "jfinal", "jms", "jodd",
  "jsf", "jsp", "kafka", "kotlin", "kubernetes", "lettuce", "liberty", "logging", "memcached",
  "mongo", "mybatis", "nats", "netty", "ninghttp", "okhttp", "opensearch", "play", "playws",
  "pool", "powerjob", "pulsar", "quarkus", "quartz", "rabbitmq", "ratpack", "reactor", "redis",
  "rediscala", "redisson", "resteasy", "restlet", "resttemplate", "rocketmq", "rxjava",
  "scalaforkjoin", "scalafuture", "scheduled", "scheduling", "servlet", "sparkjava", "spring",
  "springamqp", "springbatch", "springjms", "springkafka", "springmvc", "springpulsar",
  "springrmi", "springws", "struts", "struts2", "tapestry", "thrift", "timing", "tomcat",
  "trace", "traceanno", "traced", "twilio", "undertow", "vaadin", "vertx", "vertxredis",
  "vertxsql", "vibur", "webflux", "websocket", "wicket", "withspan", "xxljob",
];

export interface RuntimeRow {
  key: string;
  name: string;
  description: string;
}

/** Optional capability jars in weaver-girl-runtime-plugins/. Each activates from its config key. */
export const runtimeCapabilities: RuntimeRow[] = [
  { key: "prometheus", name: "prometheus", description: "Prometheus 指标端点：事件计数、慢调用/错误、Agent 自身与 JVM 指标" },
  { key: "health", name: "health", description: "/health 与 /ready 探针，直接对接 Kubernetes liveness / readiness" },
  { key: "otlp", name: "otlp", description: "OTLP/HTTP JSON 导出：span、日志与 resource attributes" },
  { key: "span-export", name: "span-export", description: "拦截事件批量导出为 span，含父子关系与批处理" },
  { key: "json-events", name: "json-events", description: "结构化 JSON 事件流，便于接入现有日志管道" },
  { key: "jmx", name: "jmx", description: "JMX MBean：Agent 状态、插件与拦截器指标" },
  { key: "diagnostics", name: "diagnostics", description: "自诊断：内存趋势、拦截热点、故障检测与 /stats" },
  { key: "taint", name: "taint", description: "污点分析运行时：source / propagator / sink，IAST 的数据流底座" },
  { key: "management-api", name: "management-api", description: "REST 管理接口：Agent 状态、插件、拓扑、告警与指标" },
  { key: "annotation-scan", name: "annotation-scan", description: "启动时扫描 @WeaveClass，注解模式无需手动登记" },
  { key: "config-watch", name: "config-watch", description: "YAML 热加载：文件变更后不重启生效" },
  { key: "dynamic-refresh", name: "dynamic-refresh", description: "运行期开关与配置刷新，支持快照与回滚" },
  { key: "alert-file", name: "alert-file", description: "告警引擎落盘通道，规则命中即写文件" },
  { key: "update-check", name: "update-check", description: "版本更新检查，只在显式配置时联网" },
];

export interface Scenario {
  key: string;
  tag: string;
  title: string;
  description: string;
  outcomes: string[];
}

/** Product shapes the base is designed to carry. Data security, resilience and audit have runnable demos; APM/IAST/RASP are the product layer. */
export const scenarios: Scenario[] = [
  {
    key: "apm",
    tag: "APM",
    title: "把调用链和指标接出来",
    description:
      "Servlet、RPC、数据库、缓存、消息队列的拦截事件自动串成 span，W3C traceparent 跨进程透传，OTLP 或 Prometheus 任选。",
    outcomes: ["跨服务 traceparent / baggage 透传", "服务拓扑与 p50/p95/p99 指标", "OTLP、Prometheus、JSON 事件多种出口"],
  },
  {
    key: "iast",
    tag: "IAST",
    title: "在运行时跟踪污点数据流",
    description:
      "taint 能力把 source、propagator、sink 串起来，配合方法/字段拦截，在不改代码的前提下发现注入类风险。",
    outcomes: ["请求参数到 SQL / 命令执行的链路", "字段读写自动传播污点", "按规则命中告警，不阻断业务"],
  },
  {
    key: "rasp",
    tag: "RASP",
    title: "把运行时防护做成插件",
    description:
      "在危险调用前后做判定：命中规则时跳过方法、改写返回值或替换异常。底座提供拦截位置、上下文、隔离与熔断；规则库和阻断白名单属于应用层，本仓库不内置。",
    outcomes: ["方法跳过、返回值改写、异常替换", "字段写拒绝与 catch 抑制", "插件级隔离，规则出错不拖垮业务"],
  },
  {
    key: "security",
    tag: "数据安全",
    title: "脱敏与审计做成插件",
    description:
      "插件可以在方法返回前改写敏感字段，也可以统计每一次脱敏；业务代码完全不知道插件存在。仓库自带 support-desk 演示可复现。",
    outcomes: ["卡号、手机号返回前脱敏", "脱敏次数进指标而不是日志", "插件 jar 放进 plugins/ 即生效"],
  },
  {
    key: "resilience",
    tag: "业务韧性",
    title: "给没有保护的下游加一层",
    description:
      "用拦截器统计失败并在阈值后熔断，后续请求直接走降级分支。payment-gateway 演示里，同一个程序挂上插件后不再打满故障下游。",
    outcomes: ["连续失败自动打开熔断", "降级请求计数可观测", "支持按目标方法独立配置"],
  },
];

export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseTrace {
  /** The caller or entry point, in product language. */
  from: string;
  /** The real class or method the plugin weaves into. */
  method: string;
  /** What sits on the other side of the intercepted call. */
  to: string;
  /** What the plugin does at the weave point. */
  tap: string;
  /** The observable result of that intervention. */
  effect: string;
}

export interface CaseStudy {
  key: string;
  tag: string;
  tagColor: "blue" | "volcano" | "purple";
  title: string;
  subtitle: string;
  scene: string;
  problem: string;
  approach: string;
  trace: CaseTrace;
  /** Plain-language restatement of `approach`, shown above the technical detail. */
  plain?: string;
  beforeLabel: string;
  before: string;
  afterLabel: string;
  after: string;
  metrics: CaseMetric[];
  value: string[];
  run: string;
  demo: string;
  sources: { label: string; href: string }[];
}

/**
 * Runnable case studies. Every program below is sample code in this repository and never imports
 * its plugin; the two outputs are copied from the scripts' real runs, not written by hand.
 */
export const caseStudies: CaseStudy[] = [
  {
    key: "redaction",
    tag: "数据安全",
    tagColor: "blue",
    title: "客服工单里的卡号，在离开系统前被掩码",
    subtitle: "同一个工单程序，业务代码一行不改；差别只是 plugins/ 目录里多了一个 jar。",
    trace: {
      from: "客服工单",
      method: "TicketStore.render",
      to: "聊天 / 导出",
      tap: "返回前改写返回值",
      effect: "卡号、手机号在离开系统前被掩码",
    },
    scene:
      "客服每天把工单内容复述到聊天窗口或工单备注里。工单系统保存的是客户原文，卡号和手机号会随文本一起离开系统。",
    problem:
      "合规要求敏感信息不得明文外发，但脱敏点分散在导出、复制、对接等多个出口，靠人工检查必然有漏网之鱼。",
    plain: "工单库里的原文不变，只在数据“交出去”的那一刻把卡号和手机号打码，谁复制、谁导出都一样。",
    approach:
      "redaction 插件按类名织入 TicketStore.render，在方法返回前用 @Advice.Return(readOnly = false) 改写返回值。工单存储保持原文，只有交出去的那一份被掩码。",
    beforeLabel: "没有插件",
    before: `what the agent would paste into chat:
  ticket 1: my card 4111111111111234 was charged twice, please refund
  ticket 2: call me back on 13812345678 about order 9001

secrets the plugin caught (0):
secrets masked, from the metric registry: 0

plugin not active: the raw card number and phone number left the process`,
    afterLabel: "挂上插件",
    after: `[ticket-redaction] ticket 1: masked 1 secret(s) before it left the desk
[ticket-redaction] ticket 2: masked 1 secret(s) before it left the desk
what the agent would paste into chat:
  ticket 1: my card 411111******1234 was charged twice, please refund
  ticket 2: call me back on 138****5678 about order 9001

secrets the plugin caught (2):
  ticket 1: masked 1 secret(s) before it left the desk
  ticket 2: masked 1 secret(s) before it left the desk
secrets masked, from the metric registry: 2

plugin active: the pasted text was redacted without the desk knowing`,
    metrics: [
      { value: "2", label: "卡号与手机号被掩码" },
      { value: "0", label: "业务代码改动行数" },
      { value: "2", label: "脱敏指标计数" },
    ],
    value: [
      "合规出口收敛到一处，以后新增的出口自动继承掩码",
      "原文留在工单里，审计和客服仍可追溯",
      "每次脱敏都进 MetricRegistry，可直接做报表和告警",
    ],
    run: "SKIP_BUILD=1 scripts/run-scenario-demos.sh",
    demo: "com.example.support.RedactionDemo",
    sources: [
      {
        label: "RedactionDemo.java",
        href: `${REPO_URL}/blob/main/weaver-girl-sample/src/main/java/com/example/support/RedactionDemo.java`,
      },
      {
        label: "RedactionPlugin.java",
        href: `${REPO_URL}/blob/main/weaver-girl-sample/src/main/java/com/github/cc11001100/weavergirl/sample/redaction/RedactionPlugin.java`,
      },
    ],
  },
  {
    key: "resilience",
    tag: "业务韧性",
    tagColor: "volcano",
    title: "故障支付通道被熔断，请求不再继续打过去",
    subtitle: "网关自己没有重试、没有降级；插件在它和下游之间补上这一层。",
    trace: {
      from: "支付网关",
      method: "PaymentGateway.charge",
      to: "下游通道",
      tap: "连续失败 3 次后打开熔断",
      effect: "第 4 笔直接拿到降级结果，不再打下游",
    },
    scene:
      "支付网关调用下游通道。通道在一段时间内连续超时，而这套网关是早期代码，没有熔断和降级逻辑。",
    problem:
      "六笔请求全部打到故障通道，四笔失败直接抛给用户；故障期间下游被持续打满，恢复也更慢。",
    plain: "网关照常调用下游，但连续失败三次后自动“断路”：后面的请求直接拿到降级结果，不再打到已经挂掉的通道上。",
    approach:
      "resilience 插件拦截 PaymentGateway.charge：连续三次失败后打开熔断，第四笔直接返回 queued: 降级结果，不再占用下游；通道恢复后自动闭合。",
    beforeLabel: "没有插件",
    before: `charges:
  charge 1 -> failed: provider timed out on call 1
  charge 2 -> failed: provider timed out on call 2
  charge 3 -> failed: provider timed out on call 3
  charge 4 -> failed: provider timed out on call 4
  charge 5 -> approved:500
  charge 6 -> approved:600

served by the provider: 2, failed: 4, shed by the plugin: 0
the provider was actually called 6 time(s)

what the plugin decided (0):
charges shed, from the metric registry: 0

plugin not active: every charge hit the provider and every failure reached the caller`,
    afterLabel: "挂上插件",
    after: `charges:
[gateway-resilience] charge of 100 cents failed (1 in a row)
  charge 1 -> failed: provider timed out on call 1
[gateway-resilience] charge of 200 cents failed (2 in a row)
  charge 2 -> failed: provider timed out on call 2
[gateway-resilience] charge of 300 cents failed (3 in a row), circuit opened
  charge 3 -> failed: provider timed out on call 3
[gateway-resilience] shed charge of 400 cents, circuit open
  charge 4 -> queued:400 (answered without the provider)
[gateway-resilience] charge of 500 cents failed (1 in a row)
  charge 5 -> failed: provider timed out on call 4
[gateway-resilience] charge of 600 cents approved, circuit closed
  charge 6 -> approved:600

served by the provider: 1, failed: 4, shed by the plugin: 1
the provider was actually called 5 time(s)

what the plugin decided (6):
  charge of 100 cents failed (1 in a row)
  charge of 200 cents failed (2 in a row)
  charge of 300 cents failed (3 in a row), circuit opened
  shed charge of 400 cents, circuit open
  charge of 500 cents failed (1 in a row)
  charge of 600 cents approved, circuit closed
charges shed, from the metric registry: 1

plugin active: the circuit breaker shed a charge the gateway would have sent`,
    metrics: [
      { value: "5", label: "下游实际调用次数（原 6）" },
      { value: "1", label: "被熔断降级的请求" },
      { value: "3", label: "连续失败后打开熔断" },
    ],
    value: [
      "故障期间不再放大无效流量，下游恢复更快",
      "调用方拿到明确的降级结果，而不是一串超时异常",
      "熔断与降级量进入指标，可以接告警和看板",
    ],
    run: "SKIP_BUILD=1 scripts/run-scenario-demos.sh",
    demo: "com.example.gateway.ResilienceDemo",
    sources: [
      {
        label: "ResilienceDemo.java",
        href: `${REPO_URL}/blob/main/weaver-girl-sample/src/main/java/com/example/gateway/ResilienceDemo.java`,
      },
      {
        label: "ResiliencePlugin.java",
        href: `${REPO_URL}/blob/main/weaver-girl-sample/src/main/java/com/github/cc11001100/weavergirl/sample/resilience/ResiliencePlugin.java`,
      },
    ],
  },
  {
    key: "audit",
    tag: "业务审计",
    tagColor: "purple",
    title: "支付审计线旁路生成，核心链路零改动",
    subtitle: "财务要逐笔审计，支付服务不用排期改代码，插件自己把数据取走。",
    trace: {
      from: "支付服务",
      method: "PaymentService",
      to: "扣款 / 退款",
      tap: "监听拦截事件，脱敏后交给 DataExporter",
      effect: "审计行旁路生成，核心链路不调用它",
    },
    scene:
      "支付服务处理扣款和退款。财务与风控需要逐笔审计线，但服务里原本没有任何埋点。",
    problem:
      "在核心支付链路里加审计代码需要排期、回归和发布；任何一处遗漏，都会让对账缺数据。",
    plain: "审计记录在业务代码之外生成：每笔扣款自动复制一份脱敏后的流水，原来的支付逻辑一行不用动。",
    approach:
      "audit 插件按类名监听 PaymentService，在拦截事件里脱敏卡号、把扣款金额累加到 MetricRegistry，并通过自己的 DataExporter 输出审计行；被拒绝的扣款不计入。",
    beforeLabel: "没有插件",
    before: `service rejected a bad charge: amount must be positive, got -1

payments the service recorded:
  Payment{id=1, card=4111111111111234, amount=2599, status=REFUNDED}
  Payment{id=2, card=5500000000009876, amount=750, status=CHARGED}

audit events the plugin published (0):
cents charged, from the metric registry: 0

plugin not active: run this under the agent with the plugin jar in plugins/`,
    afterLabel: "挂上插件",
    after: `[payment-audit] charge card=4111********1234 cents=2599 in 4ms
[payment-audit] exported charge card=4111********1234 cents=2599 in 4ms
[payment-audit] charge card=5500********9876 cents=750 in 0ms
[payment-audit] exported charge card=5500********9876 cents=750 in 0ms
[payment-audit] refund payment=1 in 0ms
[payment-audit] exported refund payment=1 in 0ms
service rejected a bad charge: amount must be positive, got -1

payments the service recorded:
  Payment{id=1, card=4111111111111234, amount=2599, status=REFUNDED}
  Payment{id=2, card=5500000000009876, amount=750, status=CHARGED}

audit events the plugin published (3):
  charge card=4111********1234 cents=2599 in 4ms
  charge card=5500********9876 cents=750 in 0ms
  refund payment=1 in 0ms
cents charged, from the metric registry: 3349

plugin active: the audit trail was produced without the service calling it`,
    metrics: [
      { value: "3", label: "审计事件（2 扣款 + 1 退款）" },
      { value: "3349", label: "扣款金额合计（分）" },
      { value: "0", label: "支付服务改动行数" },
    ],
    value: [
      "审计线旁路生成，核心支付链路不用重新发布",
      "敏感卡号在审计输出前已脱敏，财务可直接查看",
      "被拒绝的扣款自动排除，金额汇总可直接对账",
    ],
    run: "SKIP_BUILD=1 scripts/run-audit-demo.sh",
    demo: "com.example.payments.AuditDemo",
    sources: [
      {
        label: "AuditDemo.java",
        href: `${REPO_URL}/blob/main/weaver-girl-sample/src/main/java/com/example/payments/AuditDemo.java`,
      },
      {
        label: "AuditPlugin.java",
        href: `${REPO_URL}/blob/main/weaver-girl-sample/src/main/java/com/github/cc11001100/weavergirl/sample/audit/AuditPlugin.java`,
      },
    ],
  },
];

export const stats = [
  { value: "126", unit: "个", label: "内置插桩插件" },
  { value: "14", unit: "个", label: "可选运行时能力" },
  { value: "3", unit: "种", label: "接入写法" },
  { value: "8–21", unit: "", label: "JDK 版本覆盖" },
];

export const benchmarks = [
  { value: "≈1.2 ns", label: "精确类/方法匹配" },
  { value: "≈25 ns", label: "熔断检查" },
  { value: "3,819", label: "自动化测试" },
  { value: "0.0", label: "SpotBugs High / Checkstyle 违规" },
];

export const quickStart = `git clone ${REPO_URL}.git
cd weaver-girl
mvn clean package -DskipTests

cd weaver-girl-agent/target
# plugins/ 必须与 agent jar 放在一起（发行包已打包好）
java -javaagent:weaver-girl-agent-1.0.0-SNAPSHOT.jar \\
  -jar your-app.jar`;

export const releaseInstall = `# v1.0.0 的 Release 带 dist.zip、sha256 与 GPG 签名；先下压缩包，别只下 jar
VERSION=1.0.0
curl -LO https://github.com/weaver-girl/weaver-girl/releases/download/v$VERSION/weaver-girl-agent-$VERSION-dist.zip
curl -LO https://github.com/weaver-girl/weaver-girl/releases/download/v$VERSION/weaver-girl-agent-$VERSION-dist.zip.sha256
sha256sum -c weaver-girl-agent-$VERSION-dist.zip.sha256

# 验签：导入发布公钥（也在仓库 docs/release-signing-key.asc 里）
gpg --keyserver hkps://keyserver.ubuntu.com --recv-keys 56EF998B96FA1B31
curl -LO https://github.com/weaver-girl/weaver-girl/releases/download/v$VERSION/weaver-girl-agent-$VERSION-dist.zip.asc
gpg --verify weaver-girl-agent-$VERSION-dist.zip.asc weaver-girl-agent-$VERSION-dist.zip

# 解包后 plugins/ 必须和 agent jar 放在同一层
unzip weaver-girl-agent-$VERSION-dist.zip
java -javaagent:weaver-girl-agent-$VERSION/weaver-girl-agent-$VERSION.jar \\
  -jar your-app.jar`;

export const containerInstall = `# 先用仓库自带的 Dockerfile 构建基础镜像：agent 和 plugins/ 都打在里面
mvn clean package -DskipTests
docker build -t weaver-girl-base .

# 业务镜像只需 FROM 它，再把你的 jar 放进去并设置 APP_JAR
# 入口脚本会用 JAVA_AGENT_OPTS 把 agent 挂好（metricsPort / healthPort / diagnosticsPort 已默认开启）
cat > Dockerfile <<'DOCKER'
FROM weaver-girl-base
COPY target/app.jar /opt/app/app.jar
ENV APP_JAR=/opt/app/app.jar
DOCKER
docker build -t my-app-with-weaver .
docker run --rm -p 8080:8080 -p 9401:9401 my-app-with-weaver`;

export const configExample = `# 只拦截自己的代码
onlyInterceptPackages:
  - com.myapp

# 按名称关闭不需要的插件
disabledPlugins:
  - servlet

# 或者反过来，只加载列出的能力
# enabledPlugins:
#   - jdbc
#   - servlet

# 自定义拦截器
interceptors:
  - className: com.myapp.service.UserService
    method: createUser
    before: com.myapp.interceptor.AuditAdvice`;

export const programmaticExample = `@Override
public void registerInterceptors(InterceptorRegistry registry) {
    intercept("com.example.Service")
        .method("process")
        .before(inv -> log.debug("Before: {}", inv.getMethodName()))
        .after(inv -> log.debug("After: {}", inv.getMethodName()))
        .register(registry);
}`;

export const annotationExample = `@WeaveClass(className = "com.example.Service")
public class MyInterceptor {

    @Before(methodName = "process")
    public static void beforeProcess(MethodInvocation invocation) {
        // Service.process() 执行前
    }

    @After(methodName = "process")
    public static void afterProcess(MethodInvocation invocation) {
        // Service.process() 执行后
    }
}`;

export const pluginDependencyExample = `<!-- 1.0.0 已发布在 GitHub；Maven Central 尚未上线，先走 JitPack -->
<repositories>
  <repository>
    <id>jitpack</id>
    <url>https://jitpack.io</url>
  </repository>
</repositories>

<dependency>
  <groupId>com.github.weaver-girl.weaver-girl</groupId>
  <artifactId>weaver-girl-api</artifactId>
  <version>v1.0.0</version>
  <scope>provided</scope>
</dependency>`;

export const observabilityExample = `java -javaagent:agent.jar=metricsPort=9400,healthPort=9401 -jar app.jar

curl http://localhost:9401/health   # 存活探针
curl http://localhost:9401/ready    # 就绪探针
curl http://localhost:9400/metrics  # Prometheus 指标`;

export interface DocLink {
  title: string;
  description: string;
  href: string;
}

export interface DocLink {
  title: string;
  description: string;
  href: string;
  /** Reading path this doc belongs to; the docs page renders one block per topic. */
  topic?: "understand" | "build" | "operate" | "evolve";
}

/** The order a newcomer should read in, used by the docs page. */
export const docTopics: { key: NonNullable<DocLink["topic"]>; label: string; hint: string }[] = [
  { key: "understand", label: "先弄清楚它是什么", hint: "10 分钟，回答“这跟我有什么关系”。" },
  { key: "build", label: "把它接进系统", hint: "插件怎么写、配置怎么填。" },
  { key: "operate", label: "放到线上", hint: "部署、观测、出问题怎么查。" },
  { key: "evolve", label: "长期维护", hint: "版本、性能与下一步计划。" },
];

export const docLinks: DocLink[] = [
  { title: "产品定位", description: "切面底座与完整 APM 平台的边界", href: `${REPO_URL}/blob/main/docs/positioning.md`, topic: "understand" },
  { title: "架构说明", description: "模块划分、类加载隔离与织入流程", href: `${REPO_URL}/blob/main/docs/ARCHITECTURE.md`, topic: "understand" },
  { title: "切面底座定位", description: "为什么本仓库只做底座，APM / IAST / RASP 属于切面应用", href: `${REPO_URL}/blob/main/docs/ant-aspect-base-decision.md`, topic: "understand" },
  { title: "插件开发指南", description: "从零编写并发布一个 WeaverPlugin", href: `${REPO_URL}/blob/main/docs/plugin-developer-guide.md`, topic: "build" },
  { title: "YAML 配置参考", description: "全部配置项与默认值", href: `${REPO_URL}/blob/main/docs/yaml-config-reference.md`, topic: "build" },
  { title: "扩展点指南", description: "采样、导出、告警等 SPI 的扩展方式", href: `${REPO_URL}/blob/main/docs/extension-point-guide.md`, topic: "build" },
  { title: "运维手册", description: "Kubernetes、Docker 与生产部署", href: `${REPO_URL}/blob/main/docs/runbook.md`, topic: "operate" },
  { title: "可观测性指南", description: "追踪、指标、OTLP 与告警的完整目录", href: `${REPO_URL}/blob/main/docs/observability.md`, topic: "operate" },
  { title: "故障排查", description: "常见挂载与拦截问题的定位方法", href: `${REPO_URL}/blob/main/docs/troubleshooting.md`, topic: "operate" },
  { title: "性能基线", description: "各热路径组件的 ns/op 与回归守卫", href: `${REPO_URL}/blob/main/docs/benchmarks/baseline-v1.md`, topic: "evolve" },
  { title: "版本与兼容性", description: "语义化版本、公开 API 与 Java 支持范围", href: `${REPO_URL}/blob/main/docs/versioning-and-compatibility.md`, topic: "evolve" },
  { title: "路线图", description: "1.0 发布、生态建设与 2.0 平台能力", href: `${REPO_URL}/blob/main/ROADMAP.md`, topic: "evolve" },
  { title: "变更记录", description: "每个版本做了什么", href: `${REPO_URL}/blob/main/CHANGELOG.md`, topic: "evolve" },
];

export interface ModuleRow {
  key: string;
  name: string;
  description: string;
}

export const modules: ModuleRow[] = [
  { key: "api", name: "weaver-girl-api", description: "插件 SDK：第三方插件唯一依赖的模块，含拦截、追踪、指标、导出与污点分析" },
  { key: "core", name: "weaver-girl-core", description: "引擎：ByteBuddy 转换器、注册表、配置、熔断与采样" },
  { key: "annotation", name: "weaver-girl-annotation", description: "声明式注解：@WeaveClass、@Before、@After、@Around" },
  { key: "annotation-runtime", name: "weaver-girl-annotation-runtime", description: "注解切面的加载与织入运行时" },
  { key: "plugins", name: "weaver-girl-plugin-*", description: "126 个内置插桩插件，每个插件一个独立模块，只依赖 api" },
  { key: "runtime-plugins", name: "weaver-girl-runtime-*", description: "14 个可选运行时能力（指标、健康检查、OTLP、热加载、污点分析等），配置了才加载" },
  { key: "bridge", name: "weaver-girl-bridge-*", description: "可选桥接：Micrometer 指标与 AOP Alliance 拦截器" },
  { key: "agent", name: "weaver-girl-agent", description: "Agent 入口：premain / agentmain、插件目录发现与 YAML 配置加载" },
  { key: "testkit", name: "weaver-girl-testkit", description: "进程内测试工具，插件作者无需真实框架即可验证织入行为" },
  { key: "sample", name: "weaver-girl-sample", description: "示例应用，演示编程式、注解与 YAML 三种模式" },
];

/* -------------------------------------------------------------------------
 * Hook-base positioning. The site describes an infrastructure component:
 * four responsibilities, one public contract, and a boundary the product
 * layer owns. Keep this copy aligned with docs/positioning.md.
 * ---------------------------------------------------------------------- */

export interface Primitive {
  n: string;
  name: string;
  en: string;
  impl: string;
  detail: string;
}

/** Plain-language framing for the home page: the problem before the mechanism. */
export const beforeBase = [
  "每加一项能力，就得改一次业务代码",
  "每个团队各写一套土办法，坑要踩一遍",
  "上线要排期、回归、发布，几个星期就这么过去",
  "一处出错，往往拖累整个系统",
];

export const afterBase = [
  "能力做成插件，放进目录就生效",
  "业务代码一行不改，也不用提前留接口",
  "改配置即时生效，连重启都省了",
  "插件彼此隔离，坏一个只摘它自己",
];

export interface Outcome {
  key: string;
  en: string;
  title: string;
  text: string;
  tone: "clay" | "olive" | "slate";
}

/** What teams actually build on top of the base, in ordinary language. */
export const outcomes: Outcome[] = [
  {
    key: "apm",
    en: "APM · 监控",
    title: "看清系统慢在哪里",
    text: "一次请求走过哪些服务、每一步花了多久，自动记下来——不用在业务代码里埋点。",
    tone: "clay",
  },
  {
    key: "security",
    en: "IAST / RASP · 安全",
    title: "发现并挡住安全问题",
    text: "检查流进系统的数据，找出代码里的漏洞；可疑请求还没碰到核心逻辑，就被拦在门外。",
    tone: "olive",
  },
  {
    key: "audit",
    en: "AUDIT · 审计",
    title: "留下可追溯的记录",
    text: "谁、在什么时候、动了哪条敏感数据，全部自动留痕——合规、对账、事后追查都有据可查。",
    tone: "slate",
  },
];

/** The four responsibilities a hook base owns; everything else is a product. */
export const basePrimitives: Primitive[] = [
  {
    n: "01",
    name: "配置读取",
    en: "CONFIG",
    impl: "weaver.yml · watch=true",
    detail: "告诉底座该开哪些能力。改完即时生效，不用重启，接入方式始终不变。",
  },
  {
    n: "02",
    name: "拦截植入",
    en: "WEAVING",
    impl: "WeaverTransformer · ByteBuddy Advice",
    detail:
      "在程序的关键位置“插一句话”：方法进入、方法返回、字段读写、抛出异常时都能插。业务代码不用改，也不用提前留接口。",
  },
  {
    n: "03",
    name: "数据上报",
    en: "EXPORT",
    impl: "events · metrics · trace · OTLP",
    detail: "把看到的事整理成事件、指标和调用链，送进你自己的监控或安全平台。",
  },
  {
    n: "04",
    name: "模块加载",
    en: "LOADING",
    impl: "AgentClassLoader · plugins/",
    detail: "每个能力独立打包、独立加载。哪个插件坏了，摘掉它就行，系统照常跑。",
  },
];

export interface BoundaryLayer {
  layer: string;
  owner: string;
  state: string;
  items: string[];
  tone: "base" | "app" | "control";
  /** One sentence for readers who will not read the bullets. */
  summary?: string;
}

/** Where the base stops. This table is the positioning argument, not a feature list. */
export const boundaries: BoundaryLayer[] = [
  {
    layer: "切面底座",
    owner: "本仓库",
    state: "提供",
    tone: "base",
    summary: "底座负责“通电”：知道怎么接进程序、把插件装好、把数据送出去。",
    items: [
      "读取配置，改完即时生效",
      "在方法、构造方法、字段、异常、静态块和接口处插入逻辑",
      "改写参数与返回值",
      "把事件、指标、链路送出去",
      "加载插件，隔离、熔断与采样",
    ],
  },
  {
    layer: "切面应用",
    owner: "插件",
    state: "由你实现",
    tone: "app",
    summary: "插件（也就是产品）负责“决定”：拦到之后怎么判断、记什么、报给谁。",
    items: [
      "监控平台（APM）：记录请求怎么走",
      "安全检测（IAST）：发现代码里的漏洞",
      "攻击拦截（RASP）：运行时挡住攻击",
      "数据脱敏与审计口径",
      "降级、重试与业务判定",
    ],
  },
  {
    layer: "切面管控",
    owner: "产品层",
    state: "不提供",
    tone: "control",
    summary: "管控层负责“物业”：界面、存储、告警与权限，交给你自己的平台团队。",
    items: [
      "控制台与规则下发",
      "数据存储、查询与检索",
      "告警编排与权限",
      "多租户与计费",
      "跨系统的集中管理",
    ],
  },
];

export interface ContractApi {
  name: string;
  role: string;
}

/** The public surface a plugin may rely on. Everything else is internal. */
export const contractApis: ContractApi[] = [
  { name: "WeaverPlugin", role: "插件入口：声明名称并登记拦截器" },
  { name: "InterceptorRegistry", role: "登记拦截位置的地方（方法、字段、异常等）" },
  { name: "MethodInvocation", role: "参数、返回值与异常" },
  { name: "Tracer", role: "记录调用区间，并在服务之间传递 trace id" },
  { name: "MetricRegistry", role: "计数、计时，随时读出快照" },
  { name: "DataExporter", role: "把事件送到自己的后端" },
];

export interface Guarantee {
  title: string;
  en: string;
  detail: string;
}

export const guarantees: Guarantee[] = [
  {
    title: "失败开放",
    en: "FAIL-OPEN",
    detail: "插件织入失败时保留程序原样，兄弟类继续处理，进程照常运行。",
  },
  {
    title: "类加载隔离",
    en: "ISOLATION",
    detail: "插件和业务代码各用各的类库，同名依赖不会互相覆盖。",
  },
  {
    title: "热加载",
    en: "HOT RELOAD",
    detail: "改配置、开关插件都不需要重启，连接和业务状态不丢。",
  },
  {
    title: "自我保护",
    en: "CONTAINMENT",
    detail: "同一个拦截器一直出错，熔断器会打开并在一段冷却期内跳过它，之后自动再试；系统压力大时自动降低采样。",
  },
  {
    title: "公开契约",
    en: "CONTRACT",
    detail: "插件只依赖一个稳定的 API，底座内部升级不会牵连插件。",
  },
  {
    title: "可验证",
    en: "VERIFIED",
    detail: "全量反应堆 3,819 个自动化测试（0 失败），以及在 JDK 8 / 11 / 17 / 21 上的真实挂载验证。",
  },
];

export interface CoverageRow {
  label: string;
  value: string;
  note: string;
}

/** Evidence of coverage, not the headline. Rendered as a spec table. */
export const coverageRows: CoverageRow[] = [
  { label: "现成能力插件", value: "126", note: "每个能力一个 jar，系统里没有的库不会加载" },
  { label: "可选运行时模块", value: "14", note: "配置对应功能后才启用" },
  { label: "可插入的位置", value: "6", note: "方法 / 构造方法 / 字段 / 异常 / 静态块 / 接口引入" },
  { label: "支持的系统", value: "Java 8–21", note: "同一份程序，向上兼容" },
  { label: "自动化测试", value: "3,819", note: "1.0.0 质量门禁全量通过，0 失败" },
  { label: "每次判断的耗时", value: "≈1.2 ns", note: "基准值，跑在业务热路径上" },
];

export interface FitRow {
  key: string;
  label: string;
  text: string;
  tone: "clay" | "olive";
}

/** "Is this for me?" — the two answers that save readers from a wrong adoption. */
export const fits: FitRow[] = [
  {
    key: "yes",
    label: "适合你，如果",
    tone: "olive",
    text: "你要做自己的监控、安全或审计产品，得稳稳地插进别人的系统，又不想从零写一套字节码引擎。",
  },
  {
    key: "no",
    label: "不适合，如果",
    tone: "clay",
    text: "你只想买一个开箱即用的 APM 平台。这种需求用现成产品更划算——界面、存储和规则库，底座本来就不提供。",
  },
];

/** Hero panel: what the JVM prints when the base starts. */
export const bootLines: { key: string; value: string }[] = [
  { key: "contract", value: "weaver-girl-api" },
  { key: "weaving", value: "WeaverTransformer / ByteBuddy Advice" },
  { key: "export", value: "json-events · prometheus · otlp" },
  // Verbatim from the shipped agent: 140 capability jars are discovered, and the ones whose
  // target library is not on the classpath stay inactive instead of weaving nothing.
  { key: "plugins", value: "140 jars discovered · 134 inactive (库不在场)" },
  { key: "isolation", value: "child-first · fail-open" },
  { key: "product", value: "your APM / IAST / RASP plugin" },
];

export const pluginSkeleton = `public final class PaymentPlugin extends AbstractPlugin {

    @Override
    public String name() {
        return "payment-audit";
    }

    @Override
    public void registerInterceptors(InterceptorRegistry registry) {
        registry.register(
            intercept("com.example.PaymentService")
                .method("charge")
                .before(inv -> MetricRegistry.record("pay.charge", 1))
                .build());

        registry.register(
            interceptField("com.example.Payment", "cardNumber")
                .onGet((inv, value) -> inv.setReturnValue("***"))
                .build());
    }
}`;

/* -------------------------------------------------------------------------
 * Contact. The maintainer's WeChat QR lives in public/wechat-qr.png; the id is
 * spelled out too, because a desktop visitor cannot scan a screen with the
 * phone it is shown on.
 * ---------------------------------------------------------------------- */

export interface ContactPoint {
  title: string;
  text: string;
}

export const contactPoints: ContactPoint[] = [
  {
    title: "定制插件",
    text: "126 个内置插件没覆盖的框架、中间件或内部组件，按你们的调用链路补一个即可，业务代码照样不用动。",
  },
  {
    title: "产品落地",
    text: "要在底座上做 APM、IAST 或 RASP，从插件拆分、数据导出到上线路径，可以先聊清楚边界再开工。",
  },
  {
    title: "现场排障",
    text: "挂载失败、拦截不生效、上线后性能回归，把现象和版本发过来，一起定位。",
  },
];

export const WECHAT_ID = "CC11001100-weixin";

/* -------------------------------------------------------------------------
 * Performance ledger. Numbers come from docs/benchmarks/baseline-v1.md, which
 * is captured in-process (forks=0) — honest for regression comparison, not a
 * cross-machine absolute promise. Keep the caveat next to the numbers.
 * ---------------------------------------------------------------------- */

export interface BenchmarkRow {
  key: string;
  label: string;
  en: string;
  value: number;
  note: string;
}

export const benchmarkRows: BenchmarkRow[] = [
  {
    key: "matcher",
    label: "精确类 / 方法匹配",
    en: "classMatcher_exactMatch",
    value: 1.18,
    note: "类名或方法名完全相等时的一次判断",
  },
  {
    key: "sampling",
    label: "采样判断",
    en: "sampling_shouldSample_rate1",
    value: 2.74,
    note: "每次调用前的采样决策，采样率 1",
  },
  {
    key: "breaker",
    label: "熔断状态检查",
    en: "circuitBreaker_shouldInvoke_fresh",
    value: 25.03,
    note: "进入拦截器前的熔断状态判断",
  },
  {
    key: "pointcut",
    label: "拦截位置匹配 + 注册表查找",
    en: "pointcutMatching_hit",
    value: 74.24,
    note: "命中后取出对应的拦截器链",
  },
  {
    key: "pattern",
    label: "通配符类名匹配",
    en: "classMatcher_patternMatch",
    value: 133.75,
    note: "带通配符的类名匹配，最慢的一档",
  },
];

export const benchmarkEnv = "JMH 1.37 · OpenJDK 17.0.19 · Ryzen 9 5950X · 16 核 / 32 线程 · forks=0（进程内）";

export const benchmarkCaveat =
  "这组数字来自仓库的 docs/benchmarks/baseline-v1.md：进程内（forks=0）、测量时机器有负载，同一场景重复跑会上下浮动 20%–30%。适合拿来对比同机同版本的回归，不适合当作跨机器的绝对值。";

export interface OverheadStep {
  key: string;
  label: string;
  value: string;
  unit: string;
  note: string;
}

/** README: turning every optional observation off takes a matched call from ~335 ns to ~88 ns. */
export const overheadSteps: OverheadStep[] = [
  {
    key: "full",
    label: "全部遥测开启",
    value: "335",
    unit: "ns / 次",
    note: "打开 telemetry · returnSnapshot · mdc · pluginMetrics · circuitBreaker（默认）",
  },
  {
    key: "lean",
    label: "关掉观测，只留拦截",
    value: "88",
    unit: "ns / 次",
    note: "开关可写在 agent 参数、YAML、-Dweavergirl.<name>.enabled，运行期也能改",
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "它会让现有系统变慢吗？",
    a: "热路径上的判断是纳秒级的：精确匹配约 1.2 ns，熔断检查约 25 ns。真正花多少，取决于插件在回调里做什么。把 telemetry、returnSnapshot、mdc、pluginMetrics、circuitBreaker 全部关掉后，一次被匹配的调用从约 335 ns 降到约 88 ns，拦截本身一点没少。",
  },
  {
    q: "需要改业务代码吗？",
    a: "不需要。启动命令加一个 -javaagent，旁边放好 plugins/ 目录即可。业务代码不 import 任何插件，也不用预留接口——仓库里的三个演示程序就是这么跑的。",
  },
  {
    q: "插件写错了会不会拖垮业务？",
    a: "底座按失败开放处理：单个类织入失败，原方法照常运行；插件走 child-first 类加载隔离，同名依赖互不覆盖。同一个拦截器反复出错，熔断器会在一段冷却期内跳过它（打开状态），冷却后自动再试；系统压力上来，自适应采样自动调低采样率。被跳过的只是那一个拦截器，业务方法和其它插件不受影响。",
  },
  {
    q: "升级 Java 或框架版本怎么办？",
    a: "主代码以 --release 8 编译，只用 JDK 8 API，所以 Java 8 及以上都能跑；发布前在 JDK 8、11、17、21 上做过真实 attach 冒烟。插件按目标库的类名和签名匹配，目标库不在场就根本不加载。",
  },
  {
    q: "还要额外部署什么中间件吗？",
    a: "不用。插件跟着 plugins/ 目录走；指标、健康检查、OTLP 导出都是可选的运行时 jar，配了对应端口才启用，不用的直接从发行包里删掉即可。",
  },
  {
    q: "它和 SkyWalking、OpenTelemetry Agent 是什么关系？",
    a: "同一类技术底座，定位不同。它们更接近开箱即用的成品 APM；weaver-girl 只负责把逻辑插进运行中的程序、提供上下文、把数据送出去、并做隔离，让你在上面做自己的 APM、IAST、RASP 或审计产品。逐项对照表在《产品定位》文档里。",
  },
  {
    q: "许可证是什么？可以商用吗？",
    a: "MIT。1.0.0 已发布在 GitHub Release，代码、插件和文档同一个版本；Maven Central 还没上线，依赖目前从 JitPack 解析。",
  },
];

/* -------------------------------------------------------------------------
 * Quick start: preflight, verification and the failures people actually hit.
 * The curl shapes match the runtime plugins' real responses (README.md §Usage).
 * ---------------------------------------------------------------------- */

export interface Prerequisite {
  key: string;
  label: string;
  detail: string;
}

export const prerequisites: Prerequisite[] = [
  {
    key: "jdk",
    label: "Java 8 或更高",
    detail: "主代码以 --release 8 编译；JDK 8、11、17、21 上都做过真实 attach 冒烟。",
  },
  {
    key: "build",
    label: "Maven 3.9+（从源码构建时）",
    detail: "构建与质量门禁在 JDK 17 上跑；直接用发行包则不需要 Maven。",
  },
  {
    key: "layout",
    label: "agent 与 plugins/ 放在一起",
    detail: "agent jar 本身不含插件实现。只拷 jar，程序能启动，但不会拦截任何东西。",
  },
  {
    key: "config",
    label: "可选：一个 weaver.yml",
    detail: "不写配置也能启动：plugins/ 里的内置插件全部加载、用各自默认值。只有要开指标端口、改阈值或关闭某个插件时才需要它。",
  },
];

export interface VerifyCheck {
  key: string;
  label: string;
  command: string;
  expect: string;
  note: string;
}

export const verifyChecks: VerifyCheck[] = [
  {
    key: "health",
    label: "存活探针",
    command: "curl -s localhost:9401/health",
    expect: '{"status":"UP","agent":"weaver-girl",…}',
    note: "healthPort 配置后才会启动；返回 UP 说明 agent 已经挂进进程。",
  },
  {
    key: "ready",
    label: "就绪探针",
    command: "curl -s localhost:9401/ready",
    expect: '{"status":"READY","interceptorCount":…}',
    note: "interceptorCount 大于 0，说明插件已经登记了拦截位置。",
  },
  {
    key: "metrics",
    label: "指标端点",
    command: "curl -s localhost:9400/metrics | head",
    expect: "weavergirl_… 文本格式指标",
    note: "metricsPort 配置后可用；Prometheus 直接抓这个地址。",
  },
  {
    key: "stats",
    label: "自诊断",
    command: "curl -s localhost:9402/stats",
    expect: "拦截次数、错误数、热点的 JSON",
    note: "diagnostics 运行时能力启用后，用 diagnosticsPort 指定端口。",
  },
];

export interface Troubleshoot {
  key: string;
  symptom: string;
  cause: string;
  fix: string;
}

export const troubleshoots: Troubleshoot[] = [
  {
    key: "nothing",
    symptom: "启动正常，但什么也没拦到",
    cause: "agent jar 旁边没有 plugins/ 目录，或者插件 jar 被单独拷走。",
    fix: "使用 release 的 dist.zip，或把构建产物 target/plugins/ 整个目录放到 agent jar 旁边。",
  },
  {
    key: "port",
    symptom: "/metrics 或 /health 连不上",
    cause: "对应的运行时能力只配了 jar，没有配端口；或者端口被占用。",
    fix: "在 agent 参数或 weaver.yml 里写 metricsPort / healthPort，再确认端口空闲。",
  },
  {
    key: "silent",
    symptom: "插件日志里出现织入失败",
    cause: "目标库版本与插件匹配的类名或签名不同，或与业务 classpath 上的同名库冲突。",
    fix: "先看失败开放是否保住了原方法；再用 disabledPlugins 单独关掉该插件定位，类冲突交给 child-first 隔离。",
  },
  {
    key: "slow",
    symptom: "开 agent 后吞吐下降",
    cause: "插件在回调里做了重活，或者遥测开关全部打开。",
    fix: "按 README 关闭 telemetry / returnSnapshot / mdc / pluginMetrics / circuitBreaker，或调高采样阈值。",
  },
];

/* -------------------------------------------------------------------------
 * Architecture: the class-loading boundary, drawn as a stack.
 * ---------------------------------------------------------------------- */

export interface IsolationLayer {
  key: string;
  label: string;
  owns: string;
  detail: string;
  tone: "clay" | "olive" | "slate";
}

export const isolationLayers: IsolationLayer[] = [
  {
    key: "bootstrap",
    label: "Bootstrap ClassLoader",
    owns: "java.* / javax.* / JDK 运行时",
    detail: "JDK 自带的类。agent 通过注入 bootstrap 的桥接类，才能让内联的 Advice 回连注册表。",
    tone: "slate",
  },
  {
    key: "agent",
    label: "AgentClassLoader",
    owns: "ByteBuddy · 插件 · 运行时能力",
    detail: "child-first：自己的 ByteBuddy 与插件优先从自己加载，只有确实不存在的类才交给 parent。",
    tone: "clay",
  },
  {
    key: "app",
    label: "App ClassLoader",
    owns: "业务代码 · 框架 · 业务依赖",
    detail: "业务自己的世界。插件通过公开的 weaver-girl-api 与底座通信，不把实现类泄漏进来。",
    tone: "olive",
  },
];
