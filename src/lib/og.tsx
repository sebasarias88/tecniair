import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

type OgOptions = {
  /** Big first line. */
  title: string;
  /** Second line in ice blue. */
  highlight: string;
};

/** Shared Open Graph image: what WhatsApp, Facebook and Google show for a shared link. */
export function renderOgImage({ title, highlight }: OgOptions) {
  const big = title.length > 20 || highlight.length > 24 ? 64 : 84;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          color: "#0a1b2e",
          background: "#eaf4fb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", width: 88, height: 88, borderRadius: 22, background: "#0f5bd8", alignItems: "center", justifyContent: "center" }}>
            <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="4.5" width="18" height="7.5" rx="2" />
              <path d="M6.5 9h11" />
              <path d="M7.5 15.5c.8.8.8 2.2 0 3M12 15.5c.8.8.8 2.2 0 3M16.5 15.5c.8.8.8 2.2 0 3" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 54, fontWeight: 800 }}>Tecniair</span>
            <span style={{ fontSize: 26, color: "#3e5064" }}>Aire acondicionado · Armenia</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: big, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
            {title}
          </span>
          <span style={{ fontSize: big, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#0f5bd8" }}>
            {highlight}
          </span>
          <span style={{ marginTop: 28, fontSize: 32, color: "#3e5064" }}>
            Instalación · Mantenimiento · Reparación · WhatsApp 311 201 1682
          </span>
        </div>
      </div>
    ),
    ogSize,
  );
}
