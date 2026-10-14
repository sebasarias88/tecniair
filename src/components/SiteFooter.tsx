import { Logo } from "@/components/Logo";
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { business, defaultWhatsappMessage, whatsappUrl } from "@/lib/business";

export function SiteFooter() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(business.mapsQuery)}&output=embed`;

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem]"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 0%, rgb(52 195 232 / 0.35), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-24 sm:px-8 sm:pt-32">
        <p className="type-numeral text-center text-[clamp(4.5rem,15vw,13rem)] text-ice-soft">
          18°C
        </p>
        <h2 className="type-display mx-auto mt-6 max-w-[18ch] text-center text-[clamp(2rem,5vw,3.6rem)]">
          ¿Listo para bajarle al calor?
        </h2>
        <p className="mx-auto mt-4 max-w-[44ch] text-center text-white/70">
          Escríbenos ahora y agendamos la visita. Respondemos por WhatsApp a cualquier hora.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-ice px-7 py-4 font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="size-5" />
            Escribir por WhatsApp
          </a>
          <a
            href={`tel:${business.phoneE164}`}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-7 py-4 font-semibold transition-colors hover:border-white/60"
          >
            <PhoneIcon className="size-5" />
            Llamar al {business.phoneDisplay}
          </a>
        </div>

        <div className="mt-24 grid gap-10 border-t border-white/15 py-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-[34ch] text-white/60">{business.description}</p>
          </div>
          <address className="not-italic md:col-span-3">
            <p className="font-semibold">Dónde estamos</p>
            <p className="mt-3 text-white/70">
              {business.address}
              <br />
              {business.city}
            </p>
            <p className="mt-5 font-semibold">Contacto</p>
            <ul className="mt-3 space-y-1.5 text-white/70">
              <li>
                <a href={`tel:${business.phoneE164}`} className="hover:text-white">
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="break-all hover:text-white">
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <InstagramIcon className="size-4" />
                  {business.instagramHandle}
                </a>
              </li>
            </ul>
          </address>
          <div className="md:col-span-5">
            <iframe
              title="Ubicación de Tecniair en Armenia"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full rounded-2xl border-0 grayscale-[0.6] invert-[0.9] hue-rotate-180"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-white/15 py-8 text-[0.9rem] text-white/45">
          <p>© Tecniair. Armenia, Quindío.</p>
          <p>Fresco siempre.</p>
        </div>
      </div>
    </footer>
  );
}
