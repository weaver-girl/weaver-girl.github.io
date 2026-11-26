import { useMemo, useState } from "react";
import { Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CategoryMap } from "../components/CategoryMap";
import { PageHero } from "../components/PageHero";
import { PluginJar } from "../components/PluginJar";
import { Reveal } from "../components/Reveal";
import {
  allPlugins,
  pluginGroups,
  pluginHighlights,
  runtimeCapabilities,
  type PluginRow,
} from "../data/content";

const COLUMNS: ColumnsType<PluginRow> = [
  {
    title: "插件",
    dataIndex: "name",
    width: 150,
    render: (name: string) => <code className="plugin-code">{name}</code>,
  },
  { title: "拦截目标", dataIndex: "target", width: 220 },
  {
    title: "常用配置",
    dataIndex: "config",
    render: (config: string) => <span className="plugin-config">{config}</span>,
  },
];

export function PluginsPage() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string>("all");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const names = group === "all" ? allPlugins : (pluginGroups.find((g) => g.key === group)?.names ?? []);
    return keyword ? names.filter((name) => name.includes(keyword)) : names;
  }, [query, group]);

  const countFor = (key: string) => {
    const names = key === "all" ? allPlugins : (pluginGroups.find((g) => g.key === key)?.names ?? []);
    const keyword = query.trim().toLowerCase();
    return keyword ? names.filter((name) => name.includes(keyword)).length : names.length;
  };

  return (
    <>
      <PageHero
        kicker="WHAT CAN PLUG IN"
        title="126 块现成能力"
        lede="数据库、缓存、消息队列、HTTP 客户端、Web 框架……常见的 Java 组件都有现成插件。系统里用到哪个，才加载哪个；没用到的不占资源，也可以按名称随时关掉。"
      />

      <div className="page-body">
      <Reveal className="prose" variant="fade">
        126 个插件不是一份平均分布的清单：Web 框架最多，其次是数据库和 HTTP/RPC 客户端。
        先看版图，再决定从哪一类开始查。
      </Reveal>
      <CategoryMap />

      <Reveal as="h2" className="subhead">
        完整清单
      </Reveal>
      <div className="plugin-toolbar">
        <Input.Search
          allowClear
          placeholder="搜索插件名，例如 kafka、dubbo、jdbc"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          style={{ maxWidth: 380 }}
        />
        <span className="plugin-count">
          {filtered.length} / {allPlugins.length}
        </span>
      </div>
      <div className="plugin-filters" role="group" aria-label="按类别筛选插件">
        {[{ key: "all", label: "全部" }, ...pluginGroups].map((item) => (
          <button
            key={item.key}
            type="button"
            className={item.key === group ? "plugin-filter active" : "plugin-filter"}
            aria-pressed={item.key === group}
            onClick={() => setGroup(item.key)}
          >
            {item.label}
            <span>{countFor(item.key)}</span>
          </button>
        ))}
      </div>
      <div className="plugin-tag-grid">
        {filtered.map((name) => (
          <Tag key={name} className="plugin-tag">
            {name}
          </Tag>
        ))}
        {filtered.length === 0 && <p className="prose">没有匹配的插件，换个关键字试试。</p>}
      </div>

      <Reveal as="h2" className="subhead">
        常用插件与配置
      </Reveal>
      <Table
        rowKey="key"
        className="plugin-table"
        columns={COLUMNS}
        dataSource={pluginHighlights}
        pagination={false}
        size="middle"
        scroll={{ x: 640 }}
      />

      <Reveal as="h2" className="subhead">
        14 个可选运行时能力
      </Reveal>
      <Reveal className="prose" variant="fade">
        这些 jar 属于 agent 自身而不是业务插件，只有配置了对应键才会启用；发行包里不用的能力可以直接删掉。
      </Reveal>
      <div className="runtime-grid">
        {runtimeCapabilities.map((capability, index) => (
          <Reveal as="article" key={capability.key} className="runtime-card" delay={index * 45}>
            <code>{capability.name}</code>
            <p>{capability.description}</p>
          </Reveal>
        ))}
      </div>

      <Reveal as="h2" className="subhead">
        自带插件之外
      </Reveal>
      <Reveal className="plugin-jar-visual" variant="fade">
        <PluginJar />
      </Reveal>
      </div>
    </>
  );
}
