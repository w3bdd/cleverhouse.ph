import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { MaskedLines } from "../components/MaskedLines";
import { Reveal } from "../components/Reveal";
import { CONTACT, MUNICIPALITIES } from "../data/content";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | Cleverhouse Philippines";
  }, []);

  return (
    <main data-testid="contact-page" className="pt-28 sm:pt-36">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">Contact</p>
        <MaskedLines
          lines={["One call.", "Straight answers."]}
          delay={0.15}
          className="mt-6"
          lineClassName="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance"
        />
        <Reveal delay={0.5}>
          <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            The fastest way to reach us is the phone. You'll talk to the people who actually do the work — not a call
            center.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <a
              href={CONTACT.phoneHref}
              data-testid="contact-call-card"
              className="group relative block overflow-hidden rounded-2xl border border-primary/40 bg-primary/5 p-8 sm:p-12 hover:bg-primary/10 transition-colors duration-300 h-full"
            >
              <div className="absolute inset-0 glow-spot-br" />
              <div className="relative">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Phone size={24} />
                </span>
                <p className="mt-7 font-mono text-[10px] tracking-[0.35em] uppercase text-primary">Call us directly</p>
                <p className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight group-hover:text-primary transition-colors duration-300">
                  {CONTACT.phoneDisplay}
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={14} className="text-primary" />
                  Daily — we respond within one business day
                </p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-2">
            <div className="flex flex-col gap-6 h-full">
              <a
                href={CONTACT.emailHref}
                data-testid="contact-email-card"
                className="group flex-1 rounded-2xl border border-border p-8 hover:border-primary/50 hover:bg-secondary/40 transition-all duration-300"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 text-primary">
                  <Mail size={20} />
                </span>
                <p className="mt-5 font-mono text-[10px] tracking-[0.35em] uppercase text-muted-foreground">Email</p>
                <p className="mt-2 font-display text-lg sm:text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300 break-all">
                  {CONTACT.email}
                </p>
              </a>
              <div className="flex-1 rounded-2xl border border-border p-8" data-testid="contact-region-card">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 text-primary">
                  <MapPin size={20} />
                </span>
                <p className="mt-5 font-mono text-[10px] tracking-[0.35em] uppercase text-muted-foreground">Service area</p>
                <p className="mt-2 font-display text-lg sm:text-xl font-bold tracking-tight">{CONTACT.region}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2" data-testid="contact-municipalities">
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
          <div className="mt-16 rounded-2xl border border-border bg-secondary/30 p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">Prefer to write it down?</h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Three fields, under a minute. We'll call you back within one business day.
              </p>
            </div>
            <Link
              to="/consultation"
              data-testid="contact-consultation-cta"
              className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity duration-300"
            >
              Request a Consultation <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default Contact;
