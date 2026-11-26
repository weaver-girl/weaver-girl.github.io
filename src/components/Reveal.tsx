import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealTag =
  | "a"
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "li"
  | "p"
  | "span"
  | "ol"
  | "ul"
  | "nav"
  | "details"
  | "h2"
  | "h3";

interface RevealProps {
  as?: RevealTag;
  className?: string;
  /** Milliseconds of delay, used to stagger rows and cards. */
  delay?: number;
  variant?: "up" | "fade" | "left" | "scale";
  children: ReactNode;
  style?: CSSProperties;
  id?: string;
  href?: string;
}

/**
 * Reveals its children when they enter the viewport. CSS does the transform and
 * respects prefers-reduced-motion; this only flips a class once.
 */
export function Reveal({
  as = "div",
  className,
  delay = 0,
  variant = "up",
  children,
  style,
  id,
  href,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as ElementType;
  const classes = ["reveal", `reveal-${variant}`, shown ? "is-visible" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  const merged = { ...style, "--reveal-delay": `${delay}ms` } as CSSProperties;

  return (
    <Tag
      id={id}
      href={href}
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={classes}
      style={merged}
    >
      {children}
    </Tag>
  );
}
