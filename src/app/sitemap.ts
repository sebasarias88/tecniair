import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { sectors, services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
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
