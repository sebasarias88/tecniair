# Tecniair

Sitio de ventas de Tecniair (aire acondicionado, Armenia y el Quindío): www.tecniair.com.co. Cada botón abre WhatsApp con un mensaje ya escrito y cada clic se mide como conversión.

## Correr el proyecto

```bash
yarn install
cp .env.example .env.local
yarn dev
```

## Stack

Next.js 16 (App Router, páginas estáticas), Tailwind CSS 4, GSAP + ScrollTrigger, Lenis y la fuente Archivo variable (self-hosted con `next/font/local`).

## Páginas

- `/`: inicio con hero, historia 31° → 18°, servicios, sectores, planes para empresas, diagnóstico, calculadora de BTU, proceso y preguntas.
- `/servicios/[slug]`: 10 servicios, cada uno con su título, descripción, preguntas y datos estructurados.
- `/sectores/[slug]`: 8 sectores (hogares, oficinas, locales, restaurantes, hoteles, casinos, clínicas, obra nueva).
- `/whatsapp`: enlace corto que abre el chat (sirve para la bio de Instagram o anuncios).

El contenido de servicios y sectores vive en `src/lib/content.ts`; los datos del negocio en `src/lib/business.ts`; las fotos en `src/lib/images.ts`.

## SEO

- `metadataBase`, canonical por página, `sitemap.xml`, `robots.txt` (bloquea los previews de Vercel), imagen Open Graph generada, favicon, iconos y manifest.
- JSON-LD: `HVACBusiness` con zona de servicio y catálogo, `WebSite`, `Service`, `FAQPage` y `BreadcrumbList`.

## Medición

Variables en Vercel (ver `.env.example`). `Analytics.tsx` envía `generate_lead` a GA4, la conversión de Google Ads y `Contact`/`Lead` al Pixel de Meta en cada clic a WhatsApp o teléfono.

## Sin conexión

`public/sw.js` guarda las páginas visitadas y muestra `public/offline.html` sin internet. Sube `VERSION` en `sw.js` cada vez que lo cambies.

## Fotos

Por ahora son de Unsplash (licencia libre). Para usar una foto propia: WebP optimizado en `public/images/` y cambiar la ruta en `src/lib/images.ts`.
