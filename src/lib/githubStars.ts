/**
 * The repository's star count: read live from GitHub's public API, cached in
 * IndexedDB, and served from the cache whenever the API is unreachable,
 * rate-limited or blocked. Nothing here may break the page: every storage and
 * network failure resolves to "no answer" and the badge keeps whatever it was
 * already showing.
 *
 * The cache carries the API's ETag, so the next visit is a conditional request.
 * GitHub does not count a 304 against the anonymous 60/hour quota, which is the
 * difference between a cached number and a blank badge on a busy IP.
 */

export const STARS_API = "https://api.github.com/repos/weaver-girl/weaver-girl";

/** A cached number younger than this is used without asking the network at all. */
export const STAR_CACHE_TTL = 30 * 60 * 1000;

const DB_NAME = "weaver-girl-site";
const DB_VERSION = 1;
const STORE = "repo";
const STAR_KEY = "stars";

export interface StarSnapshot {
  count: number;
  /** Epoch milliseconds of the last successful answer (fresh or 304). */
  savedAt: number;
  /** Strong ETag from the API, sent back as If-None-Match. */
  etag?: string;
}

/** `fresh` means the API just answered; `cached` means we are serving storage. */
export interface StarResult {
  count: number;
  savedAt: number;
  fresh: boolean;
}

function openDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  return new Promise((resolve) => {
    let request: IDBOpenDBRequest;
    try {
      request = indexedDB.open(DB_NAME, DB_VERSION);
    } catch {
      // Some privacy modes throw on open rather than erroring asynchronously.
      resolve(null);
      return;
    }
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
    request.onblocked = () => resolve(null);
  });
}

export async function readStarSnapshot(): Promise<StarSnapshot | null> {
  const db = await openDb();
  if (!db) return null;
  try {
    return await new Promise<StarSnapshot | null>((resolve) => {
      const tx = db.transaction(STORE, "readonly");
      const request = tx.objectStore(STORE).get(STAR_KEY);
      request.onsuccess = () => {
        const value = request.result as StarSnapshot | undefined;
        resolve(
          value && Number.isFinite(value.count) && Number.isFinite(value.savedAt) ? value : null,
        );
      };
      request.onerror = () => resolve(null);
      tx.onabort = () => resolve(null);
    });
  } catch {
    return null;
  } finally {
    db.close();
  }
}

export async function writeStarSnapshot(snapshot: StarSnapshot): Promise<void> {
  const db = await openDb();
  if (!db) return;
  try {
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(snapshot, STAR_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    });
  } catch {
    // A full or read-only store only costs us the next visit's head start.
  } finally {
    db.close();
  }
}

type FetchOutcome =
  | { kind: "count"; count: number; etag?: string }
  | { kind: "not-modified"; etag?: string }
  | { kind: "miss" };

async function fetchStars(etag?: string, signal?: AbortSignal): Promise<FetchOutcome> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (etag) headers["If-None-Match"] = etag;

    const response = await fetch(STARS_API, { headers, signal });
    if (response.status === 304) {
      return { kind: "not-modified", etag: response.headers.get("ETag") ?? etag };
    }
    if (!response.ok) return { kind: "miss" };

    const body: unknown = await response.json();
    const stars = (body as { stargazers_count?: unknown }).stargazers_count;
    if (typeof stars !== "number" || !Number.isFinite(stars)) return { kind: "miss" };
    return { kind: "count", count: stars, etag: response.headers.get("ETag") ?? undefined };
  } catch {
    return { kind: "miss" };
  }
}

/**
 * Resolve the star count. Returns null only when there is neither a fresh answer
 * nor anything cached — the caller then shows no number at all.
 */
export async function resolveStars(): Promise<StarResult | null> {
  const cached = await readStarSnapshot();

  if (cached && Date.now() - cached.savedAt < STAR_CACHE_TTL) {
    return { count: cached.count, savedAt: cached.savedAt, fresh: false };
  }

  const outcome = await fetchStars(cached?.etag);

  if (outcome.kind === "count") {
    const savedAt = Date.now();
    void writeStarSnapshot({ count: outcome.count, savedAt, etag: outcome.etag });
    return { count: outcome.count, savedAt, fresh: true };
  }

  if (outcome.kind === "not-modified" && cached) {
    const savedAt = Date.now();
    void writeStarSnapshot({ count: cached.count, savedAt, etag: outcome.etag ?? cached.etag });
    return { count: cached.count, savedAt, fresh: true };
  }

  // Rate-limited, offline, blocked: the last known number is the answer.
  return cached ? { count: cached.count, savedAt: cached.savedAt, fresh: false } : null;
}

/** 999 → "999", 1,234 → "1.2k", 12,345 → "12k". */
export function formatStarCount(count: number): string {
  if (count < 1000) return String(count);
  const k = count / 1000;
  return k >= 10 ? `${Math.round(k)}k` : `${Math.round(k * 10) / 10}k`;
}
