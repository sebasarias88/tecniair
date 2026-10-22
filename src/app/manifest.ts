import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tecniair | Aire acondicionado en Armenia",
    short_name: "Tecniair",
    description: "Instalación, mantenimiento y reparación de aires acondicionados en el Quindío.",
    start_url: "/",
    display: "standalone",
    background_color: "#050e1a",
    theme_color: "#050e1a",
    lang: "es-CO",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
