import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MaskedLines } from "../components/MaskedLines";
import { Reveal } from "../components/Reveal";
import { CHAPTERS } from "../data/content";

const About = () => {
  useEffect(() => {
    document.title = "About Us | Cleverhouse Philippines";
  }, []);

  return (
    <main data-testid="about-page" className="pt-28 sm:pt-36">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">About us</p>
        <MaskedLines
          lines={["Technology, installed", "with a conscience."]}
          delay={0.15}
          className="mt-6"
          lineClassName="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance"
        />
        <Reveal delay={0.5}>
          <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            Cleverhouse Philippines started with a simple observation: homes and businesses in Aurora deserve the same
            calibre of smart technology and electrical workmanship as Metro Manila — without the wait, the markup, or
            the guesswork. We design, install, and support smart home, security, solar, automation, and electrical
            systems across Aurora and Region 3.
          </p>
        </Reveal>
      </section>

      {/* MISSION / VISION */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div data-testid="mission-card" className="h-full border border-border rounded-2xl p-8 sm:p-10 bg-secondary/30">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-primary">Mission</p>
              <p className="mt-5 font-display text-xl sm:text-2xl font-bold tracking-tight leading-snug">
                To make smart, secure, energy-efficient living practical for every home and business in Aurora and
                Region 3 — installed properly, supported locally.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div data-testid="vision-card" className="h-full border border-border rounded-2xl p-8 sm:p-10 bg-secondary/30">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-primary">Vision</p>
              <p className="mt-5 font-display text-xl sm:text-2xl font-bold tracking-tight leading-snug">
                A Region 3 where every building is safe, efficiently powered, and intelligently connected.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MANIFESTO CHAPTERS */}
      <section className="border-y border-border bg-secondary/30" data-testid="manifesto-section">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
          <Reveal>
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">What we stand by</p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
              Three chapters. No fine print.
            </h2>
          </Reveal>
          <div className="mt-16 space-y-16 sm:space-y-24">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.chapter} delay={0.05}>
                <div
                  data-testid={`manifesto-chapter-${c.chapter}`}
                  className={`grid gap-6 lg:grid-cols-12 items-start ${i % 2 === 1 ? "lg:text-right" : ""}`}
                >
                  <span
                    className={`lg:col-span-4 font-display text-7xl sm:text-8xl lg:text-9xl font-extrabold leading-none marquee-text ${
                      i % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    {c.chapter}
                  </span>
                  <div className={`lg:col-span-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">{c.title}</h3>
                    <p className="mt-2 font-mono text-xs sm:text-sm tracking-wide text-primary">{c.summary}</p>
                    <p className={`mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl ${i % 2 === 1 ? "lg:ml-auto" : ""}`}>
                      {c.content}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HONESTY NOTE */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">A note on proof</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
              We're early-stage — and we won't fake it.
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              You won't find invented certifications, borrowed project photos, or decade-old testimonials here. Safety
              standards, certifications, and warranty terms are confirmed in writing for every project contract. As our
              project record grows, this site will grow with it — honestly.
            </p>
            <Link
              to="/consultation"
              data-testid="about-consultation-cta"
              className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity duration-300"
            >
              Start a conversation <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default About;
