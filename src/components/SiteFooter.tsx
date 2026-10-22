import { Logo } from "@/components/Logo";
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { RevealHeading } from "@/components/motion/RevealHeading";
import Link from "next/link";
import { business, defaultWhatsappMessage, whatsappUrl } from "@/lib/business";
import { sectors, services } from "@/lib/content";

export function SiteFooter() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(business.mapsQuery)}&output=embed`;

  return (
    <footer className="relative isolate overflow-hidden bg-abyss">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[48rem]"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 35%, rgb(127 227 255 / 0.28), transparent 70%), radial-gradient(40% 40% at 50% 20%, rgb(30 107 255 / 0.35), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-8 sm:pt-40">
        <div className="flex flex-col items-center text-center">
          <RevealHeading
            lines={["Fresco", "siempre."]}
            className="type-display text-[clamp(4.5rem,16vw,15rem)]"
            outlineLines={[1]}
          />
          <p className="mt-8 max-w-[44ch] text-[1.1rem] text-white/70">
            Escríbenos ahora y agendamos la visita. Respondemos por WhatsApp a cualquier hora.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a
                href={whatsappUrl(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ice inline-flex items-center gap-3 rounded-full px-9 py-5 text-[1.15rem] font-semibold"
              >
                <WhatsAppIcon className="size-6" />
                Escribir por WhatsApp
              </a>
            </Magnetic>
            <a
              href={`tel:${business.phoneE164}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 py-5 text-[1.05rem] font-semibold transition-colors hover:border-white/50"
            >
              <PhoneIcon className="size-5" />
              {business.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-28 grid gap-12 border-t border-white/10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-[34ch] text-white/65">{business.description}</p>
            <address className="mt-6 not-italic text-white/70">
              {business.address}
              <br />
              {business.city}
            </address>
            <ul className="mt-5 space-y-1.5 text-white/70">
              <li>
                <a href={`tel:${business.phoneE164}`} className="hover:text-glacier">
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="break-all hover:text-glacier">
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-glacier"
                >
                  <InstagramIcon className="size-4" />
                  {business.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
          <nav aria-label="Servicios" className="lg:col-span-3">
            <p className="font-semibold">Servicios</p>
            <ul className="mt-4 space-y-2 text-white/70">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicios/${s.slug}`} className="hover:text-glacier">
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Sectores" className="lg:col-span-2">
            <p className="font-semibold">Sectores</p>
            <ul className="mt-4 space-y-2 text-white/70">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link href={`/sectores/${s.slug}`} className="hover:text-glacier">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <p className="font-semibold">Dónde atendemos</p>
            <p className="mt-4 text-white/70">{business.serviceArea.join(", ")}.</p>
            <iframe
              title="Ubicación de Tecniair en Armenia"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-6 h-48 w-full rounded-3xl border border-white/10 [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.6)]"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-white/10 py-8 text-[0.9rem] text-white/55">
          <p>© Tecniair. Armenia, Quindío.</p>
          <p>Fresco siempre.</p>
        </div>
      </div>
    </footer>
  );
}
