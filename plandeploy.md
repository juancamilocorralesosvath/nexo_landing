# Plan de despliegue — Nexo Landing

## Estado actual del proyecto

Última versión compilada tras los cambios recientes (`feat: logo, compress assets, fix social links, vacancy section fix`).

### Peso de los assets (fuente real, post-compresión)

| Asset | Tamaño |
|---|---|
| `videos/banner.mp4` | 3.1 MB |
| `videos/about.mp4` | 3.9 MB |
| `images/services/temporal.jpg` | 3.6 MB |
| `images/services/reclutamiento.jpg` | 2.3 MB |
| `images/services/formacion.jpg` | 480 KB |
| `images/services/seleccion.jpg` | 408 KB |
| `images/services/consultoria.jpg` | 264 KB |
| JS + CSS + SVGs | ~250 KB |
| **Total estimado dist/** | **~14 MB** |

Los videos ahora pesan 7 MB en total (antes 37 MB). El sitio es liviano y apto para cualquier plan de hosting gratuito.

---

## Recomendación: Cloudflare Pages + Cloudflare Registrar

**Costo total: ~$12–15 USD/año (~$50,000 COP) — todo incluido, sin sorpresas**

| | Cloudflare | Vercel + Porkbun | Netlify + Namecheap |
|---|---|---|---|
| Dominio (año 1) | $12–15 (.co) | $6.79 (.com) | $8.88 (.com) |
| Renovación dominio | $12–15/año | $14.99/año | $13.98–18.68/año |
| Hosting | **$0 siempre** | $0 (uso no comercial) | $0 (300 créditos/mes) |
| Ancho de banda | **Ilimitado** | 100 GB/mes | 15 GB/mes |
| Total 3 años | **~$36–45** | ~$43 | ~$50–65 |

Cloudflare gana a largo plazo y tiene ancho de banda ilimitado, importante para los videos aunque ya estén comprimidos.

---

## Proceso completo paso a paso

### 1 — Hacer el build final

```bash
npm run build
```

Esto genera la carpeta `dist/` con todo el sitio listo. **Este `dist/` es lo que se sube.**

### 2 — Crear cuenta en Cloudflare

- Ir a [cloudflare.com](https://cloudflare.com) → **Sign Up** (gratis)
- Usar el email del cliente

### 3 — Comprar el dominio

1. Panel de Cloudflare → **Domain Registration** → **Register Domains**
2. Buscar `nexosas.co` → agregar al carrito → pagar (~$12–15 USD)
3. El dominio queda automáticamente bajo los nameservers de Cloudflare

> Si `nexosas.co` no está disponible: probar `nexosas.com`, `nexosas.net`, `nexosas.org`

### 4 — Crear el sitio en Cloudflare Pages

1. Panel → **Workers & Pages** → **Create** → **Pages**
2. Elegir **"Upload assets"** (sin necesidad de GitHub)
3. Nombre del proyecto: `nexosas`
4. Arrastrar y soltar **el contenido de la carpeta `dist/`** (no la carpeta, lo que hay dentro: `index.html`, `assets/`, `videos/`, `images/`, etc.)
5. Cloudflare despliega y entrega una URL de prueba: `nexosas.pages.dev`

### 5 — Conectar el dominio

1. Dentro del proyecto Pages → **Custom Domains** → **Set up a custom domain**
2. Escribir `nexosas.co` → Continue
3. Como el dominio ya está en Cloudflare, la configuración DNS es automática (1–5 minutos)
4. HTTPS/SSL se activa automáticamente y sin costo

### 6 — Verificar

- Abrir `https://nexosas.co` en el navegador
- Confirmar que carga: navbar, hero con video, todas las secciones, footer
- Probar en móvil
- Verificar candado verde (HTTPS activo)

---

## Resumen de costos

| Concepto | Costo |
|---|---|
| Dominio `nexosas.co` año 1 | ~$12–15 USD |
| Hosting Cloudflare Pages | $0 |
| HTTPS/SSL | $0 |
| CDN global | $0 |
| **Total año 1** | **~$12–15 USD** |
| **Renovación anual** | **~$12–15 USD/año** |
