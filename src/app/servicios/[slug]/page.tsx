import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArticleText, IncludesAndBenefits, RelatedCards } from "@/components/detail/DetailSections";
import { PageHero, PageHeroSkeleton } from "@/components/detail/PageHero";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, Steps } from "@/components/ui";
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

// The URL-dependent part sits inside Suspense so the page shell stays instant
// on client navigation (partialPrefetching). Known slugs are still prerendered whole.
export default function ServicePage({ params }: Props) {
  return (
    <main>
      <Suspense fallback={<PageHeroSkeleton />}>
        <ServiceContent params={params} />
      </Suspense>
    </main>
  );
}

async function ServiceContent({ params }: Props) {
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
            imageAlt: s.imageAlt,
          })),
        }
      : {
          heading: "Otros servicios",
          items: relatedServices.map((s) => ({
            href: `/servicios/${s.slug}`,
            name: s.shortName,
            text: s.headline,
            image: s.image,
            imageAlt: s.imageAlt,
          })),
        };

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Inicio", href: "/" },
          { name: "Servicios", href: "/servicios" },
          { name: service.shortName, href: path },
        ]}
        title={`${service.name} en Armenia y el Quindío`}
        headline={service.headline}
        intro={service.intro}
        image={service.image}
        imageAlt={service.imageAlt}
        ctaLabel={service.cta}
        message={service.message}
      />
      <IncludesAndBenefits heading="Qué incluye" items={service.includes} benefits={service.benefits} />
      <Steps />
      <ArticleText heading={`Servicio de ${service.shortName.toLowerCase()} en Armenia`} paragraphs={service.details} />
      <Faq items={service.faqs} title={`Preguntas sobre ${service.shortName.toLowerCase()}`} showAllLink />
      <RelatedCards {...related} />
      <CtaBand title={`¿Necesitas ${service.shortName.toLowerCase()}?`} message={service.message} />
      <JsonLd
        data={[
          serviceJsonLd(service),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Servicios", path: "/servicios" },
            { name: service.name, path },
          ]),
        ]}
      />
    </>
  );
}
