import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon, Phone, ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { CONTACT } from "../data/content";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="glass bg-background/70 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between">
          <Link to="/" data-testid="nav-logo" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <span className="relative flex h-9 w-9 items-center justify-center bg-primary clip-frame-sm">
              <span className="font-display text-primary-foreground font-extrabold text-lg leading-none">C</span>
            </span>
            <span className="leading-none">
              <span className="block font-display font-bold tracking-tight text-base sm:text-lg">CLEVERHOUSE</span>
              <span className="block font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-muted-foreground">PHILIPPINES</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              data-testid="theme-toggle-button"
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors duration-300"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              href={CONTACT.phoneHref}
              data-testid="nav-call-button"
              className="hidden lg:flex h-10 w-10 rounded-full border border-border items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors duration-300"
              aria-label="Call Cleverhouse Philippines"
            >
              <Phone size={17} />
            </a>
            <Link
              to="/consultation"
              data-testid="nav-consultation-cta"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity duration-300"
            >
              Request Consultation
              <ArrowUpRight size={15} />
            </Link>
            <button
              data-testid="mobile-menu-button"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="md:hidden h-10 w-10 rounded-full border border-border flex items-center justify-center"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            data-testid="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden glass bg-background/95 border-b border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-3 font-display text-2xl font-bold tracking-tight border-b border-border/50 ${
                      isActive ? "text-primary" : "text-foreground"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/consultation"
                data-testid="mobile-nav-consultation-cta"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-primary-foreground font-semibold"
              >
                Request Consultation
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
