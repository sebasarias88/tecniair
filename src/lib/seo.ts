import { business, SITE_URL } from "@/lib/business";
import { services, type Faq } from "@/lib/content";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    slogan: business.tagline,
    description: business.description,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/icon.png`,
    telephone: business.phoneE164,
    email: business.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.locality,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: "CO",
    },
    areaServed: business.serviceArea.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [business.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de aire acondicionado",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: absoluteUrl(`/servicios/${s.slug}`) },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: business.name,
    inLanguage: "es-CO",
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: { name: string; metaDescription: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/servicios/${service.slug}`),
    serviceType: service.name,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: business.serviceArea.map((name) => ({ "@type": "City", name })),
  };
}
