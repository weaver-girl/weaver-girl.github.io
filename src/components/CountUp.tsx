import { useEffect, useRef, useState } from "react";

const NUMBER = /^(.*?)(\d[\d,]*(?:\.\d+)?)(.*)$/;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface CountUpProps {
  /** May carry a prefix, a numeric core and a suffix: "≈1.2 ns", "3,671", "8–21". */
  value: string;
  duration?: number;
  className?: string;
}

/** Counts the first numeric run in `value` up from zero when it scrolls into view. */
export function CountUp({ value, duration = 1200, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    const match = NUMBER.exec(value);
    if (!node || !match || prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const [, prefix, raw, suffix] = match;
    const target = Number(raw.replace(/,/g, ""));
    if (!Number.isFinite(target)) {
      setDisplay(value);
      return;
    }
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const thousands = raw.includes(",");
    const format = (n: number) =>
      thousands ? Math.round(n).toLocaleString("en-US") : n.toFixed(decimals);
    let frame = 0;
    let start = 0;
    let started = false;

    const run = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`${prefix}${format(target * eased)}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(run);
    };

    const startAnimation = () => {
      if (started) return;
      started = true;
      frame = requestAnimationFrame(run);
    };

    if (typeof IntersectionObserver === "undefined") {
      startAnimation();
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
