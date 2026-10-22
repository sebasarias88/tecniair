import { ImageResponse } from "next/og";

export const alt = "Tecniair, aire acondicionado en Armenia y el Quindío";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The preview shown when the link is shared on WhatsApp, Facebook or Google. */
export default function OpengraphImage() {
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
          color: "#eaf8ff",
          background:
            "radial-gradient(circle at 85% 15%, rgba(127,227,255,0.45), transparent 45%), radial-gradient(circle at 10% 100%, rgba(30,107,255,0.5), transparent 50%), #050e1a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="72" viewBox="0 0 48 36">
            <rect x="3" y="4" width="42" height="15" rx="4" fill="none" stroke="#ffffff" strokeWidth="2.2" />
            <path d="M9 14h30" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="38" cy="9" r="1.5" fill="#7fe3ff" />
            <path
              d="M13 23c0 2.5 2 3 2 5.5S13 31 13 33M24 23c0 2.5 2 3 2 5.5S24 31 24 33M35 23c0 2.5 2 3 2 5.5S35 31 35 33"
              fill="none"
              stroke="#7fe3ff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 56, fontWeight: 700 }}>Tecniair</span>
            <span style={{ fontSize: 26, color: "#7fe3ff" }}>Fresco siempre</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
            Aire acondicionado
          </span>
          <span style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#7fe3ff" }}>
            en Armenia y el Quindío
          </span>
          <span style={{ marginTop: 28, fontSize: 32, color: "rgba(234,248,255,0.75)" }}>
            Instalación · Mantenimiento · Reparación · WhatsApp 311 201 1682
          </span>
        </div>
      </div>
    ),
    size,
  );
}
