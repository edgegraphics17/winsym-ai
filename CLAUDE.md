# Project: Winsym Coaching

## Mandatory Rules

1. **Always invoke the Frontend Design Skill before any frontend code** — No exceptions, every session.
2. **Use brand assets from /brand_assets/** — Ensure visual consistency across all work.
3. **Screenshot workflow is active** — After each build, follow the verification protocol.
4. **Always develop on localhost first** — Only push to GitHub when explicitly instructed.

## Skills & Quality Protocols

**Frontend Code:**
- Invoke `design:design-critique` after mockups for structured feedback
- Use `design:ux-copy` for microcopy, CTAs, error messages, empty states
- Invoke `design:accessibility-review` before handoff to ensure WCAG 2.1 AA compliance

**Backend/Architecture:**
- Use `engineering:system-design` when designing new services or data models
- Use `engineering:architecture` for major technical decisions with trade-offs
- Use `engineering:code-review` before merging code to production branches

**Documentation:**
- Use `engineering:documentation` for README updates, API docs, and runbooks
- Keep docs in sync with code changes

## Brand Assets

- **Logo:** `/brand_assets/logo.png`
- **Brand Guidelines:** `/brand_assets/guidelines.pdf`
- **Color Palette:** Reference guidelines.pdf for all color decisions
- **Typography:** Use brand font stack from guidelines

## Screenshot Workflow

After each build or significant change:

1. **Start the server** — `npm run dev` or equivalent
2. **Take screenshots** — Capture key user flows and states
3. **Visually review** — Check against brand guidelines and accessibility standards
4. **Iterate** — Make improvements based on visual review before considering complete

## Deployment Rule

- **Development:** Always develop and test on localhost first
- **Push to GitHub:** Only when you hear "Push to GitHub" explicitly
- **Staging/Production:** Controlled by CI/CD after GitHub push (do not deploy manually)

## Tech Stack

- Frontend: HTML/CSS/JavaScript
- Backend: Node.js/Supabase
- Deployment: Vercel
- VCS: GitHub

## Environment

- `.env` file is configured with necessary secrets
- Use `.env.example` as reference for new environment variables
- Never commit `.env` to version control
