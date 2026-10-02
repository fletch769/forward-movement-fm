# FORWARD MOVEMENT — Charity Website

## Original Problem Statement
Build a website for charity FORWARD MOVEMENT (Registered Charity No. 1191828). Unique but urban in style. Contact page email: contact@forwardmovement.org.uk. The charity is updating its objects from the original performing-arts-focused object to five public-benefit objects: (1) education/training/mentoring, (2) arts/media/entertainment/sport/culture, (3) overcoming barriers to participation (employability, enterprise, social inclusion, independent living), (4) accommodation and housing-related support, (5) community facilities/projects. User also pasted context about setting up Resend DNS records on GoDaddy for forwardmovement.org.uk — NOT needed for the current build since email is sent via Emergent's managed email integration (sender domain platform-verified, Reply-To = contact@forwardmovement.org.uk). DNS work is only needed if the charity later wants to send FROM its own domain via its own Resend account.

## User Choices (confirmed)
- Contact form sends REAL emails via Resend (Emergent managed) to contact@forwardmovement.org.uk
- Pages: Home, About/Our Objects, Programmes, Get Involved, Contact
- Visual direction: dark & gritty street style (black bg, graffiti-inspired bold type, vivid accent)
- No donation features at all

## Architecture
- Frontend: React 19 + react-router-dom 7, Tailwind, framer-motion (kinetic hero + scroll reveals), lenis (smooth scroll), react-fast-marquee (editorial marquees), sonner toasts. Fonts: Anton (display) + Manrope (body). Accent: acid yellow #E0FF00 on #050505.
- Backend: FastAPI + MongoDB (motor). POST /api/contact validates, rate-limits (5/min/IP), stores in `contact_messages`, sends notification + branded auto-reply via user's own Resend account. GET /api/health for deploy checks.
- Env: backend/.env has RESEND_API_KEY (user's own Resend account, sending access), RESEND_FROM_EMAIL="Forward Movement Website <website@forwardmovement.org.uk>", CONTACT_INBOX=contact@forwardmovement.org.uk
- Email (2026-10-02): switched from Emergent managed proxy to user's OWN Resend account. Domain forwardmovement.org.uk verified via 3 GoDaddy DNS records: TXT resend._domainkey (DKIM p=MIGf...), CNAME rsend → rsend-euw1.forge.rmta.net, CNAME send → send.forge.rmta.net. Existing Microsoft 365 MX + SPF at @ untouched. Sends FROM website@forwardmovement.org.uk, reply_to = form submitter. Verified: 2 x Resend API 200 OK (curl + live form).
- Auto-reply (2026-10-02): every enquirer instantly gets a branded thank-you email (acid-yellow header, their message quoted, reply reaches contact@forwardmovement.org.uk). Auto-reply failure never blocks the enquiry. Verified live: auto_reply_id returned + Resend 200.
- Design source: /app/design_guidelines.json
- Original SVG logo mark (double forward chevrons, acid on ink) also used as favicon (/app/frontend/public/favicon.svg)

## User Personas
- Young person / person in need looking for programmes, housing support, mentoring
- Potential volunteer or partner organisation
- Charity stakeholders checking legitimacy (charity number, objects)

## Implemented (2026-10-02)
- 5 pages: Home (kinetic masked-reveal hero + parallax/mouse-tilt image, facts strip, mission, programmes preview, acid CTA band, 2 marquees), About (current object + 5 updated objects), Programmes (6-card bento grid), Get Involved (volunteer/partner/join), Contact (working form)
- Contact form -> real email FROM website@forwardmovement.org.uk TO contact@forwardmovement.org.uk via user's own verified Resend account + instant branded auto-reply to enquirer (verified: email_id + auto_reply_id returned, success toast in UI test)
- Dark gritty street design system, grain overlay, outline display text, mobile nav overlay
- All interactive elements have data-testid

## Verified
- GET /api/ health OK; POST /api/contact returns success + email_id
- UI: home at 375/768/1366px, contact form submit shows success toast, programmes bento renders

## Backlog
- P0: none
- P1: Add real programme details/dates/locations when the charity provides them; photos of actual Forward Movement sessions replacing stock imagery
- P2: Impact/stats section with real numbers, news/blog, events listing, trustee/team page, policies (safeguarding, privacy)

## Next Tasks
- Collect real programme info & photos from the charity
- Deploy via Publish button (50 credits); env vars incl. RESEND_API_KEY carry over automatically on first deploy; preview DB (contact_messages) migrates once, then preview/live databases are independent
