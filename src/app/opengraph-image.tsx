import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Tecniair, aire acondicionado en Armenia y el Quindío";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({ title: "Aire acondicionado", highlight: "en Armenia y el Quindío" });
}
