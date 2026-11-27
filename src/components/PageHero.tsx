import { SplitHeading, WeaveMesh } from "./Motion";

interface PageHeroProps {
  kicker: string;
  title: string;
  lede: string;
}

/** Heading block shared by every page except the home page. */
export function PageHero({ kicker, title, lede }: PageHeroProps) {
  return (
    <header className="page-hero">
      <WeaveMesh />
      <div className="page-hero-copy">
        <p className="kicker">{kicker}</p>
        <SplitHeading text={title} />
        <p className="dek">{lede}</p>
      </div>
    </header>
  );
}
