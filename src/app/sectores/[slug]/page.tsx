import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArticleText, IncludesAndBenefits, RelatedCards } from "@/components/detail/DetailSections";
import { PageHero, PageHeroSkeleton } from "@/components/detail/PageHero";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, Steps } from "@/components/ui";
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

// See servicios/[slug]: URL data stays inside Suspense for instant navigation.
export default function SectorPage({ params }: Props) {
  return (
    <main>
      <Suspense fallback={<PageHeroSkeleton />}>
        <SectorContent params={params} />
      </Suspense>
    </main>
  );
}

async function SectorContent({ params }: Props) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const path = `/sectores/${sector.slug}`;
  const recommended = sector.services.map(getService).filter((s): s is Service => Boolean(s));
  const place = placeFor(sector.name);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Inicio", href: "/" },
          { name: "Empresas", href: "/empresas" },
          { name: sector.name, href: path },
        ]}
        title={sector.metaTitle}
        headline={sector.headline}
        intro={sector.intro}
        image={sector.image}
        imageAlt={sector.imageAlt}
        ctaLabel="Cotizar por WhatsApp"
        message={sector.message}
      />
      <IncludesAndBenefits heading={`Lo que necesita ${place}`} items={sector.needs} />
      <RelatedCards
        heading="Servicios recomendados"
        items={recommended.map((s) => ({
          href: `/servicios/${s.slug}`,
          name: s.shortName,
          text: s.headline,
          image: s.image,
          imageAlt: s.imageAlt,
        }))}
      />
      <Steps />
      <ArticleText heading={`Cómo cuidamos el aire de ${place}`} paragraphs={sector.details} />
      <Faq items={sector.faqs} title="Preguntas frecuentes" showAllLink />
      <CtaBand message={sector.message} />
      <JsonLd
        data={[
          faqJsonLd(sector.faqs),
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Empresas", path: "/empresas" },
            { name: sector.name, path },
          ]),
        ]}
      />
    </>
  );
}

function placeFor(name: string) {
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
