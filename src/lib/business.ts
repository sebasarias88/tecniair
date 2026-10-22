/**
 * Single source of truth for Tecniair's business data.
 * Contact data comes from their Instagram (@tecniair).
 */
export const SITE_URL = (process.env.SITE_URL ?? "https://www.tecniair.com.co").replace(
  /\/$/,
  "",
);

export const business = {
  name: "Tecniair",
  legalName: "Tecniair",
  tagline: "Fresco siempre",
  description:
    "Instalación, mantenimiento, reparación y venta de aires acondicionados en Armenia y el Quindío. Hogares, negocios, hoteles, casinos y obra nueva.",
  phoneDisplay: "311 201 1682",
  phoneE164: "+573112011682",
  whatsappNumber: "573112011682",
  email: "santiagotecniair@gmail.com",
  address: "Barrio Los Andes, Manzana 13, Casa 2",
  locality: "Armenia",
  region: "Quindío",
  postalCode: "630001",
  city: "Armenia, Quindío",
  coverage: "Armenia y municipios cercanos del Quindío",
  serviceArea: [
    "Armenia",
    "Calarcá",
    "Circasia",
    "La Tebaida",
    "Montenegro",
    "Quimbaya",
    "Salento",
    "Filandia",
  ],
  instagram: "https://www.instagram.com/tecniair/",
  instagramHandle: "@tecniair",
  mapsQuery: "Barrio Los Andes, Armenia, Quindío, Colombia",
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage =
  "Hola Tecniair, quiero información sobre sus servicios de aire acondicionado.";
