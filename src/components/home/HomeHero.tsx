import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { Container, Stars, WhatsAppButton } from "@/components/ui";
import { business } from "@/lib/business";
import { images } from "@/lib/images";

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.15rem] shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.15rem] shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function HomeHero() {
  return (
    <section className="bg-ice">
      <Container className="grid items-center gap-10 pb-14 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:pb-20">
        <div className="lg:col-span-6 [animation:enter-up_0.7s_var(--ease-out-expo)_both]">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.92rem] font-semibold">
            <span className="size-2 rounded-full bg-[#1fa851] [animation:pulse-dot_2.4s_ease-in-out_infinite]" aria-hidden="true" />
            Atendemos hoy · 24 horas
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.6rem,7.4vw,4.6rem)] leading-[0.98]">
            Tu aire acondicionado, <span className="text-brand">funcionando hoy.</span>
          </h1>
          <p className="mt-5 max-w-[36ch] text-[clamp(1.08rem,1.6vw,1.22rem)] text-ink-2">
            Servicio técnico de aire acondicionado en Armenia y todo el Quindío: instalación,
            mantenimiento y reparación. Te damos el precio antes de empezar.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <WhatsAppButton />
            <Link href="/servicios" className="btn btn-ghost btn-lg">
              Ver servicios
            </Link>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.98rem] text-ink-2">
            <li className="flex items-center gap-2">
              <Stars />
              <span>
                <strong className="text-ink">{business.googleRating}</strong> en Google · {business.googleReviewCount} opiniones
              </span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldIcon />
              Garantía por escrito
            </li>
            <li className="flex items-center gap-2">
              <PinIcon />
              Vamos a domicilio
            </li>
          </ul>
        </div>

        <div className="relative lg:col-span-6 [animation:enter-up_0.9s_0.1s_var(--ease-out-expo)_both]">
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] sm:aspect-[4/3.2] lg:aspect-[4/4.3]">
            <SmartImage
              src={images.technicianHelmet}
              alt="Técnico de aire acondicionado trabajando en Armenia"
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority
              quality={75}
            />
          </div>
          <div className="absolute -bottom-5 left-3 flex items-center gap-3.5 rounded-2xl bg-white px-4 py-3.5 shadow-[0_24px_50px_-22px_rgb(10_27_46/0.45)] sm:-left-5 sm:bottom-8 sm:gap-4 sm:px-5 sm:py-4">
            <span className="font-display text-[2.1rem] text-heat sm:text-[2.5rem]">31°</span>
            <svg viewBox="0 0 40 16" className="w-8 text-ink-2 sm:w-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 8h34M30 2l6 6-6 6" />
            </svg>
            <span className="font-display text-[2.1rem] text-brand sm:text-[2.5rem]">18°</span>
            <span className="max-w-[10ch] text-[0.85rem] leading-tight text-ink-2">Así queda tu casa</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
