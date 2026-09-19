import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Send, Loader2, CheckCircle2 } from "lucide-react";
import { MaskedLines } from "../components/MaskedLines";
import { Reveal } from "../components/Reveal";
import { CONTACT, SERVICE_OPTIONS } from "../data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INITIAL = { full_name: "", email: "", phone: "", service: "", message: "", website: "" };

const Consultation = () => {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.title = "Request a Consultation | Cleverhouse Philippines";
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/inquiries`, form);
      setDone(true);
      setForm(INITIAL);
      toast.success("Consultation request received. We'll call you within one business day.");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Something went wrong. Please call us instead.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full h-13 px-5 py-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-300 text-base";

  return (
    <main data-testid="consultation-page" className="pt-28 sm:pt-36">
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-24 sm:pb-32">
        <div className="grid gap-14 lg:grid-cols-2 items-start">
          <div>
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary">
              Consultation request
            </p>
            <MaskedLines
              lines={["Tell us what", "you're building."]}
              delay={0.15}
              className="mt-6"
              lineClassName="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance"
            />
            <Reveal delay={0.5}>
              <p className="mt-8 max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground">
                Three required fields, no commitment. We'll review your request and call you back within one business
                day to schedule a site survey.
              </p>
              <div className="mt-10 rounded-2xl border border-border bg-secondary/30 p-7">
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-muted-foreground">Rather talk now?</p>
                <a
                  href={CONTACT.phoneHref}
                  data-testid="consultation-call-link"
                  className="mt-3 flex items-center gap-3 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-primary hover:opacity-80 transition-opacity"
                >
                  <Phone size={22} /> {CONTACT.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <div className="relative rounded-2xl border border-border bg-card p-7 sm:p-10 overflow-hidden">
              <div className="absolute inset-0 glow-spot pointer-events-none" />
              {done ? (
                <div className="relative py-14 text-center" data-testid="consultation-success">
                  <CheckCircle2 size={48} className="mx-auto text-primary" />
                  <h2 className="mt-6 font-display text-2xl sm:text-3xl font-bold tracking-tight">Request received.</h2>
                  <p className="mx-auto mt-4 max-w-sm text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Thank you — a confirmation is on its way to your inbox, and we'll call you within one business day.
                  </p>
                  <button
                    onClick={() => setDone(false)}
                    data-testid="consultation-another-button"
                    className="mt-8 text-sm font-semibold text-primary hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="relative space-y-5" data-testid="consultation-form">
                  <div>
                    <label htmlFor="full_name" className="mb-2 block font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                      Full name *
                    </label>
                    <input
                      id="full_name"
                      data-testid="consultation-name-input"
                      required
                      minLength={2}
                      value={form.full_name}
                      onChange={set("full_name")}
                      placeholder="Juan Dela Cruz"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                      Email address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      data-testid="consultation-email-input"
                      required
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                      Contact number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      data-testid="consultation-phone-input"
                      required
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+63 9XX XXX XXXX"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-2 block font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                      Service of interest
                    </label>
                    <select
                      id="service"
                      data-testid="consultation-service-select"
                      value={form.service}
                      onChange={set("service")}
                      className={inputCls}
                    >
                      <option value="">Select a service (optional)</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      data-testid="consultation-message-input"
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your property or project (optional)"
                      className="w-full px-5 py-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-300 text-base resize-none"
                    />
                  </div>
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={set("website")}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] opacity-0 h-0 w-0"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="consultation-submit-button"
                    className="w-full inline-flex items-center justify-center gap-2.5 h-14 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity duration-300"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={17} />}
                    {loading ? "Sending…" : "Send Consultation Request"}
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    No spam, no obligation. Your details stay with Cleverhouse Philippines.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Consultation;
