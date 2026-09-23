import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Check, ArrowUpRight, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { MaskedLines } from "../components/MaskedLines";
import { Reveal } from "../components/Reveal";
import { SERVICES, SERVICE_DETAILS, CONTACT } from "../data/content";

const ServiceDetail = () => {
  const { id } = useParams();
  const idx = SERVICES.findIndex((s) => s.id === id);
  const service = idx >= 0 ? SERVICES[idx] : null;

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Cleverhouse Philippines — Aurora & Region 3`;
    }
  }, [service]);

  if (!service) return <Navigate to="/services" replace />;

  const detail = SERVICE_DETAILS[id];
  const Icon = service.icon;
  const prev = SERVICES[(idx + SERVICES.length - 1) % SERVICES.length];
  const next = SERVICES[(idx + 1) % SERVICES.length];

  return (
    <main data-testid={`service-detail-${id}`} className="pt-28 sm:pt-36">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Link
            to="/services"
            data-testid="service-detail-back"
            className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft size={13} /> All services
          </Link>
        </Reveal>
        <p className="mt-8 font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">
          Service {service.num} — Aurora & Region 3
        </p>
        <MaskedLines
          lines={[service.title]}
          delay={0.1}
          className="mt-5"
          lineClassName="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance"
        />
        <Reveal delay={0.4}>
          <p className="mt-5 font-display text-xl sm:text-2xl font-medium text-muted-foreground tracking-tight">
            {detail.tagline}
          </p>
        </Reveal>
        <Reveal delay={0.55}>
          <div className="clip-frame relative overflow-hidden mt-10">
            <img
              src={service.image}
              alt={service.title}
              className="h-72 sm:h-[460px] w-full object-cover"
              data-testid="service-detail-image"
            />
            <span className="absolute top-4 left-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl glass bg-background/70 text-primary">
              <Icon size={22} />
            </span>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24 grid gap-12 lg:grid-cols-2 items-start">
        <Reveal>
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">Overview</p>
          {detail.overview.map((p, i) => (
            <p key={i} className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-border bg-secondary/30 p-7 sm:p-9" data-testid="service-detail-features">
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">What's included</p>
            <ul className="mt-6 space-y-4">
              {detail.features.map((f) => (
                <li key={f} className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check size={13} />
                  </span>
                  <span className="text-sm sm:text-base font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <div className="grid gap-4 sm:grid-cols-2" data-testid="service-detail-nav">
          <Link
            to={`/services/${prev.id}`}
            data-testid="service-detail-prev"
            className="group rounded-2xl border border-border p-6 hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <ArrowLeft size={12} /> Previous
            </span>
            <span className="mt-2 block font-display text-lg sm:text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
              {prev.title}
            </span>
          </Link>
          <Link
            to={`/services/${next.id}`}
            data-testid="service-detail-next"
            className="group rounded-2xl border border-border p-6 text-right hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300"
          >
            <span className="flex items-center justify-end gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Next <ArrowRight size={12} />
            </span>
            <span className="mt-2 block font-display text-lg sm:text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
              {next.title}
            </span>
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 glow-spot" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
              Let's scope your {service.title.toLowerCase()} project.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base sm:text-lg text-muted-foreground">
              Free consultation, written quote, no obligation.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/consultation"
                data-testid="service-detail-consultation-cta"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity duration-300"
              >
                Request a Consultation <ArrowUpRight size={18} />
              </Link>
              <a
                href={CONTACT.phoneHref}
                data-testid="service-detail-call-cta"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border font-semibold hover:border-primary/60 hover:text-primary transition-colors duration-300"
              >
                <Phone size={17} /> {CONTACT.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetail;
