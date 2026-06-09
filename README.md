# Handoff: NEXO SAS Landing Page
**Versión actualizada — Junio 2026**

## Overview
Landing page de marketing para **NEXO SAS**, consultora colombiana de Recursos Humanos. Cubre el flujo completo del visitante: hero, diferenciadores, servicios, sobre nosotros, ofertas de empleo, proceso y CTA.

---

## Archivos

```
design_handoff_nexo_landing/
├── README.md                ← Este archivo
├── Landing Page.html        ← Prototipo hi-fi completo (abrir en navegador)
└── assets/
    └── nexo-logo.svg        ← Logo con fondo transparente
```

Abrir `Landing Page.html` directamente en cualquier navegador moderno. No requiere build.

---

## Stack recomendado
**Next.js 14 + Tailwind CSS** para sitio estático de marketing con portal de empleos futuro.

---

## Design Tokens

### Colores
```css
--bg:           oklch(0.985 0.006 78)   /* ≈ #FDFAF5  fondo crema cálido */
--bg-surface:   oklch(0.960 0.012 80)   /* ≈ #F5EFE4  superficie ligeramente más oscura */
--text:         oklch(0.13  0.015 55)   /* ≈ #1E1810  casi negro cálido */
--muted:        oklch(0.50  0.012 65)   /* ≈ #7A6F61  gris cálido secundario */
--border:       oklch(0.875 0.010 78)   /* ≈ #DDD5C8  borde cálido */
--gold:         oklch(0.82  0.155 80)   /* ≈ #FCCA50  dorado primario de marca */
--gold-dk:      oklch(0.54  0.138 72)   /* ≈ #D19B2D  dorado oscuro — texto sobre claro */
--gold-lt:      oklch(0.95  0.050 82)   /* ≈ #FDF3D5  tinte dorado claro — chips/tags */
--gold-deep:    oklch(0.42  0.110 68)   /* ≈ #A07418  dorado profundo — uso raro */
--dark:         oklch(0.13  0.012 55)   /* ≈ #1E1A14  panel oscuro */
--white:        #ffffff
```

### Tipografía
```
Títulos / etiquetas:  Montserrat — pesos 700, 800, 900
Cuerpo:               DM Sans — pesos 300, 400, 500

Google Fonts import:
https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap
```

### Espaciado
- Padding horizontal de página: `48px`
- Ritmo vertical entre secciones: `80px` padding-top
- Gap entre cards: `16px`
- Padding interno de componentes: `24–32px`

### Border Radius
| Elemento | Radio |
|----------|-------|
| Cards / tiles grandes | 18–22px |
| Cards medianas | 12–16px |
| Botones | 6px |
| Chips / badges | 4px |
| Tabs (about) | 6px |
| Panel tabs about | 12px |
| Íconos diferenciadores | 8px |

### Sombras
```
Card hover (gold):    0 14px 36px oklch(0.82 0.155 80 / 0.12)
Botón hover (gold):   0 8px 28px oklch(0.54 0.138 72 / 0.35)
Jobs CTA btn:         0 4px 20px oklch(0.82 0.155 80 / 0.30)
Nav scrolled:         0 2px 28px oklch(0 0 0 / 0.08)
```

---

## Secciones & Componentes

### 1. Navigation (fija)
- Fixed top, z-index 200, blur backdrop
- Logo SVG height `64px`
- Links: Montserrat 600 13px uppercase, `--muted` → `--text` hover
- CTA "Contáctanos": bg `--gold`, color `--dark`, border-radius 6px
- `.scrolled` class se añade cuando `scrollY > 50` (añade box-shadow)

**Links de navegación:**
```
Servicios → #servicios
Nosotros  → #nosotros
Empleos   → #empleos
Proceso   → #proceso
Contáctanos → #contacto
```

### 2. Hero Brand
- Padding top: `120px`
- "NEXO®_SAS": Montserrat 900, `clamp(36px, 5.2vw, 80px)`, `--text`
- "RRHH · Colombia": misma fuente/tamaño, color `--muted`
- `®`: superscript 30% size, `--gold-dk`
- Entrada: `translateY(20px → 0)` 700ms ease, 80ms delay

### 3. Hero Stage (banner oscuro animado)
- `margin: 20px 48px 0`, height `440px`, border-radius `18px`
- Gradiente animado que cicla entre tonos cálidos oscuros (14s ease infinite)
- Shimmer dorado radial overlay (70% 40%, gold/0.18)
- 3 orbs difuminadas flotando (filter: blur 70px, animación 7–12s)
- Sidebar de redes: in/ig/fb — botones 36×36 semitransparentes con texto dorado
- Bottom: avatares iniciales + label "+500 empresas" + headline con "talento" en `--gold`
- Entrada: `scale(0.98 → 1)` 900ms ease, 200ms delay

### 4. Hero Tiles (3 columnas)
- Grid 3 col, `gap: 10px`, `margin: 10px 48px 0`
- Fondo blanco, 1px border, border-radius 10px
- Número: Montserrat 700 11px `--gold-dk`; Label: Montserrat 700 13.5px `--text`
- Hover: border dorado, translateY(-3px), sombra dorada
- Click: scroll suave a `#servicios`
- Entrada: `translateY(18px → 0)` 700ms, 400ms delay

### 5. Diferenciadores (reemplaza stats)
- Grid 4 columnas, full width, bordes top/bottom + separadores entre columnas
- `padding: 36px 48px` por columna
- Ícono SVG 18px en contenedor 36×36 bg `--gold-lt`, border-radius 8px
- Título: Montserrat 800 15px `--text`
- Descripción: DM Sans 13px `--muted`, line-height 1.65

**Los 4 diferenciadores:**
| # | Ícono | Título | Descripción |
|---|-------|--------|-------------|
| 1 | layers | Proceso Completamente Tercerizado | Delegá todo el ciclo de contratación. Tu equipo se enfoca en lo que realmente importa. |
| 2 | globe | Cobertura en todo el país | Reclutamos talento en las principales ciudades de Colombia, sin importar el sector. |
| 3 | users | Perfiles para toda industria | Desde cargos operativos hasta directivos: encontramos el candidato que tu empresa necesita. |
| 4 | shield | Cumplimiento legal garantizado | Contratos, seguridad social y nómina 100% bajo la normativa colombiana vigente. |

### 6. Ticker (Marquee)
- Full width, bg `--bg-surface`, bordes top/bottom
- Montserrat 700 11.5px uppercase, separador `◆` dorado
- CSS: `translateX(0 → -50%)` 28s linear infinite, pausa en hover
- Ítems duplicados para loop seamless

### 7. Servicios (Tabs)
- Header de sección: `sec-title` + `sec-tag`
- Tab strip: grid 5 columnas, bg `--bg-surface`, hover `--gold-lt`
- Tab activa: bg `--white`, `border-bottom: 2px solid --gold`, z-index 1
- Panel: grid `1fr 1.8fr`, min-height 340px
  - Izquierda: placeholder con patrón hatch dorado (reemplazar con foto real)
  - Derecha: número + título + descripción + chips
- JS actualiza `#svcNum`, `#svcTitle`, `#svcDesc`, `#svcImg[data-hint]`, `#svcChips`

**Datos de los 5 servicios:**
| # | Título | Chips |
|---|--------|-------|
| 01 | Reclutamiento de Candidatos | Head Hunting · Atracción de Talento · Perfiles Técnicos |
| 02 | Selección de Personal | Assessment Centers · Pruebas Psicotécnicas · Entrevistas por Competencias |
| 03 | Contratación Temporal | Outsourcing · Personal en Misión · Administración de Nómina |
| 04 | Consultoría en RRHH | Clima Organizacional · Diseño de Cargos · Transformación Cultural |
| 05 | Formación y Desarrollo | Capacitación In-house · Coaching Ejecutivo · Liderazgo |

### 8. Sobre Nosotros (panel oscuro + tabs)
- bg `--dark`, border-radius 22px, padding 70px, grid `1fr 1fr`
- **Izquierda:** placeholder imagen (aspect-ratio 4/3, reemplazar con foto real)
- **Derecha:**
  - Label: Montserrat 700 10px uppercase `--gold`
  - Título: Montserrat 900, `clamp(26px, 3vw, 44px)`, white
  - **Tab strip** (3 tabs — Misión · Método · Valores):
    - Inactivo: borde `oklch(1 0 0 / 0.12)`, color `oklch(1 0 0 / 0.38)`
    - Activo: bg `--gold`, color `--dark`
    - Hover inactivo: bg `oklch(1 0 0 / 0.06)`
  - **Panel de contenido:** bg `oklch(1 0 0 / 0.05)`, borde `oklch(1 0 0 / 0.10)`, border-radius 12px, padding 28px 32px, min-height 130px
    - Título panel: Montserrat 800 17px white
    - Cuerpo panel: DM Sans 14px `oklch(1 0 0 / 0.52)`, line-height 1.75
    - Transición al cambiar: fade-out 120ms → swap contenido → fade-in 250ms
  - Botones: "Conoce Más →" (gold) + "Ver Servicios" (ghost blanco)

**Contenido de los 3 tabs:**
| Tab | Título | Cuerpo |
|-----|--------|--------|
| Misión | Conectamos talento con oportunidades reales | Somos la agencia que gestiona todo el ciclo de contratación por ti. Tu empresa se enfoca en crecer; nosotros encontramos a las personas que lo hacen posible. |
| Método | Proceso riguroso, resultados en tiempo récord | Desde el diagnóstico del perfil hasta la vinculación, cada paso está diseñado para reducir el tiempo de contratación sin sacrificar la calidad del candidato. |
| Valores | Transparencia y compromiso en cada proceso | Trabajamos con honestidad hacia empresas y candidatos por igual. Construimos relaciones de largo plazo basadas en la confianza y el respeto mutuo. |

### 9. Ofertas de Empleo (`#empleos`)
- `border-top: 1px solid --border`, padding `80px 0`
- Header: left (tag + título + desc) | right (CTA button + nota)
- **CTA "Ver todas las vacantes →"**: bg `--gold`, padding `16px 32px`, border-radius 8px, briefcase SVG, gold box-shadow
  - **⚠️ CONECTAR:** reemplazar `href="#"` con URL del portal ATS cuando esté listo
- Grid 3 tarjetas con: dept tag (gold-dk) + type badge (gold-lt) + título + meta (ciudad/jornada) + link "Postularme →"
- "Ver más vacantes" link centrado abajo → también conectar al portal

**Tarjetas de ejemplo (reemplazar con datos reales del ATS):**
| Dept | Tipo | Título | Ciudad |
|------|------|--------|--------|
| Logística | Temporal | Coordinador de Logística | Bogotá |
| Tecnología | Permanente | Desarrollador Full Stack | Medellín |
| Ventas | Permanente | Ejecutivo Comercial Senior | Cali |

### 10. Proceso (`#proceso`) — reemplaza testimonios
- Header: `sec-title` "Así trabajamos contigo" + `sec-tag` "Proceso"
- Timeline horizontal: grid 5 columnas
- Línea conectora: `::before` pseudo-elemento horizontal (1px `--border`)
- Punto dorado: círculo 36×36, bg `--gold-lt`, border 2px `--gold`, número dentro
- Título paso: Montserrat 800 15px `--text`
- Descripción: DM Sans 13px `--muted`, line-height 1.65

**Los 5 pasos:**
| # | Título | Descripción |
|---|--------|-------------|
| 01 | Diagnóstico | Conocemos tu empresa, la vacante y el perfil que necesitas cubrir. |
| 02 | Atracción de Talento | Activamos portales especializados, red de referidos y headhunting activo. |
| 03 | Evaluación | Filtramos hojas de vida, entrevistamos y aplicamos pruebas psicotécnicas validadas. |
| 04 | Presentación de Candidatos | Te entregamos una terna de perfiles preseleccionados listos para entrevistar. |
| 05 | Acompañamiento | Te acompañamos hasta la vinculación exitosa y el seguimiento postcontratación. |

### 11. CTA Band (`#contacto`)
- bg `--dark`, border-radius 22px, padding `68px 64px`, flex row space-between
- Orb decorativo radial derecha (blurred gold/0.10)
- Título: Montserrat 900 `clamp(24px, 3vw, 42px)`, "talento" en `--gold`
- Botones: "Contáctanos →" (gold, `mailto:contacto@nexosas.com`) + "Ofertas de Empleo" (ghost dark)

### 12. Footer
- Border top, padding `48px`, grid `1fr 1fr`
- Logo SVG 48px + descripción + copyright
- Links: Montserrat 600 11.5px uppercase, `--muted` → `--gold-dk` hover

---

## Interacciones & Animaciones

### Scroll Reveal (`.rv`)
`translateY(26px → 0)` 700ms ease vía IntersectionObserver (threshold 0.10). Delays: `.d1` = 100ms, `.d2` = 200ms.

### Hero Entrance
```
80ms  → hero brand slides in
200ms → hero stage scales in
400ms → hero tiles slide in
```

### Ticker
CSS `translateX(0 → -50%)` 28s linear infinite. Pausa en hover.

### Gradiente Hero
`background-position` cicla en gradiente 400%×400% cada 14s ease infinite.

### Orbs flotantes
3 círculos difuminados con `translate` loop de 7–12s, desfasados.

### Service Tabs
Click → quita/añade `.active` en tab strip → actualiza DOM del panel (sin recarga).

### About Tabs
Click → fade-out 120ms → swap contenido → fade-in 250ms.

### Nav
Añade `.scrolled` (box-shadow) cuando `scrollY > 50`.

---

## Estado a manejar

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `activeServiceTab` | `number` 0–4 | Tab activa de servicios |
| `activeAboutTab` | `number` 0–2 | Tab activa de Sobre Nosotros |
| `navScrolled` | `boolean` | `scrollY > 50` |
| `revealedElements` | `Set<Element>` | Elementos con animación de entrada ya ejecutada |

---

## Assets

| Archivo | Uso | Dimensiones |
|---------|-----|-------------|
| `assets/nexo-logo.svg` | Nav (64px alto) + Footer (48px alto) | 725×672px original, fondo transparente |

### Imágenes pendientes (placeholders activos)
| Sección | Descripción sugerida |
|---------|----------------------|
| Hero stage | Foto de equipo profesional o skyline colombiano |
| Servicios (panel izq.) | Foto contextual de cada servicio (entrevista, evaluación, etc.) |
| Sobre Nosotros | Foto del equipo NEXO o reunión corporativa |

---

## Conexiones pendientes

| Elemento | Acción |
|----------|--------|
| "Ver todas las vacantes" (`#jobsPortalBtn`) | Conectar URL portal ATS |
| "Postularme →" en cada job card | Conectar URL de cada vacante |
| "Ver más vacantes" (footer jobs) | Conectar URL portal ATS |
| "Contáctanos" (nav + CTA) | Confirmar si `mailto:` o formulario embebido |
| LinkedIn / Instagram / Facebook | URLs de perfiles reales |
| "Política de Privacidad" | URL página de privacidad |
