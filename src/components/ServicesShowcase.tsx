import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { SmartImage } from "@/components/SmartImage";
import { whatsappUrl } from "@/lib/business";
import { services } from "@/lib/content";

const featured = services.filter((s) => s.featured);

/** The four main services as a plain grid: no pinning, no horizontal scroll. */
export function ServicesShowcase() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="bg-abyss py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <RevealHeading
            id="services-title"
            lines={["Todo lo que", "tu aire necesita."]}
            className="type-display text-[clamp(2.6rem,5.2vw,4.8rem)] lg:col-span-7"
          />
          <p className="max-w-[46ch] text-white/70 lg:col-span-5 lg:self-end">
            Servicio técnico de aire acondicionado en Armenia para casas, apartamentos, oficinas y
            locales. Un mismo equipo para instalar, mantener y reparar.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {featured.map((service) => (
            <li key={service.slug} data-reveal="fade">
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-navy ring-1 ring-white/10">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={service.image}
                    alt={service.imageAlt}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="type-display text-[clamp(1.9rem,3vw,2.6rem)]">{service.shortName}</h3>
                  <p className="mt-3 text-white/75">{service.intro}</p>
                  <ul className="mt-5 space-y-2">
                    {service.includes.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-baseline gap-3 text-[0.98rem] text-white/85">
                        <span aria-hidden="true" className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-glacier" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
                    <a
                      href={whatsappUrl(service.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ice inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-semibold"
                    >
                      <WhatsAppIcon className="size-5" />
                      {service.cta}
                    </a>
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="inline-flex items-center rounded-full border border-white/25 px-5 py-3.5 font-semibold transition-colors hover:border-white/60"
                    >
                      Ver detalles
                      <span className="sr-only"> de {service.name}</span>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
