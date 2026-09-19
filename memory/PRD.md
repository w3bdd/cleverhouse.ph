# Cleverhouse Philippines — PRD

## Original Problem Statement
Credibility-first company website for Cleverhouse Philippines (smart living, security, energy, electrical solutions) serving Aurora and Region 3, Central Luzon. Goals in order: establish brand credibility, generate direct inquiries (call + consultation form), support quote capture later without competing CTAs. Stack: React + FastAPI + MongoDB. Honest startup-stage messaging — no fake certifications, testimonials, or warranty promises. Gallery uses clearly-labelled placeholders. Mobile-first with persistent click-to-call. Atmospheric light mode default + dark mode toggle. Basic SEO for Aurora/Region 3 intent.

## Architecture
- Frontend: React SPA (react-router 7), Tailwind + custom CSS vars (light/dark), framer-motion (masked line reveals, scroll reveals), Lenis smooth scrolling, react-three-fiber 3D node-sphere hero with mouse parallax, sonner toasts.
- Backend: FastAPI. POST /api/inquiries (validation, honeypot anti-spam, MongoDB storage, Resend-managed email via Emergent integration proxy: owner notification to contact.us@chphil.com + confirmation to submitter). GET /api/ and /api/health.
- DB: MongoDB `inquiries` collection (id, full_name, email, phone, service, message, type, created_at).

## User Personas
- Homeowners (smart home, security, solar, gates, audio, wiring)
- Commercial property owners (surveillance, audio, electrical, access automation)
- Contractors seeking installation partners
- Developers exploring technical service providers
- Government (lower priority)

## Core Requirements (static)
- One dominant CTA per section; call wins on mobile, consultation on desktop/lower scroll
- Quote request secondary/deferred
- Honest provisional trust copy, placeholders labelled
- Sticky mobile click-to-call bar
- Light default + dark toggle

## Implemented (2026-07-19)
- 6 pages: Home (kinetic 3D hero, marquee, services index, coverage, process, why-us, gallery teaser, CTA band), About (mission/vision, 3 numbered manifesto chapters, honesty note), Services (6 alternating blocks with clipped-frame imagery), Gallery (6 labelled placeholders), Contact (big click-to-call card, email, service area), Consultation (form: name/email/phone + optional service/message, honeypot)
- Sticky mobile call bar (+63 965 093 3555), navbar with theme toggle, footer with provisional standards note
- SEO meta in index.html (Aurora/Region 3 keywords, OG tags), per-page document.title
- Backend inquiry endpoint + Resend email notifications (owner + auto-confirmation) — verified end-to-end
- Anti-spam honeypot + phone/email validation — verified (400/422 paths)

## Backlog
- P0: Replace gallery placeholders with real project photos; verify provisional safety/warranty copy against actual business terms
- P1: Dedicated Quote Request page (backend `type` field already supports it); individual service detail pages; WhatsApp click-to-chat link
- P2: Object Storage for gallery assets; Google Business Profile + local schema.org markup; analytics; admin view of inquiries

## Next Tasks
1. Swap placeholder gallery images as real projects complete
2. Add quote request flow (secondary nav item)
3. Service detail pages for SEO depth (e.g. "CCTV installation Baler")
4. LocalBusiness structured data + sitemap.xml
