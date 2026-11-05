import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { sectors, services } from "@/lib/content";

const pages = [
  { path: "/", priority: 1 },
  { path: "/servicios", priority: 0.9 },
  { path: "/empresas", priority: 0.8 },
  { path: "/contacto", priority: 0.8 },
  { path: "/calculadora", priority: 0.7 },
  { path: "/preguntas", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), changeFrequency: "monthly" as const, priority: p.priority })),
    ...services.map((s) => ({
      url: absoluteUrl(`/servicios/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: s.featured ? 0.9 : 0.8,
    })),
    ...sectors.map((s) => ({
      url: absoluteUrl(`/sectores/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
