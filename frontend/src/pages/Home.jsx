import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, MapPin, ArrowDown } from "lucide-react";
import { MaskedLines } from "../components/MaskedLines";
import { Reveal } from "../components/Reveal";
import { Marquee } from "../components/Marquee";
import { HeroSphere } from "../components/HeroSphere";
import { useTheme } from "../context/ThemeContext";
import { SERVICES, PROCESS, WHY_US, MUNICIPALITIES, GALLERY, CONTACT } from "../data/content";

const Home = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Cleverhouse Philippines | Smart Home, CCTV, Solar & Electrical — Aurora & Region 3";
  }, []);

  return (
    <main data-testid="home-page">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden glow-spot">
        <div className="absolute inset-y-0 right-0 w-full md:w-[62%] opacity-70 md:opacity-100 pointer-events-none">
          <HeroSphere color={theme === "dark" ? "#38BDF8" : "#0284C7"} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent md:via-background/60" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 w-full pt-28 pb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary"
            data-testid="hero-eyebrow"
          >
            Cleverhouse Philippines — Aurora · Region 3
          </motion.p>

          <MaskedLines
            lines={["Smart living.", "Secured.", "Powered."]}
            delay={0.3}
            className="mt-6"
            lineClassName="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.02] text-balance"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
            data-testid="hero-subtext"
          >
            Empowering smart living through innovative solutions — smart home, security, solar, gate automation,
            and electrical engineering, designed for the coasts of Aurora and the heart of Central Luzon.
            Installed properly. Supported locally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/consultation"
              data-testid="hero-consultation-cta"
              className="inline-flex items-center gap-2 h-13 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base hover:opacity-90 transition-opacity duration-300"
            >
              Request a Consultation
              <ArrowUpRight size={18} />
            </Link>
            <a
              href={CONTACT.phoneHref}
              data-testid="hero-call-cta"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-border text-sm sm:text-base font-medium hover:border-primary/60 hover:text-primary transition-colors duration-300"
            >
              <Phone size={17} />
              {CONTACT.phoneDisplay}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-14 flex flex-wrap gap-2"
            data-testid="hero-region-chips"
          >
            {MUNICIPALITIES.slice(0, 5).map((m) => (
              <span key={m} className="px-3.5 py-1.5 rounded-full border border-border/80 font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                {m}
              </span>
            ))}
            <span className="px-3.5 py-1.5 rounded-full border border-primary/40 font-mono text-[10px] tracking-[0.18em] uppercase text-primary">
              + Region 3
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase">Scroll</span>
          <ArrowDown size={14} className="animate-pulse-soft" />
        </motion.div>
      </section>

      <Marquee />

      {/* SERVICES INDEX */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32" data-testid="home-services-section">
        <Reveal>
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">What we do</p>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl text-balance">
            Six disciplines. One cohesive system.
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-border">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <Link
                to="/services"
                data-testid={`home-service-row-${s.id}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border hover:bg-secondary/40 transition-colors duration-300 px-2 sm:px-4"
              >
                <span className="font-mono text-xs sm:text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  {s.num}
                </span>
                <span>
                  <span className="block font-display text-xl sm:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                    {s.title}
                  </span>
                  <span className="mt-1.5 hidden sm:block text-sm text-muted-foreground max-w-xl">{s.description}</span>
                </span>
                <ArrowUpRight
                  size={22}
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COVERAGE */}
      <section className="relative border-y border-border bg-secondary/30 overflow-hidden" data-testid="home-coverage-section">
        <div className="absolute inset-0 glow-spot-br" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32 grid gap-14 lg:grid-cols-2 items-center">
          <Reveal>
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">Where we work</p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
              Aurora-born. Region 3-ready.
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-lg">
              We are based in Aurora — not flying in from Manila. That means faster site visits, honest assessments of
              coastal conditions, and support that shows up when it matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {MUNICIPALITIES.map((m) => (
                <span
                  key={m}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground"
                >
                  <MapPin size={11} className="text-primary" />
                  {m}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="clip-frame relative">
              <img
                src={GALLERY[4].image}
                alt="Modern home exterior at dusk in Aurora"
                className="w-full h-[320px] sm:h-[440px] object-cover"
                loading="lazy"
                data-testid="coverage-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32" data-testid="home-process-section">
        <Reveal>
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">How it works</p>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
            A process with no surprises.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <div
                data-testid={`process-step-${p.step}`}
                className="group h-full border border-border rounded-2xl p-7 hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300"
              >
                <span className="font-mono text-sm text-primary">{p.step}</span>
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="border-y border-border bg-secondary/30" data-testid="home-why-section">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
          <Reveal>
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">Why Cleverhouse</p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl text-balance">
              A startup that earns trust the slow way.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.07}>
                <div className="border-l-2 border-primary/40 pl-6">
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">{w.title}</h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32" data-testid="home-gallery-teaser">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">Selected work</p>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
                Proof, in progress.
              </h2>
            </div>
            <Link
              to="/gallery"
              data-testid="home-gallery-link"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
            >
              View the gallery <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {GALLERY.slice(0, 3).map((g, i) => (
            <Reveal key={g.id} delay={i * 0.1}>
              <Link to="/gallery" className="group block clip-frame relative overflow-hidden" data-testid={`home-gallery-tile-${g.id}`}>
                <img
                  src={g.image}
                  alt={g.label}
                  loading="lazy"
                  className="h-64 sm:h-80 w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.2em] uppercase text-white/90">
                  {g.label}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative overflow-hidden border-t border-border" data-testid="home-cta-band">
        <div className="absolute inset-0 glow-spot" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32 text-center">
          <Reveal>
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">Start here</p>
            <h2 className="mt-5 font-display text-3xl sm:text-6xl font-extrabold tracking-tight text-balance">
              Talk to a real technician.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Tell us what you're building or securing. We'll survey the site, scope the work, and give it to you in
              writing.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/consultation"
                data-testid="cta-band-consultation"
                className="hidden sm:inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity duration-300"
              >
                Request a Consultation <ArrowUpRight size={18} />
              </Link>
              <a
                href={CONTACT.phoneHref}
                data-testid="cta-band-call"
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

export default Home;
