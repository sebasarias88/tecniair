"use client";

import { useId, useMemo, useState } from "react";
import { MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { whatsappUrl } from "@/lib/business";

type Sun = "shade" | "afternoon" | "direct";
type Use = "bedroom" | "living" | "office" | "shop";

const sunOptions: { id: Sun; label: string; factor: number; phrase: string }[] = [
  { id: "shade", label: "Sombra", factor: 1, phrase: "en sombra" },
  { id: "afternoon", label: "Sol de la tarde", factor: 1.1, phrase: "con sol de la tarde" },
  { id: "direct", label: "Sol todo el día", factor: 1.2, phrase: "con sol todo el día" },
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

const RING_RADIUS = 120;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS * 0.75; // 270° arc

function formatBtu(value: number) {
  return value.toLocaleString("es-CO");
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (id: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 font-semibold">{label}</legend>
      <div role="radiogroup" className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={value === o.id}
            onClick={() => onChange(o.id)}
            className={`rounded-full border px-4 py-2.5 text-[0.98rem] transition-all ${
              value === o.id
                ? "glow-ring border-glacier bg-glacier text-abyss"
                : "border-white/15 bg-white/[0.04] text-white/85 hover:border-white/40"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function BtuCalculator() {
  const [area, setArea] = useState(16);
  const [people, setPeople] = useState(2);
  const [sun, setSun] = useState<Sun>("afternoon");
  const [use, setUse] = useState<Use>("bedroom");
  const areaId = useId();

  const { recommended, raw, tierIndex } = useMemo(() => {
    const sunFactor = sunOptions.find((s) => s.id === sun)!.factor;
    const useFactor = useOptions.find((u) => u.id === use)!.factor;
    const load =
      area * BTU_PER_M2 * sunFactor * useFactor + Math.max(0, people - 2) * BTU_PER_EXTRA_PERSON;
    const index = STANDARD_SIZES.findIndex((s) => s >= load);
    return {
      recommended: index >= 0 ? STANDARD_SIZES[index] : null,
      raw: Math.round(load),
      tierIndex: index >= 0 ? index : STANDARD_SIZES.length,
    };
  }, [area, people, sun, use]);

  const sunPhrase = sunOptions.find((s) => s.id === sun)!.phrase;
  const usePhrase = useOptions.find((u) => u.id === use)!.phrase;
  const peopleLabel = `${people} ${people === 1 ? "persona" : "personas"}`;
  const message = recommended
    ? `Hola Tecniair. Usé la calculadora de su página: ${usePhrase} de ${area} m², ${sunPhrase} y ${peopleLabel}. Me salió un equipo de ${formatBtu(recommended)} BTU. ¿Me pueden cotizar el equipo con instalación?`
    : `Hola Tecniair. Necesito climatizar ${usePhrase} de ${area} m², ${sunPhrase} y ${peopleLabel}. ¿Me pueden hacer una visita para dimensionar el proyecto?`;

  const fill = `${((area - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100}%`;
  const ringProgress = Math.min(1, (tierIndex + 1) / STANDARD_SIZES.length);

  return (
    <section id="calculadora" className="relative isolate overflow-hidden bg-navy py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 50% at 75% 50%, rgb(127 227 255 / 0.16), transparent 70%), linear-gradient(180deg, #050e1a 0%, #0b1f36 20%, #0b1f36 80%, #050e1a 100%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <RevealHeading
            lines={["¿Qué aire", "necesita tu espacio?"]}
            className="type-display text-[clamp(2.6rem,5.6vw,5.2rem)] lg:col-span-8"
          />
          <p className="max-w-[44ch] text-white/65 lg:col-span-4 lg:self-end">
            Un equipo pequeño trabaja forzado y uno grande gasta de más. Calcula la capacidad y
            pide la cotización con el número exacto.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-9 lg:col-span-6">
            <div>
              <div className="mb-1 flex items-baseline justify-between">
                <label htmlFor={areaId} className="font-semibold">
                  Tamaño del espacio
                </label>
                <span className="type-condensed text-[1.5rem] text-glacier">{area} m²</span>
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
              <p className="text-[0.9rem] text-white/65">
                Largo por ancho. Un cuarto típico mide entre 9 y 16 m².
              </p>
            </div>

            <Segmented label="¿Para qué es?" value={use} options={useOptions} onChange={setUse} />
            <Segmented label="¿Cuánto sol le entra?" value={sun} options={sunOptions} onChange={setSun} />

            <div>
              <p className="mb-3 font-semibold" id="people-label">
                Personas que suelen estar ahí
              </p>
              <div
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1"
                role="group"
                aria-labelledby="people-label"
              >
                <button
                  type="button"
                  onClick={() => setPeople((p) => Math.max(1, p - 1))}
                  aria-label="Quitar una persona"
                  className="grid size-11 place-items-center rounded-full transition-colors hover:bg-white/10"
                >
                  <MinusIcon className="size-5" />
                </button>
                <span className="type-condensed w-10 text-center text-[1.4rem]" aria-live="polite">
                  {people}
                </span>
                <button
                  type="button"
                  onClick={() => setPeople((p) => Math.min(30, p + 1))}
                  aria-label="Agregar una persona"
                  className="grid size-11 place-items-center rounded-full transition-colors hover:bg-white/10"
                >
                  <PlusIcon className="size-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="glass relative overflow-hidden rounded-[2.25rem] p-7 sm:p-10">
              <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
                <svg viewBox="0 0 300 300" className="absolute inset-0 size-full -rotate-[225deg]" aria-hidden="true">
                  <defs>
                    <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1e6bff" />
                      <stop offset="100%" stopColor="#7fe3ff" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="150"
                    cy="150"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="rgb(255 255 255 / 0.08)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={`${RING_LENGTH} 1000`}
                  />
                  <circle
                    cx="150"
                    cy="150"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="url(#ring-grad)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={`${RING_LENGTH * ringProgress} 1000`}
                    className="transition-[stroke-dasharray] duration-700 ease-[var(--ease-out-expo)] [filter:drop-shadow(0_0_10px_rgb(127_227_255/0.7))]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center" aria-live="polite">
                  <p className="text-[0.95rem] text-white/60">Te recomendamos</p>
                  {recommended ? (
                    <>
                      <p className="type-numeral mt-2 text-[clamp(3.6rem,10vw,5.4rem)] text-glacier">
                        {formatBtu(recommended)}
                      </p>
                      <p className="type-condensed mt-1 text-[1.3rem] text-white/80">BTU</p>
                    </>
                  ) : (
                    <p className="type-display mt-3 max-w-[10ch] text-[2rem] text-glacier">
                      Proyecto a la medida
                    </p>
                  )}
                </div>
              </div>

              <ol className="mt-4 grid grid-cols-7 gap-1.5" aria-label="Capacidades comerciales">
                {STANDARD_SIZES.map((size) => {
                  const active = size === recommended;
                  return (
                    <li
                      key={size}
                      className={`type-condensed rounded-lg py-1.5 text-center text-[0.78rem] transition-colors sm:text-[0.85rem] ${
                        active ? "bg-glacier text-abyss" : "text-white/60"
                      }`}
                    >
                      {size / 1000}k
                    </li>
                  );
                })}
              </ol>

              <p className="mt-6 text-center text-[0.9rem] text-white/65">
                Carga estimada: {formatBtu(raw)} BTU/h. En la visita medimos y confirmamos la
                capacidad antes de cotizar.
              </p>

              <a
                href={whatsappUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ice mt-7 flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 text-center text-[1.05rem] font-semibold"
              >
                <WhatsAppIcon className="size-5 shrink-0" />
                {recommended
                  ? `Cotizar un equipo de ${formatBtu(recommended)} BTU`
                  : "Pedir visita para dimensionar"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
