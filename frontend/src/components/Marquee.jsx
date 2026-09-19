import { MARQUEE_ITEMS } from "../data/content";

const Row = () => (
  <div className="flex shrink-0 items-center">
    {MARQUEE_ITEMS.map((item, i) => (
      <span key={i} className="flex items-center">
        <span className="marquee-text font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight px-6 sm:px-10">
          {item}
        </span>
        <span className="h-2 w-2 rotate-45 bg-primary/60" />
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <div
    data-testid="editorial-marquee"
    className="relative overflow-hidden border-y border-border bg-secondary/40 py-8 sm:py-10 select-none"
  >
    <div className="flex w-max animate-marquee">
      <Row />
      <Row />
    </div>
  </div>
);
