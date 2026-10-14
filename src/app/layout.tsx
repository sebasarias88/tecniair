import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Tecniair | Aires acondicionados en Armenia, Quindío",
  description: `${business.description} Visita técnica a domicilio, presupuesto antes de empezar y garantía. WhatsApp ${business.phoneDisplay}.`,
  openGraph: {
    title: "Tecniair | Fresco siempre",
    description: business.description,
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c2238",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: business.name,
  slogan: business.tagline,
  description: business.description,
  telephone: business.phoneE164,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address,
    addressLocality: "Armenia",
    addressRegion: "Quindío",
    postalCode: "630001",
    addressCountry: "CO",
  },
  areaServed: "Quindío",
  sameAs: [business.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className="antialiased">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
