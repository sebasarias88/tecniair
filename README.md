# Tecniair — demo web

Landing de ventas para Tecniair (aires acondicionados, Armenia, Quindío). Todo el contenido salió del Instagram @tecniair. Cada llamado a la acción abre WhatsApp con un mensaje ya escrito.

## Correr el proyecto

```bash
yarn install
yarn dev
```

## Estructura

- `src/lib/business.ts`: datos del negocio (teléfono, WhatsApp, correo, dirección, cobertura) y el helper `whatsappUrl`. Si cambia un dato, se cambia aquí.
- `src/components/CoolingHero.tsx`: hero con scroll. La temperatura baja de 31 °C a 18 °C y el fondo pasa de calor a frío.
- `src/components/SymptomPicker.tsx`: diagnóstico. El cliente marca qué le pasa al aire y se arma el mensaje de WhatsApp.
- `src/components/BtuCalculator.tsx`: calculadora de BTU que lleva a la cotización por WhatsApp.
- `src/components/ServiceList.tsx`, `WorkGallery.tsx`, `HowWeWork.tsx`, `Faq.tsx`, `SiteFooter.tsx`, `WhatsAppDock.tsx`.

## Pendiente con el cliente

- [ ] Logo en vector (el actual es una recreación en SVG en `Logo.tsx`)
- [ ] Fotos reales de trabajos: van en `public/work/` y se asignan en el campo `image` de `WorkGallery.tsx`
- [ ] Confirmar la cobertura (`business.coverage`)
- [ ] Confirmar si la visita de diagnóstico tiene costo
- [ ] Confirmar "atención 24 horas" y "garantía por escrito" antes de publicar
