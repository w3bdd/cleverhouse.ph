import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { MaskedLines } from "../components/MaskedLines";
import { Reveal } from "../components/Reveal";
import { GALLERY } from "../data/content";

const Gallery = () => {
  useEffect(() => {
    document.title = "Projects & Gallery | Cleverhouse Philippines";
  }, []);

  return (
    <main data-testid="gallery-page" className="pt-28 sm:pt-36">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">Projects & gallery</p>
        <MaskedLines
          lines={["Our record,", "being built."]}
          delay={0.15}
          className="mt-6"
          lineClassName="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance"
        />
        <Reveal delay={0.5}>
          <div className="mt-8 max-w-2xl">
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              We're an early-stage company, so this gallery currently uses clearly-labelled placeholder imagery. As real
              installations are completed across Aurora and Region 3, each tile below will be replaced with actual
              project photography — never borrowed, never staged elsewhere.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 0.08}>
              <figure
                data-testid={`gallery-tile-${g.id}`}
                className="group clip-frame relative overflow-hidden border border-border"
              >
                <img
                  src={g.image}
                  alt={g.label}
                  loading="lazy"
                  className="h-72 sm:h-80 w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block font-display text-lg font-bold text-white tracking-tight">{g.label}</span>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.18em] uppercase text-white/70">
                    <ImageIcon size={11} /> {g.note}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 glow-spot" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
              Your project could be the first photo here.
            </h2>
            <Link
              to="/consultation"
              data-testid="gallery-consultation-cta"
              className="mt-9 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity duration-300"
            >
              Request a Consultation <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Gallery;
