import { Phone } from "lucide-react";
import { CONTACT } from "../data/content";

export const MobileCallBar = () => (
  <div
    data-testid="mobile-call-bar"
    className="fixed bottom-0 inset-x-0 z-50 md:hidden glass bg-background/85 border-t border-border px-4 py-3"
  >
    <a
      href={CONTACT.phoneHref}
      data-testid="mobile-call-button"
      className="flex items-center justify-center gap-2.5 h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide"
    >
      <Phone size={17} className="animate-pulse-soft" />
      Call Now — {CONTACT.phoneDisplay}
    </a>
  </div>
);
