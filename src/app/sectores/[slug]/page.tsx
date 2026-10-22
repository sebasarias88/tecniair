import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IncludesAndBenefits, ProcessStrip, RelatedCards } from "@/components/detail/DetailSections";
import { PageHero } from "@/components/detail/PageHero";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { getSector, getService, sectors, type Service } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return {};
  const path = `/sectores/${sector.slug}`;
  return {
    title: { absolute: `${sector.metaTitle} | Tecniair` },
    description: sector.metaDescription,
    alternates: { canonical: path },
    openGraph: { url: path, title: sector.metaTitle, description: sector.metaDescription },
  };
}

export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const path = `/sectores/${sector.slug}`;
  const recommended = sector.services.map(getService).filter((s): s is Service => Boolean(s));

  return (
    <main>
      <PageHero
        crumbs={[
          { name: "Inicio", href: "/" },
          { name: "Sectores", href: "/#sectores" },
          { name: sector.name, href: path },
        ]}
        title={sector.metaTitle}
        headline={sector.headline}
        intro={sector.intro}
        image={sector.image}
        ctaLabel="Cotizar por WhatsApp"
        message={sector.message}
      />
      <IncludesAndBenefits heading={`Lo que necesita ${articleFor(sector.name)}`} items={sector.needs} />
      <RelatedCards
        heading="Servicios recomendados"
        items={recommended.map((s) => ({
          href: `/servicios/${s.slug}`,
          name: s.shortName,
          text: s.headline,
          image: s.image,
        }))}
      />
      <ProcessStrip />
      <Faq items={sector.faqs} title={["Preguntas", "frecuentes"]} />
      <JsonLd
        data={[
          faqJsonLd(sector.faqs),
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: sector.name, path },
          ]),
        ]}
      />
    </main>
  );
}

function articleFor(name: string) {
  const map: Record<string, string> = {
    Hogares: "tu hogar",
    Oficinas: "tu oficina",
    "Locales comerciales": "tu local",
    Restaurantes: "tu restaurante",
    Hoteles: "tu hotel",
    Casinos: "tu casino",
    "Clínicas y consultorios": "tu consultorio",
    "Obra nueva y constructoras": "tu obra",
  };
  return map[name] ?? "tu espacio";
}
