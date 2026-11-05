import Link from "next/link";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { services } from "@/lib/content";

const others = services.filter((s) => !s.featured);

export function MoreServices() {
  return (
    <section aria-labelledby="more-services-title" className="section-light border-t border-navy/10 pb-24 pt-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RevealHeading
              id="more-services-title"
              lines={["Y para empresas,", "mucho más."]}
              className="type-display text-[clamp(2.4rem,4.8vw,4.4rem)] text-abyss"
            />
          </div>
          <p className="max-w-[44ch] text-navy/75 lg:col-span-5 lg:self-end">
            Contratos de mantenimiento, sistemas centrales, emergencias a cualquier hora y todo lo
            que necesita un hotel, un casino o una obra.
          </p>
        </div>

        <ul className="mt-12 grid border-t border-navy/12 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((service) => (
            <li key={service.slug} className="border-b border-navy/12 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r">
              <Link
                href={`/servicios/${service.slug}`}
                className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-white sm:p-8"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="text-[1.5rem] font-bold leading-tight tracking-[-0.02em] [font-stretch:118%] text-abyss">
                    {service.shortName}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-navy/20 text-abyss transition-all group-hover:border-abyss group-hover:bg-abyss group-hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                </span>
                <span className="text-navy/75">{service.headline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
