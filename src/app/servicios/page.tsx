import type { Metadata } from "next";
import { PhotoCard } from "@/components/cards";
import { JsonLd } from "@/components/JsonLd";
import { Container, CtaBand, PageIntro, Steps, WhatsAppButton } from "@/components/ui";
import { services } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

const title = "Servicios de aire acondicionado en Armenia";
const description =
  "Instalación, mantenimiento, reparación, venta de equipos, emergencias 24 horas, sistemas centrales y planes para empresas en Armenia y el Quindío.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/servicios" },
  openGraph: { url: "/servicios", title, description },
};

export default function ServicesPage() {
  const featured = services.filter((s) => s.featured);
  const others = services.filter((s) => !s.featured);

  return (
    <main>
      <PageIntro
        crumbs={[
          { name: "Inicio", href: "/" },
          { name: "Servicios", href: "/servicios" },
        ]}
        title="Servicios de aire acondicionado"
        intro="Todo lo que tu aire necesita en Armenia y el Quindío. Elige el servicio y te damos el precio antes de empezar."
      >
        <WhatsAppButton>Cotizar por WhatsApp</WhatsAppButton>
      </PageIntro>

      <Container className="py-14 sm:py-16">
        <h2 className="sr-only">Servicios principales</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => (
            <li key={s.slug} data-reveal>
              <PhotoCard href={`/servicios/${s.slug}`} title={s.shortName} text={s.headline} image={s.image} imageAlt={s.imageAlt} large />
            </li>
          ))}
        </ul>
        <h2 className="font-display mb-6 mt-16 text-[clamp(1.8rem,3.4vw,2.6rem)]">Más servicios</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug} data-reveal>
              <PhotoCard href={`/servicios/${s.slug}`} title={s.shortName} text={s.headline} image={s.image} imageAlt={s.imageAlt} />
            </li>
          ))}
        </ul>
      </Container>

      <Steps />
      <CtaBand />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
        ])}
      />
    </main>
  );
}
