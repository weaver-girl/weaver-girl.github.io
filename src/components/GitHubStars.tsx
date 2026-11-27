import { useEffect, useState, type CSSProperties } from "react";
import { REPO_URL } from "../data/content";
import { readStarSnapshot, resolveStars, formatStarCount, type StarSnapshot } from "../lib/githubStars";

/** One resolution per page load, shared by any component that asks. */
let inFlight: Promise<StarSnapshot | null> | null = null;

function loadStars() {
  if (!inFlight) {
    inFlight = resolveStars().then((result) =>
      result ? { count: result.count, savedAt: result.savedAt } : null,
    );
  }
  return inFlight;
}

/**
 * The GitHub link plus the repository's live star count. The number comes from
 * the API, is cached in IndexedDB for half an hour, and falls back to that cache
 * when the request fails — a visitor behind a blocked network or on a
 * rate-limited IP still sees the last number the site managed to read.
 *
 * The badge reserves its width before the number arrives, so the header never
 * reflows when the fetch lands; before the first answer it shows only the star.
 */
export function GitHubStars() {
  const [count, setCount] = useState<number | null>(null);
  const [fresh, setFresh] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Whatever the last visit stored shows up first, without waiting on the API.
    void readStarSnapshot().then((cached) => {
      if (!cancelled && cached) setCount(cached.count);
    });

    void loadStars().then((result) => {
      if (cancelled || !result) return;
      setCount(result.count);
      setFresh(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const label = count === null ? "在 GitHub 上查看" : `GitHub · ${count} 个 Star（点进去点个星）`;

  return (
    <a
      className="nav-github"
      href={REPO_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
    >
      <GithubMark />
      <span className="nav-github-text">GitHub</span>
      <span className={count === null ? "nav-stars pending" : "nav-stars"} aria-hidden="true">
        <StarMark />
        <b
          key={count ?? "none"}
          className={fresh ? "nav-stars-value pop" : "nav-stars-value"}
          style={{ "--star-width": `${Math.max(1, formatStarCount(count ?? 0).length)}ch` } as CSSProperties}
        >
          {count === null ? "" : formatStarCount(count)}
        </b>
      </span>
    </a>
  );
}

function StarMark() {
  return (
    <svg className="nav-star-mark" width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1.2l1.94 4.06 4.46.56-3.3 3.08.86 4.42L8 11.2l-3.96 2.12.86-4.42L1.6 5.82l4.46-.56L8 1.2z" />
    </svg>
  );
}

export function GithubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
