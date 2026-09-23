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
- 6 pages: Home (kinetic 3D hero, marquee, services index, coverage, process, why-us, gallery teaser, CTA band), About (mission/vision, 3 numbered manifesto chapters, honesty note), Services (6 alternating blocks with clipped-frame imagery), Gallery (6 labelled placeholders), Contact (big click-to-call card, email, address), Consultation (form: name/email/phone + optional service/message, honeypot)
- Sticky mobile call bar, navbar with theme toggle, footer with provisional standards note
- SEO meta in index.html (Aurora/Region 3 keywords, OG tags), per-page document.title
- Backend inquiry endpoint + Resend email notifications (owner + auto-confirmation) — verified end-to-end
- Anti-spam honeypot + phone/email validation — verified (400/422 paths)

## Revisions (2026-07-19, v2 — official company write-up integrated)
- Contact details updated: phone +63 991 724 2377, address San Luis, Aurora 3201, Philippines (site-wide + confirmation email template)
- Tagline "Empowering Smart Living Through Innovative Solutions" now drives the About hero
- Services descriptions, Why-Choose-Us points, About story, Mission and Vision replaced with improved versions of the official company copy

## Revisions (v3)
- Hero: network sphere → rotating globe with real world-map dots (Natural Earth data baked into src/data/globePoints.js), Philippines archipelago highlighted amber, beacon removed on request
- Contact person added: Alexander Galvan (Contact page call card + footer)
- Services + Gallery: Automated Gates and Electrical Wiring images replaced with user's own enhanced brand illustrations (/public/images/automated-gates.jpg, /public/images/electrical-wiring.jpg) — cropped, color/sharpness-tuned, web-optimized
- Service detail pages live at /services/:id (all 6): tagline, 2-paragraph overview, "What's included" feature list, prev/next navigation, consultation + call CTAs, per-page SEO title; home rows, services blocks, and footer links all point to them; invalid ids redirect to /services

## Revisions (v5)
- Automated Gates + Electrical Wiring images regenerated as photorealistic renders (Gemini Nano Banana via universal key, tropical PH settings). Illustrated versions backed up at /app/scripts/illustration_*.jpg; generation scripts in /app/scripts/.

## Deployment readiness (v4)
- P0: Replace gallery placeholders with real project photos; verify provisional safety/warranty copy against actual business terms
- P1: Dedicated Quote Request page (backend `type` field already supports it); WhatsApp click-to-chat link
- P2: Object Storage for gallery assets; Google Business Profile + local schema.org markup; analytics; admin view of inquiries

## Next Tasks
1. Swap placeholder gallery images as real projects complete
2. Add quote request flow (secondary nav item)
3. Service detail pages for SEO depth (e.g. "CCTV installation Baler")
4. LocalBusiness structured data + sitemap.xml
