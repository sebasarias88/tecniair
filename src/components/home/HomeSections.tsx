import Link from "next/link";
import { GoogleRatingCard, PhotoCard } from "@/components/cards";
import { SmartImage } from "@/components/SmartImage";
import { ArrowIcon, Container, SectionHeading, TownChips } from "@/components/ui";
import { sectors, services } from "@/lib/content";
import { images } from "@/lib/images";

export function HomeServices() {
  const featured = services.filter((s) => s.featured);
  const others = services.filter((s) => !s.featured);

  return (
    <section id="servicios" aria-labelledby="services-title">
      <Container className="pb-6 pt-20 sm:pt-24">
        <SectionHeading
          id="services-title"
          title="¿Qué necesitas?"
          text="Casas, apartamentos, oficinas y locales. Elige el servicio y te escribimos con el precio."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => (
            <li key={s.slug} data-reveal>
              <PhotoCard
                href={`/servicios/${s.slug}`}
                title={s.shortName}
                text={s.headline}
                image={s.image}
                imageAlt={s.imageAlt}
                large
              />
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-semibold">También:</span>
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/servicios/${s.slug}`}
              className="rounded-full border border-line bg-white px-3.5 py-2 text-[0.95rem] transition-colors hover:border-brand hover:text-brand"
            >
              {s.shortName}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ReviewsCoverage() {
  return (
    <section aria-labelledby="coverage-title">
      <Container className="grid gap-4 pb-20 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <GoogleRatingCard />
        </div>
        <div className="card flex flex-col gap-5 rounded-[1.75rem] p-7 sm:p-8 lg:col-span-7" data-reveal>
          <h2 id="coverage-title" className="font-display text-[clamp(1.7rem,3vw,2.4rem)]">
            Servicio técnico de aire acondicionado en Armenia y el Quindío
          </h2>
          <p className="text-ink-2">Vamos a tu casa, negocio u obra en estos municipios:</p>
          <TownChips />
        </div>
      </Container>
    </section>
  );
}

export function BusinessBand() {
  const highlighted = sectors.filter((s) => s.slug !== "hogares").slice(0, 6);

  return (
    <section aria-labelledby="business-title" className="night bg-night text-white">
      <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <p className="font-semibold text-sky">Para empresas</p>
          <h2 id="business-title" className="font-display mt-3 text-[clamp(2.1rem,4.4vw,3.4rem)]">
            ¿Hotel, casino, clínica u oficina?
          </h2>
          <p className="mt-4 max-w-[44ch] text-night-text">
            Planes de mantenimiento con visitas programadas, hoja de vida de cada equipo y
            prioridad en emergencias. Arma tu cotización en un minuto.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {highlighted.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/sectores/${s.slug}`}
                  className="inline-block rounded-full border border-night-line px-3.5 py-2 text-[0.95rem] transition-colors hover:border-sky"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/empresas#cotizar" className="btn btn-light btn-lg mt-8">
            Armar plan para mi empresa
            <ArrowIcon />
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:col-span-6" data-reveal>
          <SmartImage
            src={images.hotelLobby}
            alt="Lobby de hotel con aire acondicionado central"
            sizes="(min-width: 1024px) 45vw, 100vw"
            tone="night"
          />
        </div>
      </Container>
    </section>
  );
}

function ToolGlyph({ kind }: { kind: "calc" | "chat" }) {
  return (
    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ice text-brand">
      {kind === "calc" ? (
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 20V10l8-6 8 6v10z" />
          <path d="M9 20v-5h6v5" />
          <path d="M8.5 11h7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 5h16v11H9l-5 4z" />
          <path d="M8 9.5h8M8 12.5h5" />
        </svg>
      )}
    </span>
  );
}

/** The two interactive tools, each on its own page. */
export function ToolsTeaser() {
  const tools = [
    {
      href: "/calculadora",
      kind: "calc" as const,
      title: "¿Qué aire necesita tu espacio?",
      text: "Mueve el tamaño, el sol y las personas. Te decimos los BTU exactos.",
      cta: "Usar la calculadora",
    },
    {
      href: "/contacto#mensaje",
      kind: "chat" as const,
      title: "¿Qué le pasa a tu aire?",
      text: "Marca lo que ves y te armamos el mensaje para el técnico.",
      cta: "Armar mi mensaje",
    },
  ];

  return (
    <section aria-labelledby="tools-title">
      <Container className="pt-20 sm:pt-24">
        <SectionHeading id="tools-title" title="Resuélvelo en un minuto" />
        <ul className="grid gap-4 md:grid-cols-2">
          {tools.map((tool) => (
            <li key={tool.href} data-reveal>
              <Link
                href={tool.href}
                className="card group flex h-full items-start gap-5 rounded-[1.75rem] p-6 transition-shadow hover:shadow-[0_24px_50px_-30px_rgb(10_27_46/0.45)] sm:p-8"
              >
                <ToolGlyph kind={tool.kind} />
                <span className="flex flex-col gap-2">
                  <span className="font-display text-[1.45rem]">{tool.title}</span>
                  <span className="text-ink-2">{tool.text}</span>
                  <span className="mt-2 inline-flex items-center gap-2 font-semibold text-brand">
                    {tool.cta}
                    <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
