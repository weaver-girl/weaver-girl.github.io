import { useEffect, useRef, useState } from "react";

interface Stop {
  id: string;
  /** The section numeral, e.g. "07". */
  label: string;
  /** The section heading, shown in the tooltip. */
  heading: string;
  /** Where the section starts, as a fraction of the scrollable page. */
  at: number;
}

/**
 * A thin rail down the right edge listing every numbered section of the home
 * page. Each knot fills once that section has scrolled past, the current one
 * keeps its numeral beside it, and clicking jumps to the section. It reads the
 * DOM rather than a hardcoded list, so a new `section[id]` shows up on its own.
 *
 * Below 1280px it is hidden: on a phone the rail would sit on the copy, and the
 * sections are short enough to scroll anyway.
 */
export function SectionRail() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  /** How far down the rail the clay fill reaches, 0..1. */
  const [fill, setFill] = useState(0);
  const pending = useRef(false);
  const frame = useRef(0);

  useEffect(() => {
    const readSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("#main section[id]")).filter(
        (section) => section.querySelector(".ghost-index") !== null,
      );

    const measure = () => {
      const sections = readSections();
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setStops(
        sections.map((section) => ({
          id: section.id,
          label: section.querySelector<HTMLElement>(".ghost-index")?.textContent?.trim() ?? "",
          heading: section.querySelector("h2")?.textContent?.trim() ?? section.id,
          at: Math.min(1, Math.max(0, section.offsetTop / scrollable)),
        })),
      );
    };

    const onScroll = () => {
      if (pending.current) return;
      pending.current = true;
      frame.current = requestAnimationFrame(() => {
        pending.current = false;
        const marker = window.scrollY + window.innerHeight * 0.4;
        let current = 0;
        readSections().forEach((section, index) => {
          if (section.offsetTop <= marker) current = index;
        });
        setActive(current);
        const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        setFill(Math.min(1, Math.max(0, window.scrollY / scrollable)));
      });
    };

    // The document height settles after fonts and lazy routes; measure twice.
    measure();
    onScroll();
    const timer = window.setTimeout(measure, 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
      pending.current = false;
    };
  }, []);

  if (stops.length < 3) return null;

  return (
    <nav className="section-rail" aria-label="章节导航">
      <span className="section-rail-line" aria-hidden="true" />
      <span
        className="section-rail-fill"
        aria-hidden="true"
        style={{ transform: `scaleY(${fill})` }}
      />
      {stops.map((stop, index) => (
        <button
          key={stop.id}
          type="button"
          className={`section-rail-stop${index <= active ? " reached" : ""}${
            index === active ? " current" : ""
          }`}
          style={{ top: `${stop.at * 100}%` }}
          aria-label={`跳到 ${stop.heading}`}
          aria-current={index === active ? "true" : undefined}
          onMouseEnter={() => setHovered(stop.id)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(stop.id)}
          onBlur={() => setHovered(null)}
          onClick={() => document.getElementById(stop.id)?.scrollIntoView({ block: "start" })}
        >
          <span className="section-rail-dot" aria-hidden="true" />
          <span className="section-rail-label" aria-hidden="true">
            {stop.label}
          </span>
          {hovered === stop.id && (
            <span className="section-rail-tip" aria-hidden="true">
              {stop.heading}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}
