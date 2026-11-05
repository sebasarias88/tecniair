import { getService, services } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Tecniair, servicio de aire acondicionado en Armenia";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage({
    title: service?.shortName ?? "Aire acondicionado",
    highlight: "en Armenia y el Quindío",
  });
}
