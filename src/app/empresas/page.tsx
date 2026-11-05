import type { Metadata } from "next";
import { PhotoCard } from "@/components/cards";
import { JsonLd } from "@/components/JsonLd";
import { PlanBuilder } from "@/components/PlanBuilder";
import { Container, CtaBand, PageIntro, SectionHeading } from "@/components/ui";
import { sectors } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

const title = "Aire acondicionado para empresas en Armenia";
const description =
  "Planes de mantenimiento de aire acondicionado para hoteles, casinos, oficinas, clínicas, restaurantes y locales en Armenia y el Quindío. Arma tu cotización en un minuto.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/empresas" },
  openGraph: { url: "/empresas", title, description },
};

export default function BusinessPage() {
  return (
    <main>
      <PageIntro
        crumbs={[
          { name: "Inicio", href: "/" },
          { name: "Empresas", href: "/empresas" },
        ]}
        title="Planes para empresas"
        intro="Hoteles, casinos, oficinas y clínicas no pueden quedarse sin aire. Con un plan tus equipos están al día y pagas un valor fijo."
      >
        <a href="#cotizar" className="btn btn-brand btn-lg">
          Armar mi cotización
        </a>
      </PageIntro>

      <section id="cotizar" aria-labelledby="plan-title" className="scroll-mt-24">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            id="plan-title"
            title="Arma tu plan"
            text="Elige tu negocio, cuántos equipos tienes y cada cuánto. Lo envías por WhatsApp y te respondemos con el precio."
          />
          <PlanBuilder />
        </Container>
      </section>

      <section aria-labelledby="sectors-title">
        <Container className="pb-14 sm:pb-20">
          <SectionHeading id="sectors-title" title="Dónde trabajamos" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s) => (
              <li key={s.slug} data-reveal>
                <PhotoCard href={`/sectores/${s.slug}`} title={s.name} text={s.headline} image={s.image} imageAlt={s.imageAlt} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="¿Prefieres que te llamemos?"
        text="Escríbenos y agendamos una visita para revisar todos tus equipos."
        message="Hola Tecniair, quiero información sobre los planes de mantenimiento para empresas."
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Empresas", path: "/empresas" },
        ])}
      />
    </main>
  );
}
