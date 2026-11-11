# Weaver-Girl Website

The official website for [Weaver-Girl](https://github.com/weaver-girl/weaver-girl),
a modular Java bytecode instrumentation framework built on ByteBuddy.

The site is a static React + Vite application. Every push to `main` is built and
published to GitHub Pages by [`.github/workflows/pages.yml`](.github/workflows/pages.yml).

## Development

```bash
npm ci
npm run dev        # http://localhost:5173
npm run lint
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

Set `BASE_PATH` when building for a project site served from a subpath; the
deployment workflow derives it from the repository name automatically. Local
development uses `/`.

## Structure

| Path | Purpose |
| --- | --- |
| `src/pages/` | One component per route: home, quick start, cases, plugins, architecture, docs |
| `src/data/content.ts` | All copy, code samples and plugin catalogue rendered by the pages |
| `src/components/` | Shared layout and presentation components |
| `src/index.css` | Theme tokens and global styles |

`src/data/content.ts` is curated for the site. The canonical engineering
documentation (`docs/`) lives in the core repository and is the source of truth
for anything a page quotes.

## Related repositories

- [`weaver-girl/weaver-girl`](https://github.com/weaver-girl/weaver-girl) — agent,
  public API, built-in plugins, docs
- [`weaver-girl/weaver-girl-plugin-template`](https://github.com/weaver-girl/weaver-girl-plugin-template) — starter for third-party plugins

## License

[MIT](LICENSE)
