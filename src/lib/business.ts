/**
 * Single source of truth for Tecniair's business data.
 * Everything here was taken from their Instagram (@tecniair).
 * Items marked TODO need confirmation with the client before going live.
 */
export const business = {
  name: "Tecniair",
  tagline: "Fresco siempre",
  description:
    "Instalación, reparación, suministro y mantenimiento de aires acondicionados en Armenia, Quindío.",
  phoneDisplay: "311 201 1682",
  phoneE164: "+573112011682",
  whatsappNumber: "573112011682",
  email: "santiagotecniair@gmail.com",
  address: "Barrio Los Andes, Manzana 13, Casa 2",
  city: "Armenia, Quindío",
  // TODO: confirm real coverage area with the client.
  coverage: "Armenia y municipios cercanos del Quindío",
  instagram: "https://www.instagram.com/tecniair/",
  instagramHandle: "@tecniair",
  mapsQuery: "Barrio Los Andes, Armenia, Quindío, Colombia",
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage =
  "Hola Tecniair, quiero información sobre sus servicios de aire acondicionado.";
