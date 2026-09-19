import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MaskedLines } from "../components/MaskedLines";
import { Reveal } from "../components/Reveal";
import { SERVICES } from "../data/content";

const Services = () => {
  useEffect(() => {
    document.title = "Services | Cleverhouse Philippines";
  }, []);

  return (
    <main data-testid="services-page" className="pt-28 sm:pt-36">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">Services</p>
        <MaskedLines
          lines={["Everything a modern", "property needs."]}
          delay={0.15}
          className="mt-6"
          lineClassName="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance"
        />
        <Reveal delay={0.5}>
          <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            Security, sound, power, automation, and the wiring beneath it all — delivered as one coordinated system for
            homes, businesses, and developments across Aurora and Region 3.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28 space-y-20 sm:space-y-28">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          const flip = i % 2 === 1;
          return (
            <Reveal key={s.id}>
              <div
                data-testid={`service-block-${s.id}`}
                className={`grid gap-8 lg:grid-cols-2 items-center`}
              >
                <div className={`clip-frame relative overflow-hidden ${flip ? "lg:order-2" : ""}`}>
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-64 sm:h-96 w-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1.5 glass bg-background/70 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase">
                    {s.num}
                  </span>
                </div>
                <div className={flip ? "lg:order-1" : ""}>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 text-primary">
                    <Icon size={22} />
                  </span>
                  <h2 className="mt-5 font-display text-2xl sm:text-4xl font-bold tracking-tight">{s.title}</h2>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
                    {s.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3.5 py-1.5 rounded-full border border-border font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      <section className="relative overflow-hidden border-t border-border" data-testid="services-cta">
        <div className="absolute inset-0 glow-spot" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
              Not sure which system fits?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base sm:text-lg text-muted-foreground">
              That's what the consultation is for. We survey, we scope, we put it in writing.
            </p>
            <Link
              to="/consultation"
              data-testid="services-consultation-cta"
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

export default Services;
