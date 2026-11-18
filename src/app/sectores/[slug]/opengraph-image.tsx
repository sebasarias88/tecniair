import { getSector, sectors } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Tecniair, aire acondicionado en el Quindío";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = getSector(slug);
  return renderOgImage({
    title: sector ? `Aire para ${sector.name.toLowerCase()}` : "Aire acondicionado",
    highlight: "en Armenia y el Quindío",
  });
}
