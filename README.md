# Tecniair — demo web

Sitio de ventas para Tecniair (aires acondicionados, Armenia, Quindío). El contenido salió del Instagram @tecniair. Cada botón abre WhatsApp con un mensaje ya escrito.

## Correr el proyecto

```bash
yarn install
yarn dev
```

## Stack

Next.js 16, Tailwind CSS 4, GSAP + ScrollTrigger para las animaciones, Lenis para el scroll suave y la fuente Archivo variable (self-hosted con Fontsource).

## Secciones

| Componente | Qué hace |
| --- | --- |
| `Preloader` | Intro: la temperatura baja de 31° a 18° y se levanta la cortina |
| `Hero` | Foto + aire frío animado en canvas (`ColdAirCanvas`) + control remoto interactivo |
| `ThermostatStory` | Sección fija con scroll: de 31° con calor y distorsión a 18° frío |
| `ServicesShowcase` | Servicios en scroll horizontal (desktop) con foto y CTA a WhatsApp |
| `MarqueeBand` | Nombres de servicios gigantes que aceleran con el scroll |
| `SymptomPicker` | Diagnóstico: arma el mensaje de WhatsApp según la falla |
| `BtuCalculator` | Calculadora de BTU con medidor y cotización por WhatsApp |
| `HowWeWork` | Ficha técnica metálica + proceso con la tubería de cobre que se llena |
| `Coverage` | Hogares, negocios y edificios |
| `Faq`, `SiteFooter`, `WhatsAppDock` | Preguntas, cierre y botones fijos de WhatsApp |

Datos del negocio: `src/lib/business.ts`. Fotos: `src/lib/images.ts`.

## Pendiente con el cliente

- [ ] Logo en vector (el actual es una recreación en SVG en `Logo.tsx`)
- [ ] Fotos propias: hoy son fotos de Unsplash (licencia libre). Se reemplazan en `src/lib/images.ts`
- [ ] Confirmar la cobertura (`business.coverage`)
- [ ] Confirmar "atención 24 horas" y "garantía por escrito" antes de publicar
