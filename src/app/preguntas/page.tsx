import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { ArrowIcon, Container, CtaBand, PageIntro, WhatsAppButton } from "@/components/ui";
import { homeFaqs, services, type Faq } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

const title = "Preguntas frecuentes sobre aire acondicionado";
const description =
  "Precios, tiempos, garantía, cada cuánto hacer mantenimiento y más. Respuestas de Tecniair, servicio técnico de aire acondicionado en Armenia y el Quindío.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/preguntas" },
  openGraph: { url: "/preguntas", title, description },
};

function buildGroups() {
  const seen = new Set<string>();
  const unique = (items: Faq[]) =>
    items.filter((item) => {
      if (seen.has(item.q)) return false;
      seen.add(item.q);
      return true;
    });

  const general = { id: "generales", title: "Generales", href: null as string | null, items: unique(homeFaqs) };
  const byService = services
    .map((s) => ({ id: s.slug, title: s.shortName, href: `/servicios/${s.slug}`, items: unique(s.faqs) }))
    .filter((g) => g.items.length > 0);
  return [general, ...byService];
}

export default function QuestionsPage() {
  const groups = buildGroups();
  const all = groups.flatMap((g) => g.items);

  return (
    <main>
      <PageIntro
        crumbs={[
          { name: "Inicio", href: "/" },
          { name: "Preguntas", href: "/preguntas" },
        ]}
        title="Preguntas frecuentes"
        intro="Lo que más nos preguntan. Si no encuentras tu respuesta, escríbenos y te respondemos por WhatsApp."
      >
        <WhatsAppButton message="Hola Tecniair, tengo una pregunta sobre mi aire acondicionado.">Hacer una pregunta</WhatsAppButton>
      </PageIntro>

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-12">
        <nav aria-label="Temas" className="lg:col-span-3">
          <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-1">
            {groups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="inline-block rounded-full border border-line bg-white px-3.5 py-2 text-[0.95rem] hover:border-brand hover:text-brand lg:block lg:rounded-xl lg:border-0 lg:bg-transparent lg:px-3">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-12 lg:col-span-9">
          {groups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                <h2 id={`${g.id}-title`} className="font-display text-[clamp(1.6rem,3vw,2.1rem)]">
                  {g.title}
                </h2>
                {g.href && (
                  <Link href={g.href} className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline">
                    Ver el servicio
                    <ArrowIcon />
                  </Link>
                )}
              </div>
              <FaqList items={g.items} />
            </section>
          ))}
        </div>
      </Container>

      <CtaBand title="¿Tienes otra pregunta?" text="Escríbenos y te respondemos en minutos." />
      <JsonLd
        data={[
          faqJsonLd(all),
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Preguntas", path: "/preguntas" },
          ]),
        ]}
      />
    </main>
  );
}
