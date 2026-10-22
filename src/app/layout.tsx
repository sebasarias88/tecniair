import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { OfflineSupport } from "@/components/OfflineSupport";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppDock } from "@/components/WhatsAppDock";
import { business, SITE_URL } from "@/lib/business";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";

// Archivo variable (weight + width axes), self-hosted and preloaded by next/font.
const archivo = localFont({
  src: "../fonts/archivo-variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-archivo",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const defaultTitle = "Aire acondicionado en Armenia, Quindío | Tecniair";
const defaultDescription =
  "Instalación, mantenimiento, reparación y venta de aires acondicionados en Armenia y el Quindío. Hogares, negocios, hoteles, casinos y obra nueva. Atención 24 horas por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: defaultTitle, template: "%s | Tecniair" },
  description: defaultDescription,
  applicationName: business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: business.name,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: defaultDescription },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#050e1a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${archivo.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-glacier focus:px-5 focus:py-3 focus:font-semibold focus:text-abyss"
        >
          Saltar al contenido
        </a>
        <SmoothScroll />
        <OfflineSupport />
        <SiteHeader />
        <div id="contenido">{children}</div>
        <SiteFooter />
        <WhatsAppDock />
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
        <Analytics />
      </body>
    </html>
  );
}
