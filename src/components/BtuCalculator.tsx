"use client";

import { useId, useMemo, useState } from "react";
import { ChoiceChips } from "@/components/ChoiceChips";
import { MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappUrl } from "@/lib/business";

type Sun = "shade" | "afternoon" | "direct";
type Use = "bedroom" | "living" | "office" | "shop";

const sunOptions: { id: Sun; label: string; factor: number; phrase: string; strength: number }[] = [
  { id: "shade", label: "Sombra", factor: 1, phrase: "en sombra", strength: 0.15 },
  { id: "afternoon", label: "Sol de la tarde", factor: 1.1, phrase: "con sol de la tarde", strength: 0.6 },
  { id: "direct", label: "Sol todo el día", factor: 1.2, phrase: "con sol todo el día", strength: 1 },
];

const useOptions: { id: Use; label: string; factor: number; phrase: string }[] = [
  { id: "bedroom", label: "Habitación", factor: 1, phrase: "una habitación" },
  { id: "living", label: "Sala o comedor", factor: 1.05, phrase: "una sala o comedor" },
  { id: "office", label: "Oficina", factor: 1.1, phrase: "una oficina" },
  { id: "shop", label: "Local comercial", factor: 1.2, phrase: "un local comercial" },
];

const STANDARD_SIZES = [9000, 12000, 18000, 24000, 36000, 48000, 60000];
const BTU_PER_M2 = 500;
const BTU_PER_EXTRA_PERSON = 600;
const AREA_MIN = 6;
const AREA_MAX = 120;
const PEOPLE_MAX = 30;
const PEOPLE_DRAWN = 12;

function formatBtu(value: number) {
  return value.toLocaleString("es-CO");
}

/**
 * Top-down sketch of the room: it grows with the area, the sun comes in
 * through the window and each person is a dot. Plain SVG + CSS transitions.
 */
function RoomSketch({ area, people, sun, tier }: { area: number; people: number; sun: number; tier: number }) {
  const k = 0.45 + 0.55 * ((area - AREA_MIN) / (AREA_MAX - AREA_MIN));
  const halfW = 120 * k;
  const halfH = 80 * k;
  const drawn = Math.min(people, PEOPLE_DRAWN);
  const cols = Math.min(drawn, 4);
  const rows = Math.ceil(drawn / 4);
  const flows = Math.min(3, 1 + Math.floor(tier / 2));
  const t = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s";

  return (
    <svg viewBox="0 0 300 230" className="w-full" role="img" aria-label={`Espacio de ${area} metros cuadrados con ${people} ${people === 1 ? "persona" : "personas"}`}>
      {/* Sun outside the window */}
      <g style={{ transform: `translate(${150 + halfW + 26}px, 62px)`, opacity: 0.25 + 0.75 * sun, transition: t }}>
        <circle r="11" fill="#d9480f" />
        <g stroke="#d9480f" strokeWidth="2.4" strokeLinecap="round">
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return <line key={i} x1={Math.cos(a) * 16} y1={Math.sin(a) * 16} x2={Math.cos(a) * 21} y2={Math.sin(a) * 21} />;
          })}
        </g>
      </g>

      {/* Room */}
      <g style={{ transform: `translate(150px, 112px) scale(${k})`, transition: t }}>
        <polygon points="120,-40 120,20 40,60 40,-10" fill="#ffd8c2" style={{ opacity: 0.85 * sun, transition: "opacity 0.4s" }} />
        <rect x="-120" y="-80" width="240" height="160" rx="8" fill="none" stroke="#0a1b2e" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        <rect x="116" y="-40" width="8" height="60" rx="2" fill="#8fd3ff" />
      </g>

      {/* Air conditioner on the top wall, with its airflow */}
      <g style={{ transform: `translate(150px, ${112 - halfH + 9}px)`, transition: t }}>
        <rect x="-24" y="-6" width="48" height="12" rx="3" fill="#0f5bd8" />
        <g fill="none" stroke="#0f5bd8" strokeWidth="2.2" strokeLinecap="round" className="[animation:pulse-air_2.4s_ease-in-out_infinite] motion-reduce:animate-none">
          {Array.from({ length: flows }, (_, i) => (
            <path key={i} d={`M${-18 - i * 6} ${16 + i * 9} Q0 ${26 + i * 11} ${18 + i * 6} ${16 + i * 9}`} opacity={1 - i * 0.25} />
          ))}
        </g>
      </g>

      {/* People */}
      <g style={{ transform: `translate(150px, ${120 + 8 * k}px)`, transition: t }}>
        {Array.from({ length: drawn }, (_, i) => {
          const c = i % 4;
          const r = Math.floor(i / 4);
          const rowCount = r === rows - 1 ? drawn - r * 4 : cols;
          const x = (c - (rowCount - 1) / 2) * 17;
          const y = (r - (rows - 1) / 2) * 17;
          return <circle key={i} cx={x} cy={y} r="6" fill="#0a1b2e" className="[animation:enter-up_0.3s_var(--ease-out-expo)_both]" />;
        })}
        {people > PEOPLE_DRAWN && (
          <text x="0" y={rows * 9 + 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3e5064">
            +{people - PEOPLE_DRAWN}
          </text>
        )}
      </g>

      {/* Size label */}
      <g style={{ transform: `translate(150px, ${112 + halfH + 20}px)`, transition: t }}>
        <text textAnchor="middle" fontSize="14" fontWeight="700" fill="#3e5064">
          {area} m²
        </text>
      </g>
    </svg>
  );
}

export function BtuCalculator() {
  const [area, setArea] = useState(16);
  const [people, setPeople] = useState(2);
  const [sun, setSun] = useState<Sun>("afternoon");
  const [use, setUse] = useState<Use>("bedroom");
  const areaId = useId();

  const sunOption = sunOptions.find((s) => s.id === sun)!;
  const useOption = useOptions.find((u) => u.id === use)!;

  const { recommended, raw, tierIndex } = useMemo(() => {
    const load = area * BTU_PER_M2 * sunOption.factor * useOption.factor + Math.max(0, people - 2) * BTU_PER_EXTRA_PERSON;
    const index = STANDARD_SIZES.findIndex((s) => s >= load);
    return {
      recommended: index >= 0 ? STANDARD_SIZES[index] : null,
      raw: Math.round(load),
      tierIndex: index >= 0 ? index : STANDARD_SIZES.length,
    };
  }, [area, people, sunOption, useOption]);

  const peopleLabel = `${people} ${people === 1 ? "persona" : "personas"}`;
  const message = recommended
    ? `Hola Tecniair. Usé la calculadora de su página: ${useOption.phrase} de ${area} m², ${sunOption.phrase} y ${peopleLabel}. Me salió un equipo de ${formatBtu(recommended)} BTU. ¿Me pueden cotizar el equipo con instalación?`
    : `Hola Tecniair. Necesito climatizar ${useOption.phrase} de ${area} m², ${sunOption.phrase} y ${peopleLabel}. ¿Me pueden hacer una visita para dimensionar el proyecto?`;

  const fill = `${((area - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100}%`;

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
      <div className="card space-y-8 rounded-[1.75rem] p-6 sm:p-8 lg:col-span-6">
        <div>
          <div className="mb-1 flex items-baseline justify-between gap-4">
            <label htmlFor={areaId} className="font-semibold">
              Tamaño del espacio
            </label>
            <span className="font-display text-[1.6rem] text-brand tabular-nums">{area} m²</span>
          </div>
          <input
            id={areaId}
            type="range"
            min={AREA_MIN}
            max={AREA_MAX}
            step={1}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="range"
            style={{ ["--fill" as string]: fill }}
          />
          <p className="text-[0.92rem] text-ink-2">Largo por ancho. Un cuarto típico mide entre 9 y 16 m².</p>
        </div>

        <ChoiceChips label="¿Para qué es?" options={useOptions} value={use} onChange={setUse} />
        <ChoiceChips label="¿Cuánto sol le entra?" options={sunOptions} value={sun} onChange={setSun} />

        <div>
          <p className="mb-3 font-semibold" id="people-label">
            Personas que suelen estar ahí
          </p>
          <div className="inline-flex items-center gap-1 rounded-full border border-line-2 bg-white p-1" role="group" aria-labelledby="people-label">
            <button
              type="button"
              onClick={() => setPeople((p) => Math.max(1, p - 1))}
              aria-label="Quitar una persona"
              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-ice"
            >
              <MinusIcon className="size-5" />
            </button>
            <span className="w-10 text-center text-[1.35rem] font-bold tabular-nums" aria-live="polite">
              {people}
            </span>
            <button
              type="button"
              onClick={() => setPeople((p) => Math.min(PEOPLE_MAX, p + 1))}
              aria-label="Agregar una persona"
              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-ice"
            >
              <PlusIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6">
        <div className="card rounded-[1.75rem] p-6 sm:p-8 lg:sticky lg:top-28">
          <div className="rounded-2xl bg-ice px-2 py-3">
            <RoomSketch area={area} people={people} sun={sunOption.strength} tier={tierIndex} />
          </div>

          <div className="mt-6 text-center" aria-live="polite">
            <p className="text-ink-2">Te recomendamos</p>
            {recommended ? (
              <p className="font-display mt-1 text-[clamp(3.2rem,9vw,4.6rem)] text-brand tabular-nums">
                {formatBtu(recommended)} <span className="text-[0.4em] text-ink">BTU</span>
              </p>
            ) : (
              <p className="font-display mt-2 text-[2rem] text-brand">Proyecto a la medida</p>
            )}
          </div>

          <ol className="mt-5 grid grid-cols-7 gap-1.5" aria-label="Capacidades comerciales">
            {STANDARD_SIZES.map((size) => {
              const active = size === recommended;
              return (
                <li
                  key={size}
                  aria-current={active ? "true" : undefined}
                  className={`rounded-lg py-1.5 text-center text-[0.8rem] font-semibold transition-colors duration-300 sm:text-[0.88rem] ${
                    active ? "bg-brand text-white" : "bg-ice text-ink-2"
                  }`}
                >
                  {size / 1000}k
                </li>
              );
            })}
          </ol>

          <p className="mt-5 text-center text-[0.92rem] text-ink-2">
            Carga estimada: {formatBtu(raw)} BTU/h. En la visita medimos y confirmamos antes de cotizar.
          </p>

          <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg mt-6 w-full">
            <WhatsAppIcon className="size-5 shrink-0" />
            {recommended ? `Cotizar un equipo de ${formatBtu(recommended)} BTU` : "Pedir visita para dimensionar"}
          </a>
        </div>
      </div>
    </div>
  );
}
