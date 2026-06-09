# Handoff: NEXO SAS Landing Page

## Overview
This is the redesigned marketing landing page for **NEXO SAS**, a Colombian human resources consulting company. The page covers the full visitor journey: hero branding, service showcase, company stats, about section, job listings, testimonials, and a contact CTA.

---

## About the Design Files
The files in this bundle are **high-fidelity design references created in HTML/CSS** — they are working prototypes showing the intended look, content, and interactive behavior. They are **not** production code to copy directly.

The task is to **recreate these designs in the target codebase's environment** (Next.js, React, Vue, etc.) using its established patterns, component libraries, and routing system. If no framework is chosen yet, **Next.js + Tailwind CSS** is the recommended stack given the nature of this project (marketing site + future job portal).

## Fidelity
**High-fidelity.** Colors, typography, spacing, animations, and copy are all final. Recreate pixel-perfectly using the codebase's libraries and conventions.

---

## Design Tokens

### Colors
```
--bg:           oklch(0.985 0.006 78)   ≈ #FDFAF5  (warm white page bg)
--bg-surface:   oklch(0.960 0.012 80)   ≈ #F5EFE4  (slightly darker warm surface)
--text:         oklch(0.13 0.015 55)    ≈ #1E1810   (warm near-black)
--muted:        oklch(0.50 0.012 65)    ≈ #7A6F61   (warm gray for secondary text)
--border:       oklch(0.875 0.010 78)   ≈ #DDD5C8   (warm border color)
--gold:         oklch(0.82 0.155 80)    ≈ #FCCA50   (primary brand yellow/gold)
--gold-dk:      oklch(0.54 0.138 72)    ≈ #D19B2D   (dark gold — text on light bg)
--gold-lt:      oklch(0.95 0.050 82)    ≈ #FDF3D5   (light gold tint — chip/tag bg)
--gold-deep:    oklch(0.42 0.110 68)    ≈ #A07418   (deep gold — rarely used)
--dark:         oklch(0.13 0.012 55)    ≈ #1E1A14   (dark panel bg)
--white:        #ffffff
```

### Typography
```
Headings:  Montserrat (Google Fonts) — weights 700, 800, 900
Body:      DM Sans (Google Fonts) — weights 300, 400, 500

Font import:
https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap
```

### Spacing
- Page horizontal padding: `48px` (sides)
- Section vertical rhythm: `80px` top padding for sections
- Card gap: `16px`
- Component internal padding: `24–32px`

### Border Radius
```
Cards / tiles:      10–12px
Large panels:       18–22px
Buttons:            6px
Pills / chips:      4px
Nav CTA button:     6px
```

### Shadows
```
Card hover:   0 14px 36px oklch(0.82 0.155 80 / 0.12)   (gold-tinted)
Button hover: 0 8px 28px oklch(0.54 0.138 72 / 0.35)
Nav scrolled: 0 2px 28px oklch(0 0 0 / 0.08)
```

---

## Sections & Components

### 1. Navigation (Fixed)
- **Position:** Fixed top, full width, z-index 200
- **Height:** ~72px (14px vertical padding)
- **Background:** `--bg` at 92% opacity + `backdrop-filter: blur(20px) saturate(1.5)`
- **Border:** 1px bottom border in `--border`
- **On scroll:** adds `box-shadow: 0 2px 28px oklch(0 0 0 / 0.08)`
- **Logo:** SVG file (`assets/nexo-logo.svg`), height `64px`
- **Links:** Montserrat 600, 13px, uppercase, letter-spacing 0.03em, color `--muted` → `--text` on hover
- **CTA Button ("Contáctanos"):** Background `--gold`, color `--dark`, padding `10px 22px`, border-radius `6px`, hover → `--gold-dk` + white text

### 2. Hero Brand Text
- **Padding:** `120px 48px 0`
- **"NEXO®_SAS":** Montserrat 900, `clamp(36px, 5.2vw, 80px)`, color `--text`, letter-spacing 0.01em
- **"RRHH · Colombia":** Same size/weight, color `--muted`
- **`®` superscript:** 30% size, color `--gold-dk`
- **Entrance animation:** `translateY(20px → 0)` over 700ms ease on page load

### 3. Hero Stage (Dark Gradient Banner)
- **Margin:** `20px 48px 0`
- **Height:** `440px`
- **Border-radius:** `18px`
- **Background:** Animated gradient cycling between dark warm tones:
  ```css
  background: linear-gradient(-45deg,
    oklch(0.18 0.020 55),
    oklch(0.26 0.060 65),
    oklch(0.32 0.100 75),
    oklch(0.22 0.040 60));
  background-size: 400% 400%;
  animation: gradshift 14s ease infinite;
  ```
- **Gold shimmer overlay:** `radial-gradient(ellipse 60% 80% at 70% 40%, gold/0.18 → transparent)`
- **3 floating orbs:** Blurred circles (filter: blur 70px) with slow float animation
- **Right sidebar social buttons:** `in`, `ig`, `fb` — 36×36px rounded squares, semi-transparent white bg, gold text
- **Bottom content (gradient overlay):** 4 avatar initials + "+500 empresas confían en nosotros" label + large headline
  - Headline: Montserrat 800, `clamp(24px, 3vw, 44px)`, white, with "talento" in `--gold`
- **Entrance animation:** `scale(0.98 → 1)` over 900ms ease with 200ms delay

### 4. Hero Service Tiles
- **Layout:** 3-column CSS grid, `gap: 10px`, `margin: 10px 48px 0`
- **Each tile:** White bg, 1px border `--border`, `border-radius: 10px`, `padding: 16px 22px`, flex row with gap 14px
- **Number:** Montserrat 700, 11px, `--gold-dk`, letter-spacing 0.05em
- **Label:** Montserrat 700, 13.5px, `--text`
- **Hover:** border → `--gold`, `translateY(-3px)`, gold-tinted shadow
- **Click:** smooth scroll to `#servicios`

### 5. Stats Band
- **Layout:** 4-column grid, full width, top + bottom border `--border`
- **Each stat:** `padding: 36px 48px`, right border except last
- **Number:** Montserrat 900, `clamp(40px, 4.2vw, 60px)`, `--text`; accent digit in `--gold-dk`
- **Counter animation:** Counts up from 0 on IntersectionObserver trigger (threshold 0.4)
  - `38+` years — 1600ms
  - `500+` companies — 1800ms
  - `8K+` talents — 2000ms
  - `98%` — static (no animation)
- **Label:** DM Sans 400, 13px, `--muted`

### 6. Ticker (Marquee)
- **Layout:** Full-width, `border-top + border-bottom` in `--border`, bg `--bg-surface`
- **Animation:** Infinite horizontal scroll left over 28s, pauses on hover
- **Items:** Montserrat 700, 11.5px, uppercase, letter-spacing 0.10em, `--muted`; `◆` separator in `--gold`
- **Duplicate content** for seamless loop (items repeated twice)

### 7. Services Section
- **Section header:** Flex row with `sec-title` (Montserrat 900, clamp 30→60px) + `sec-tag` label
- **Tab strip:** 5-column grid, border + rounded top corners
  - Each tab: `padding: 18px 14px`, bg `--bg-surface`, hover → `--gold-lt`
  - **Active tab:** bg `--white`, `border-bottom: 2px solid --gold`, z-index 1
  - Tab number: Montserrat 700, 10px, `--gold-dk`
  - Tab label: Montserrat 800, 13px, `--text`; active → `--gold-dk`
- **Content panel:** 2-column grid (`1fr 1.8fr`), border, rounded bottom corners, min-height 340px
  - Left: image placeholder (hatched pattern in `--gold-lt`, monospace hint text)
  - Right: `padding: 44px 48px`, service number + title + description + chips
  - Title: Montserrat 900, `clamp(22px, 2.5vw, 34px)`
  - Description: DM Sans 400, 14px, `--muted`, line-height 1.75
  - Chips: 1px border `--border`, border-radius 4px, Montserrat 600, 11.5px, `--muted`
- **Tab switching:** JS updates `#svcNum`, `#svcTitle`, `#svcDesc`, `#svcImg[data-hint]`, `#svcChips` on click

**Service data:**
| # | Title | Description | Chips |
|---|-------|-------------|-------|
| 01 | Reclutamiento de Candidatos | Identificamos y atraemos el talento idóneo mediante headhunting, portales especializados y nuestra red de profesionales en todo el país. | Head Hunting, Atracción de Talento, Perfiles Técnicos |
| 02 | Selección de Personal | Evaluamos competencias, cultura organizacional y potencial de cada candidato con herramientas validadas para garantizar la contratación más acertada. | Assessment Centers, Pruebas Psicotécnicas, Entrevistas por Competencias |
| 03 | Contratación Temporal | Soluciones flexibles para proyectos específicos y picos de demanda. Gestionamos toda la carga administrativa y legal de sus colaboradores temporales. | Outsourcing, Personal en Misión, Administración de Nómina |
| 04 | Consultoría en RRHH | Acompañamos a su organización en la gestión integral del capital humano: desde la estrategia de talento hasta la transformación organizacional. | Clima Organizacional, Diseño de Cargos, Transformación Cultural |
| 05 | Formación y Desarrollo | Programas de capacitación diseñados a medida para potenciar el desempeño y la motivación de sus equipos en toda Colombia. | Capacitación In-house, Coaching Ejecutivo, Liderazgo |

### 8. About (Dark Panel)
- **Margin:** `80px 48px`
- **Background:** `--dark`, `border-radius: 22px`, `padding: 70px`
- **Layout:** 2-column grid `1fr 1fr`, gap 72px, centered
- **Left:** Image placeholder (aspect-ratio 4/3, dark bg with subtle gold hatch)
- **Right:**
  - Label: Montserrat 700, 10px, uppercase, letter-spacing 0.14em, `--gold`
  - Title: Montserrat 900, `clamp(26px, 3vw, 44px)`, white
  - Body: DM Sans, 14px, `oklch(1 0 0 / 0.54)`, line-height 1.8
  - Stats grid: 3 columns, `38+` / `500+` / `15+` in Montserrat 900, 36px, `--gold`
  - Buttons: "Conoce Más →" (gold bg) + "Ver Servicios" (ghost white border)

**Stats:**
- `38+` — Años de trayectoria
- `500+` — Clientes activos
- `15+` — Ciudades de Colombia

### 9. Jobs Section (`#empleos`)
- **Layout:** Full width within `padding: 80px 0`, `border-top: 1px solid --border`
- **Header row:** flex, space-between
  - Left: section tag + `sec-title` "Trabaja con nosotros" + description text
  - Right: CTA button + "Portal en construcción · Próximamente disponible" note
- **CTA Button:** Gold bg, dark text, `padding: 16px 32px`, border-radius 8px, briefcase SVG icon, strong gold box-shadow
  - Hover: `--gold-dk` bg, white text, `translateY(-2px)`, deeper shadow
  - **⚠️ LINK TO CONNECT LATER:** This button should link to the external job portal URL when it's ready. Currently href="#".
- **Job cards grid:** 3 columns, gap 16px
  - Each card: white bg, 1px border `--border`, border-radius 12px, `padding: 24px 26px`
  - Hover: gold border, `translateY(-4px)`, gold shadow
  - Department tag: Montserrat 700, 10px, uppercase, `--gold-dk`
  - Type badge: Montserrat 600, 11px, bg `--gold-lt`, color `--gold-dk`, border-radius 4px
  - Title: Montserrat 800, 16px, `--text`
  - Meta: location + schedule, 12px, `--muted`
  - "Postularme →" link: `--gold-dk`, Montserrat 700, gap widens on hover
- **"Ver más vacantes" link** (bottom center): links to job portal

**Placeholder job cards:**
| Dept | Type | Title | Location |
|------|------|-------|----------|
| Logística | Temporal | Coordinador de Logística | Bogotá |
| Tecnología | Permanente | Desarrollador Full Stack | Medellín |
| Ventas | Permanente | Ejecutivo Comercial Senior | Cali |

### 10. Testimonials
- **Section header:** same as other sections
- **Grid:** 3 columns, `gap: 16px`, `padding: 0 48px 80px`
- **Each card:** white bg, 1px border, `border-radius: 16px`, `padding: 30px`
- **Stars:** 5× `★` in `--gold`
- **Quote:** DM Sans 400, 14px, italic, `--text`, line-height 1.72
- **Author avatar:** 42px circle, bg `--gold-lt`, Montserrat 800, 12px, `--gold-dk`
- **Hover:** gold border, `translateY(-5px)`, gold shadow

**Testimonial data:**
| Initials | Name | Role | Quote |
|----------|------|------|-------|
| MR | María Rodríguez | Directora de RRHH — Grupo XYZ | "NEXO transformó nuestra manera de reclutar…" |
| CP | Carlos Pedraza | CEO — Manufactura del Valle S.A. | "Su acompañamiento en contratación temporal…" |
| LG | Laura Gómez | Gerente General — TechCo Colombia | "Llevamos 5 años trabajando con NEXO…" |

### 11. CTA Band
- **Margin:** `0 48px 80px`
- **Background:** `--dark`, `border-radius: 22px`, `padding: 68px 64px`
- **Layout:** flex row, space-between, with decorative radial gold orb (right side, blurred)
- **Title:** Montserrat 900, `clamp(24px, 3vw, 42px)`, white, "talento" in `--gold`
- **Buttons:** "Contáctanos →" (gold) + "Ofertas de Empleo" (ghost dark border)

### 12. Footer
- **Border top:** 1px `--border`, `padding: 48px`, 2-column grid
- **Left:** Logo SVG (48px tall) + description + copyright
- **Right:** Links grid — Servicios, Nosotros, Empleos, Contacto, LinkedIn, Instagram, Privacidad
- **Link style:** Montserrat 600, 11.5px, uppercase, letter-spacing 0.02em, `--muted` → `--gold-dk` hover

---

## Interactions & Animations

### Scroll Reveal
All `.rv` elements animate `translateY(26px → 0)` over 700ms ease when they enter the viewport (IntersectionObserver, threshold 0.10). Delays: `.d1` = 100ms, `.d2` = 200ms.

### Counter Animation
Stats band numbers count up from 0 with cubic ease-out when scrolled into view (threshold 0.4, triggered once).

### Hero Entrance Sequence
```
80ms  → hero brand text slides in
200ms → hero stage scales in
400ms → hero tiles slide in
```

### Service Tabs
On click, JS updates the panel content (number, title, description, image hint, chips) and toggles `.active` on the tab strip. No page reload.

### Ticker
CSS `translateX(0 → -50%)` loop over 28s linear. Pauses on hover (`animation-play-state: paused`).

### Gradient Animation
Hero stage background cycles `background-position` across 400% × 400% gradient over 14s ease infinite.

### Floating Orbs
3 blurred circles with slow `translate` loop animations (7–12s each, staggered).

### Nav
Adds `.scrolled` class (shadow) when `window.scrollY > 50`.

---

## State Management Needed

| State | Type | Description |
|-------|------|-------------|
| `activeServiceTab` | `number` (0–4) | Which service tab is selected |
| `navScrolled` | `boolean` | Whether page has scrolled >50px |
| `countersAnimated` | `boolean` | Whether stat counters have run (run once) |
| `revealedElements` | `Set<Element>` | Which elements have animated in |

---

## Assets

| File | Usage |
|------|-------|
| `assets/nexo-logo.svg` | Nav logo + footer logo. Contains gold gradient NEXO letterform + "SAS" in Montserrat Bold. Background transparent. Original dimensions: 725×672px. Use at height 64px in nav, 48px in footer. |

> **Image placeholders:** All section images (hero stage, services, about) are currently CSS placeholders with hatched patterns and monospace hint text describing the intended photo. These need to be replaced with real photography.

---

## Future Connections

| Element | What to connect |
|---------|----------------|
| "Ver todas las vacantes" button (`#jobsPortalBtn`) | External ATS or job portal URL |
| "Postularme →" on each job card | Individual job posting URLs |
| "Contáctanos" (nav + CTA) | Contact form or `mailto:` |
| LinkedIn / Instagram / Facebook social links | Real social profile URLs |

---

## Files in This Package

```
design_handoff_nexo_landing/
├── README.md                ← This file
├── Landing Page.html        ← Full hi-fi prototype (open in browser)
└── assets/
    └── nexo-logo.svg        ← Brand logo (transparent background)
```

Open `Landing Page.html` directly in any modern browser to see the full interactive prototype. No build step required.
