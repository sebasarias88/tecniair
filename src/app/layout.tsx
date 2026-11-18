import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { LinkLoading } from "@/components/LinkLoading";
import { OfflineSupport } from "@/components/OfflineSupport";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppDock } from "@/components/WhatsAppDock";
import { business, SITE_URL } from "@/lib/business";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";

// Self-hosted variable fonts (latin subset), preloaded by next/font.
const bricolage = localFont({
  src: "../fonts/bricolage-grotesque-variable.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-bricolage",
});

const figtree = localFont({
  src: "../fonts/figtree-variable.woff2",
  weight: "300 900",
  display: "swap",
  variable: "--font-figtree",
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
  themeColor: "#f5f9fc",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${bricolage.variable} ${figtree.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>
        <LinkLoading />
        <OfflineSupport />
        <SiteHeader />
        <div id="contenido" className="pt-[4.5rem] sm:pt-20">{children}</div>
        <SiteFooter />
        <WhatsAppDock />
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
        <Analytics />
      </body>
    </html>
  );
}
