import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "../data/content";

interface RouteMeta {
  title: string;
  description: string;
}

/** One-line description per route, reused for <meta> and the share card. */
const META: Record<string, RouteMeta> = {
  "/": {
    title: "Weaver-Girl — 不用改代码，给 Java 系统加能力",
    description:
      "JVM 切面底座：把监控、安全、审计这类能力做成插件，放进目录就生效，业务代码一行不改。",
  },
  "/architecture": {
    title: "架构 · Weaver-Girl",
    description: "底座怎么发现插件、隔离类加载、把逻辑织进运行中的程序，以及它在哪一层停下。",
  },
  "/plugins": {
    title: "126 块现成能力 · Weaver-Girl",
    description: "数据库、缓存、消息队列、Web 框架、RPC 与通用能力，共 126 个插件，用到哪个才加载哪个。",
  },
  "/cases": {
    title: "验证 · Weaver-Girl",
    description: "三个可运行的真实案例：同一段业务代码，装与不装底座跑两遍，差别由程序自己断言。",
  },
  "/quick-start": {
    title: "构建与挂载 · Weaver-Girl",
    description: "源码构建、发行包与容器三种接入方式，三步把底座挂到你的 Java 程序上。",
  },
  "/docs": {
    title: "文档与契约 · Weaver-Girl",
    description: "定位、架构、插件开发、配置参考与性能基线，文档和代码同一个版本。",
  },
};

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/** Keeps title, description, canonical and Open Graph tags in sync with the route. */
export function RouteMeta() {
  const { pathname } = useLocation();
  const normalized = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const meta = META[normalized] ?? META["/"];
  const url = `${SITE_URL}${normalized === "/" ? "" : normalized.slice(1)}`;

  useEffect(() => {
    document.title = meta.title;
    setMeta('meta[name="description"]', "name", "description", meta.description);
    setMeta('meta[property="og:title"]', "property", "og:title", meta.title);
    setMeta('meta[property="og:description"]', "property", "og:description", meta.description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [meta, url]);

  return null;
}
