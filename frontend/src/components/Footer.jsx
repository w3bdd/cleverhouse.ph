import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { CONTACT, SERVICES } from "../data/content";

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-border bg-secondary/30 pb-28 md:pb-0">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center bg-primary clip-frame-sm">
              <span className="font-display text-primary-foreground font-extrabold text-lg leading-none">C</span>
            </span>
            <span className="leading-none">
              <span className="block font-display font-bold tracking-tight text-lg">CLEVERHOUSE</span>
              <span className="block font-mono text-[10px] tracking-[0.3em] text-muted-foreground">PHILIPPINES</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Smart living, security, energy, and electrical solutions — designed, installed, and supported locally in
            Aurora and across Region 3.
          </p>
          <p className="mt-5 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">
            Safety standards & warranty terms are confirmed in writing per project contract.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Services</p>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link
                  to="/services"
                  data-testid={`footer-service-${s.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Contact</p>
          <div className="mt-4 space-y-3">
            <a
              href={CONTACT.phoneHref}
              data-testid="footer-phone-link"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Phone size={15} className="text-primary" /> {CONTACT.phoneDisplay}
            </a>
            <a
              href={CONTACT.emailHref}
              data-testid="footer-email-link"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Mail size={15} className="text-primary" /> {CONTACT.email}
            </a>
            <p className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin size={15} className="text-primary" /> {CONTACT.address}
            </p>
          </div>
          <div className="mt-6 flex gap-6">
            <Link to="/about" data-testid="footer-link-about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/gallery" data-testid="footer-link-projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
            <Link to="/contact" data-testid="footer-link-contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <Link to="/consultation" data-testid="footer-link-consultation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Consultation</Link>
          </div>
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Cleverhouse Philippines. All rights reserved.</p>
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">Aurora — Central Luzon — PH</p>
      </div>
    </div>
  </footer>
);
