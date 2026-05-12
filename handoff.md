# winsym.ai — Project Handoff

**Owner:** Karim Azzaoui · work@edgegraphics.co
**Live URL:** https://winsym-ai.vercel.app
**GitHub:** https://github.com/edgegraphics17/winsym-ai
**Supabase project ref:** rkyqluymaafxypaphumo

---

## What this project is

A 3-page personal brand website for Karim Azzaoui — AI Coach, Digital Strategist & Speaker based in Kuala Lumpur. Built as static HTML/CSS/JS with a Supabase backend for lead capture, bookings, and analytics. Deployed on Vercel with automatic CI/CD from GitHub.

---

## Pages & URLs

| Page | File | Vercel URL |
|------|------|------------|
| Homepage | `winsymai.html` | `winsym-ai.vercel.app/` |
| About / Identity | `karim-identity.html` | `winsym-ai.vercel.app/about` |
| Projects Showcase | `projects-showcase.html` | `winsym-ai.vercel.app/projects` |

All pages share a fixed nav, hamburger mobile menu, floating WhatsApp button, and a shared footer.

---

## Tech stack

| Layer | Tool |
|-------|------|
| Frontend | Vanilla HTML + CSS + JS (no framework, no build step) |
| Backend | Supabase (PostgreSQL + RLS) |
| Hosting | Vercel |
| Version control | GitHub (`edgegraphics17/winsym-ai`) |
| Fonts | Bebas Neue · DM Sans · DM Mono (Google Fonts CDN) |
| Supabase SDK | `@supabase/supabase-js@2` via jsDelivr CDN |

---

## File structure

```
Winsym Coaching/
├── winsymai.html            # Homepage
├── karim-identity.html      # About page
├── projects-showcase.html   # Projects page
├── js/
│   └── supabase-client.js   # Shared Supabase API layer
├── supabase/
│   └── schema.sql           # DB schema (run once in Supabase SQL editor)
├── scripts/
│   ├── inject-env.js        # Build-time env variable injection
│   └── setup-git-and-deploy.sh  # One-time setup script (already run)
├── vercel.json              # Routing + security headers
├── .env                     # Local credentials (gitignored)
├── .env.example             # Template for new devs
└── .gitignore
```

---

## Environment variables

Two variables required everywhere — local dev and Vercel:

| Variable | Where to find it |
|----------|-----------------|
| `SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon public key |

**Local dev:** stored in `.env` (gitignored). Values are:
```
SUPABASE_URL=https://rkyqluymaafxypaphumo.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
```

**Vercel:** added as Environment Variables in the Vercel project dashboard. At build time, `scripts/inject-env.js` replaces the `%%SUPABASE_URL%%` and `%%SUPABASE_ANON_KEY%%` placeholders in all three HTML files.

---

## How credentials get into the HTML

Each HTML file has this in `<head>`:

```html
<script>
  window.SUPABASE_URL      = '%%SUPABASE_URL%%';
  window.SUPABASE_ANON_KEY = '%%SUPABASE_ANON_KEY%%';
</script>
```

`scripts/inject-env.js` runs during `vercel build` and replaces those placeholders with the real values from Vercel's environment. `js/supabase-client.js` then reads from `window.SUPABASE_URL` and `window.SUPABASE_ANON_KEY`.

---

## Supabase database

### Tables

| Table | Purpose |
|-------|---------|
| `contacts` | Contact form submissions from homepage |
| `bookings` | Session/discovery call requests from calculator |
| `leads` | Email captures (newsletter / ticker) |
| `page_events` | Cookie-free pageview & interaction analytics |

### Row Level Security

- **Anonymous (public):** can INSERT into all tables — required for form submissions to work
- **Authenticated (you, via Supabase dashboard):** can SELECT and UPDATE contacts & bookings

To view your leads and form submissions: go to [supabase.com/dashboard](https://supabase.com/dashboard) → your project → Table Editor.

### Re-running the schema

If you ever need to recreate the database (e.g. new project):
1. Go to Supabase Dashboard → SQL Editor → New query
2. Paste the contents of `supabase/schema.sql`
3. Click Run

---

## Making changes and deploying

Vercel auto-deploys every push to `main`. The workflow is:

```bash
cd "/Users/karim/Documents/Claude/Projects/Winsym Coaching"

# Edit your HTML files, then:
git add -A
git commit -m "describe your change"
git push https://edgegraphics17:YOUR_PAT@github.com/edgegraphics17/winsym-ai.git main
```

Replace `YOUR_PAT` with a GitHub Personal Access Token (repo scope).
Create one at: https://github.com/settings/tokens

Vercel picks up the push within ~30 seconds and deploys automatically.

> **Note:** If you see `fatal: Unable to create .git/index.lock`, run `rm .git/index.lock` first.

---

## Design system

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--black` / `--black` | `#080808` / `#070707` | Page background |
| `--orange` | `#C45A1A` | Primary accent, CTAs |
| `--orange-bright` | `#E07030` | Hover states |
| `--orange-dim` | `#6a2e08` / `#7a3010` | Borders, subtle accents |
| `--white` | `#F5F2EE` / `#F0EDE8` | Body text |
| `--gray` | `#888` | Secondary text |
| `--gray-dim` | `#333` | Dividers, borders |

### Typography

| Font | Usage |
|------|-------|
| Bebas Neue | Display headings, large numbers |
| DM Sans | Body copy, UI labels |
| DM Mono | Code labels, tags, monospaced UI |

### Responsive breakpoint

All mobile overrides use `@media (max-width: 900px)`.

---

## Nav behaviour

- **Desktop:** Logo left · nav links centre · "Book a Session" button right
- **Mobile:** Logo left · hamburger right · full-screen overlay menu on open
- **Scroll down:** nav slides up out of view (`translateY(-100%)`)
- **Scroll up:** nav slides back in — smooth `cubic-bezier(0.4,0,0.2,1)` transition
- **z-index stack:** noise overlay `9999` · WA float `9990` · hamburger `9600` · nav `9500` · mobile menu `9400`

---

## WhatsApp integration

Uses the WhatsApp Click-to-Chat API — no Business API or account required.

**Number:** +49 162 2035499 (Germany — WhatsApp only)
**Link format:**
```
https://wa.me/4916220354499?text=Hi%20Karim%2C%20ich%20interessiere%20mich%20f%C3%BCr%20deine%20AI-Coaching%20Services.
```

Appears as a floating button (bottom-right, all pages). Hidden on mobile nav.

---

## Contact details displayed on site

| Contact | Format |
|---------|--------|
| Email | Karim@azzaoui.de |
| Phone (Malaysia) | +60 112 4487055 — `tel:` link |
| WhatsApp (Germany) | +49 162 2035499 — `wa.me` link, labelled "WhatsApp only" |

---

## Known quirks & gotchas

- **git index.lock:** The Cowork sandbox sometimes can't delete `.git/index.lock`. Always run `rm .git/index.lock` before committing if you see the lock error.
- **GitHub auth:** Mac Keychain may be logged in as a different GitHub account. Use the PAT embedded in the push URL (`https://username:TOKEN@github.com/...`) to bypass.
- **Vercel env import:** When importing `.env` in Vercel UI, use the "Import .env" button — do not paste keys manually into the Key field or it misparses them.
- **Supabase anon key:** This is safe to expose in frontend HTML — it's designed to be public. RLS policies enforce what anonymous users can actually do.
- **No build tool:** There is no npm, webpack, or Vite. The only "build step" is `scripts/inject-env.js` which does a simple string replace. Keep all JS in `<script>` tags or the `js/` folder.

---

## What's not yet done / next steps

- [ ] Custom domain (connect `winsym.ai` in Vercel → Domains)
- [ ] Real photo on karim-identity.html (replace the animated frame placeholder)
- [ ] Mobile layout audit for `karim-identity.html` and `projects-showcase.html` (only `winsymai.html` has been fully overhauled so far)
- [ ] Email notification when a contact form is submitted (Supabase → Webhooks or Resend integration)
- [ ] Booking confirmation emails
- [ ] Projects showcase — fill in real project content (currently draft cards)
- [ ] Analytics dashboard — query `page_events` table in Supabase to see traffic

---

*Last updated: May 2026*
