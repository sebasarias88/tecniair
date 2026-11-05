import type { Metadata } from "next";
import { BtuCalculator } from "@/components/BtuCalculator";
import { JsonLd } from "@/components/JsonLd";
import { Container, CtaBand, PageIntro } from "@/components/ui";
import { breadcrumbJsonLd } from "@/lib/seo";

const title = "Calculadora de BTU para aire acondicionado";
const description =
  "Calcula cuántos BTU necesita el aire acondicionado de tu habitación, sala, oficina o local según el tamaño, el sol y las personas. Cotiza el equipo con instalación en Armenia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/calculadora" },
  openGraph: { url: "/calculadora", title, description },
};

const tips = [
  {
    title: "Ni grande ni pequeño",
    text: "Un equipo pequeño trabaja forzado y no enfría. Uno muy grande gasta de más y deja el aire húmedo.",
  },
  {
    title: "El sol cuenta",
    text: "Un cuarto con sol de la tarde necesita alrededor de un 10 % más de capacidad que uno en sombra.",
  },
  {
    title: "Lo confirmamos en la visita",
    text: "Medimos el espacio y revisamos ventanas y techo antes de darte el precio final.",
  },
];

export default function CalculatorPage() {
  return (
    <main>
      <PageIntro
        crumbs={[
          { name: "Inicio", href: "/" },
          { name: "Calculadora", href: "/calculadora" },
        ]}
        title="¿Qué aire necesita tu espacio?"
        intro="Mueve el tamaño, el sol y las personas. Te decimos la capacidad en BTU y lo pides cotizado por WhatsApp."
      />
      <section aria-label="Calculadora de BTU">
        <Container className="py-12 sm:py-16">
          <BtuCalculator />
        </Container>
      </section>
      <section aria-labelledby="tips-title">
        <Container className="pb-14 sm:pb-20">
          <h2 id="tips-title" className="font-display mb-7 text-[clamp(1.8rem,3.4vw,2.6rem)]">
            Antes de comprar un aire
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {tips.map((tip) => (
              <li key={tip.title} className="card p-6" data-reveal>
                <p className="font-display text-[1.3rem]">{tip.title}</p>
                <p className="mt-1.5 text-ink-2">{tip.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand title="¿Prefieres que lo midamos?" text="Vamos, medimos el espacio y te recomendamos el equipo." />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Calculadora", path: "/calculadora" },
        ])}
      />
    </main>
  );
}
