# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (Vite, localhost:5173)
npm run build      # type-check with tsc then build
npm run lint       # ESLint
npm run preview    # preview production build
```

No test suite is configured.

## Architecture

Single-page React 19 + Vite + TypeScript landing page for Nexo, a Colombian HR/staffing company.

**Page structure** — `src/App.tsx` composes all sections in order:
`Navbar → HeroSection → DiferenciadoresSection → ServicesSection → AboutSection → JobsSection → ProcessSection → CtaBand → Footer`

**Data layer** — `src/data/` holds typed static arrays consumed by components:
- `services.ts` — five HR services rendered as tabs in `ServicesSection`
- `jobs.ts` — job listings rendered as cards in `JobsSection`

**Styling** — two CSS files, both loaded globally:
- `src/index.css` — base resets and typographic tokens using CSS custom properties (`--text`, `--bg`, `--border`, `--accent`). Includes dark-mode overrides via `@media (prefers-color-scheme: dark)`.
- `src/styles/global.css` — Tailwind v4 entry point (`@import "tailwindcss"`) plus an `@theme` block that registers design tokens (`--color-gold`, `--color-dark`, `--font-display`, etc.) and all component-level CSS classes (`.hero-stage`, `.svc-tab`, `.job-card`, `.about-panel`, `.cta-band`, etc.).

Components use **both** Tailwind utility classes and the named CSS classes defined in `global.css` — they are not interchangeable. Prefer the existing named classes for structural/layout work and Tailwind utilities for minor tweaks.

**Color palette** — primary accent is gold (`oklch(0.82 0.155 80)`) with variants `--gold-dk`, `--gold-lt`, `--gold-deep`. Dark backgrounds use `--dark` (`oklch(0.13 0.012 55)`). All colors are defined as CSS custom properties in `global.css :root` and mirrored as Tailwind tokens in `@theme`.

**Fonts** — `DM Sans` (body) and `Montserrat` (headings, labels, buttons), loaded externally; referenced via `--font-sans` / `--font-display` tokens.

**Scroll animations** — components apply `.rv` / `.rv.vis` classes (defined in `global.css`) via `IntersectionObserver` for reveal-on-scroll effects.
