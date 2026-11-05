import type { Metadata } from "next";
import { GoogleRatingCard } from "@/components/cards";
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { MessageBuilder } from "@/components/MessageBuilder";
import { Container, PageIntro, SectionHeading, TownChips } from "@/components/ui";
import { business, defaultWhatsappMessage, whatsappUrl } from "@/lib/business";
import { breadcrumbJsonLd } from "@/lib/seo";

const title = "Contacto: técnico de aire acondicionado en Armenia";
const description =
  "Escríbenos por WhatsApp o llámanos. Tecniair atiende las 24 horas en Armenia, Calarcá, Circasia, La Tebaida, Montenegro, Quimbaya, Salento y Filandia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contacto" },
  openGraph: { url: "/contacto", title, description },
};

export default function ContactPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapsQuery)}`;

  const channels = [
    {
      href: whatsappUrl(defaultWhatsappMessage),
      label: "WhatsApp",
      value: business.phoneDisplay,
      note: "Respondemos a cualquier hora",
      icon: <WhatsAppIcon className="size-6" />,
      tint: "bg-wa text-ink",
      external: true,
    },
    {
      href: `tel:${business.phoneE164}`,
      label: "Llamar",
      value: business.phoneDisplay,
      note: "Atención 24 horas",
      icon: <PhoneIcon className="size-6" />,
      tint: "bg-brand text-white",
      external: false,
    },
    {
      href: business.instagram,
      label: "Instagram",
      value: business.instagramHandle,
      note: "Mira nuestros trabajos",
      icon: <InstagramIcon className="size-6" />,
      tint: "bg-ice text-brand",
      external: true,
    },
  ];

  return (
    <main>
      <PageIntro
        crumbs={[
          { name: "Inicio", href: "/" },
          { name: "Contacto", href: "/contacto" },
        ]}
        title="Hablemos"
        intro="Escríbenos por WhatsApp y agendamos la visita. Atendemos las 24 horas en Armenia y todo el Quindío."
      />

      <Container className="py-12 sm:py-16">
        <ul className="grid gap-4 md:grid-cols-3">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="card flex h-full items-center gap-4 p-5 transition-shadow hover:shadow-[0_24px_50px_-30px_rgb(10_27_46/0.45)] sm:p-6"
              >
                <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${c.tint}`}>{c.icon}</span>
                <span className="min-w-0">
                  <span className="block text-[0.92rem] text-ink-2">{c.label}</span>
                  <span className="font-display block truncate text-[1.4rem]">{c.value}</span>
                  <span className="block text-[0.92rem] text-ink-2">{c.note}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>

      <section id="mensaje" aria-labelledby="message-title" className="scroll-mt-24">
        <Container className="pb-14 sm:pb-20">
          <SectionHeading
            id="message-title"
            title="¿Qué le pasa a tu aire?"
            text="Marca lo que ves y te armamos el mensaje. El técnico llega sabiendo qué revisar."
          />
          <MessageBuilder />
        </Container>
      </section>

      <section aria-labelledby="where-title">
        <Container className="grid gap-4 pb-16 sm:pb-24 lg:grid-cols-12">
          <div className="card flex flex-col gap-5 rounded-[1.75rem] p-7 sm:p-8 lg:col-span-7">
            <h2 id="where-title" className="font-display text-[clamp(1.7rem,3vw,2.3rem)]">
              Dónde estamos
            </h2>
            <address className="not-italic text-ink-2">
              {business.address}, {business.city}
              <br />
              <a href={`mailto:${business.email}`} className="break-all hover:text-brand">
                {business.email}
              </a>
            </address>
            <p className="text-ink-2">Vamos a domicilio en:</p>
            <TownChips />
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-auto self-start">
              Ver en Google Maps
            </a>
          </div>
          <div className="lg:col-span-5">
            <GoogleRatingCard />
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: "/contacto" },
        ])}
      />
    </main>
  );
}
