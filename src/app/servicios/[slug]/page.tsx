import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IncludesAndBenefits, ProcessStrip, RelatedCards } from "@/components/detail/DetailSections";
import { PageHero } from "@/components/detail/PageHero";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { getService, sectors, services } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const path = `/servicios/${service.slug}`;
  return {
    title: { absolute: `${service.metaTitle} | Tecniair` },
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: { url: path, title: service.metaTitle, description: service.metaDescription },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/servicios/${service.slug}`;
  const relatedSectors = sectors.filter((s) => s.services.includes(service.slug)).slice(0, 4);
  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  const related =
    relatedSectors.length >= 2
      ? {
          heading: "Dónde lo hacemos",
          items: relatedSectors.map((s) => ({
            href: `/sectores/${s.slug}`,
            name: s.name,
            text: s.headline,
            image: s.image,
          })),
        }
      : {
          heading: "Otros servicios",
          items: relatedServices.map((s) => ({
            href: `/servicios/${s.slug}`,
            name: s.shortName,
            text: s.headline,
            image: s.image,
          })),
        };

  return (
    <main>
      <PageHero
        crumbs={[
          { name: "Inicio", href: "/" },
          { name: "Servicios", href: "/#servicios" },
          { name: service.shortName, href: path },
        ]}
        title={`${service.name} en Armenia y el Quindío`}
        headline={service.headline}
        intro={service.intro}
        image={service.image}
        ctaLabel={service.cta}
        message={service.message}
      />
      <IncludesAndBenefits heading="Qué incluye" items={service.includes} benefits={service.benefits} />
      <ProcessStrip />
      <RelatedCards {...related} />
      <Faq items={service.faqs} title={["Preguntas sobre", service.shortName.toLowerCase()]} />
      <JsonLd
        data={[
          serviceJsonLd(service),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: service.name, path },
          ]),
        ]}
      />
    </main>
  );
}
