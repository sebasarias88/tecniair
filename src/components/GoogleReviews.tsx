import { RevealHeading } from "@/components/motion/RevealHeading";
import { business } from "@/lib/business";

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-7 fill-[#f5b301]">
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

/** Light section: real Google rating plus the local copy people search for. */
export function GoogleReviews() {
  return (
    <section aria-labelledby="reviews-title" className="section-light py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <RevealHeading
            id="reviews-title"
            lines={["Servicio técnico de aire", "acondicionado en Armenia."]}
            className="type-display text-[clamp(2rem,7.4vw,4.2rem)] text-abyss lg:text-[clamp(2.3rem,4.4vw,4.2rem)]"
          />
          <p className="mt-6 max-w-[58ch] text-[1.08rem] leading-relaxed text-navy/80">
            Somos Tecniair, técnicos en instalación, mantenimiento y reparación de aire acondicionado
            en Armenia, Quindío. Atendemos casas, apartamentos, oficinas, locales comerciales,
            restaurantes, hoteles, casinos, clínicas y obras nuevas, las 24 horas.
          </p>
          <p className="mt-6 font-semibold text-abyss">También vamos a</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {business.serviceArea.map((city) => (
              <li key={city} className="rounded-full bg-white px-4 py-2 text-[0.95rem] text-navy ring-1 ring-navy/10">
                {city}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5" data-reveal="fade">
          <div className="rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-30px_rgb(11_31_54/0.35)] ring-1 ring-navy/10 sm:p-10">
            <p className="flex items-center gap-2 text-[0.95rem] font-semibold text-navy/70">
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path fill="#4285F4" d="M22.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-7.9z" />
                <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23z" />
                <path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.1a11 11 0 0 0 0 9.9l3.7-2.8z" />
                <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4z" />
              </svg>
              Opiniones en Google
            </p>
            <p className="mt-5 flex items-end gap-4">
              <span className="type-numeral text-[6.5rem] text-abyss">{business.googleRating}</span>
              <span className="pb-4">
                <Stars />
                <span className="mt-2 block text-[1rem] text-navy/75">
                  {business.googleReviewCount} opiniones
                </span>
              </span>
            </p>
            <p className="mt-4 text-navy/75">
              Clientes de Armenia y el Quindío califican nuestro trabajo en Google.
            </p>
            <a
              href={business.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-abyss px-6 py-4 font-semibold text-white transition-colors hover:bg-navy-2"
            >
              Ver opiniones en Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
