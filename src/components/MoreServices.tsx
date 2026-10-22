import Link from "next/link";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { services } from "@/lib/content";

const others = services.filter((s) => !s.featured);

export function MoreServices() {
  return (
    <section aria-labelledby="more-services-title" className="bg-abyss pb-8 pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7" id="more-services-title">
            <RevealHeading
              lines={["Y para empresas,", "mucho más."]}
              className="type-display text-[clamp(2.4rem,4.8vw,4.4rem)]"
            />
          </div>
          <p className="max-w-[44ch] text-white/65 lg:col-span-5 lg:self-end">
            Contratos de mantenimiento, sistemas centrales, emergencias a cualquier hora y todo lo
            que necesita un hotel, un casino o una obra.
          </p>
        </div>

        <ul className="mt-12 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((service) => (
            <li key={service.slug} className="border-b border-white/10 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r">
              <Link
                href={`/servicios/${service.slug}`}
                className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-white/[0.04] sm:p-8"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="text-[1.5rem] font-bold leading-tight tracking-[-0.02em] [font-stretch:118%]">
                    {service.shortName}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 transition-all group-hover:border-glacier group-hover:bg-glacier group-hover:text-abyss"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                </span>
                <span className="text-white/65">{service.headline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
