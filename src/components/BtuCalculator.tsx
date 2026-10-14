"use client";

import { useId, useMemo, useState } from "react";
import { MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
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
      <legend className="mb-3 font-semibold text-white">{label}</legend>
      <div role="radiogroup" className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={value === o.id}
            onClick={() => onChange(o.id)}
            className={`rounded-full border px-4 py-2.5 text-[0.98rem] transition-colors ${
              value === o.id
                ? "border-ice bg-ice text-ink"
                : "border-white/20 text-white/85 hover:border-white/50"
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

  const { recommended, raw } = useMemo(() => {
    const sunFactor = sunOptions.find((s) => s.id === sun)!.factor;
    const useFactor = useOptions.find((u) => u.id === use)!.factor;
    const load =
      area * BTU_PER_M2 * sunFactor * useFactor + Math.max(0, people - 2) * BTU_PER_EXTRA_PERSON;
    const size = STANDARD_SIZES.find((s) => s >= load) ?? null;
    return { recommended: size, raw: Math.round(load) };
  }, [area, people, sun, use]);

  const sunPhrase = sunOptions.find((s) => s.id === sun)!.phrase;
  const usePhrase = useOptions.find((u) => u.id === use)!.phrase;
  const message = recommended
    ? `Hola Tecniair. Usé la calculadora de su página: ${usePhrase} de ${area} m², ${sunPhrase} y ${people} ${people === 1 ? "persona" : "personas"}. Me salió un equipo de ${formatBtu(recommended)} BTU. ¿Me pueden cotizar el equipo con instalación?`
    : `Hola Tecniair. Necesito climatizar ${usePhrase} de ${area} m², ${sunPhrase} y ${people} personas. ¿Me pueden hacer una visita para dimensionar el proyecto?`;

  const fill = `${((area - 6) / (120 - 6)) * 100}%`;

  return (
    <section id="calculadora" className="scroll-mt-6 bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="type-display text-[clamp(2rem,4.5vw,3.4rem)]">
            ¿Qué aire necesita tu espacio?
          </h2>
          <p className="mt-4 max-w-[52ch] text-white/70">
            Un equipo pequeño trabaja forzado y uno grande gasta de más. Calcula la capacidad en
            BTU y pide la cotización con el número exacto.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-9 lg:col-span-6">
            <div>
              <div className="mb-1 flex items-baseline justify-between">
                <label htmlFor={areaId} className="font-semibold">
                  Tamaño del espacio
                </label>
                <span className="type-condensed text-[1.25rem] text-ice-soft">{area} m²</span>
              </div>
              <input
                id={areaId}
                type="range"
                min={6}
                max={120}
                step={1}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="range range-on-dark"
                style={{ ["--fill" as string]: fill }}
              />
              <p className="text-[0.9rem] text-white/50">
                Un cuarto típico mide entre 9 y 16 m². Largo por ancho.
              </p>
            </div>

            <Segmented label="¿Para qué es?" value={use} options={useOptions} onChange={setUse} />
            <Segmented
              label="¿Cuánto sol le entra?"
              value={sun}
              options={sunOptions}
              onChange={setSun}
            />

            <div>
              <p className="mb-3 font-semibold" id="people-label">
                Personas que suelen estar ahí
              </p>
              <div className="inline-flex items-center gap-1 rounded-full border border-white/20 p-1" role="group" aria-labelledby="people-label">
                <button
                  type="button"
                  onClick={() => setPeople((p) => Math.max(1, p - 1))}
                  aria-label="Quitar una persona"
                  className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/10"
                >
                  <MinusIcon className="size-5" />
                </button>
                <span className="type-condensed w-10 text-center text-[1.25rem]" aria-live="polite">
                  {people}
                </span>
                <button
                  type="button"
                  onClick={() => setPeople((p) => Math.min(30, p + 1))}
                  aria-label="Agregar una persona"
                  className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/10"
                >
                  <PlusIcon className="size-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-ink-soft to-ink p-7 ring-1 ring-white/10 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-ice/20 blur-3xl"
              />
              <p className="relative text-white/70">Te recomendamos un equipo de</p>
              <p className="relative mt-3 flex flex-wrap items-baseline gap-x-3" aria-live="polite">
                {recommended ? (
                  <>
                    <span className="type-numeral text-[clamp(4.5rem,13vw,8rem)] text-ice-soft">
                      {formatBtu(recommended)}
                    </span>
                    <span className="type-condensed text-[1.5rem] text-white/80">BTU</span>
                  </>
                ) : (
                  <span className="type-display text-[clamp(2rem,5vw,3rem)] text-ice-soft">
                    Proyecto a la medida
                  </span>
                )}
              </p>

              <ol className="relative mt-8 grid grid-cols-7 gap-1.5" aria-label="Capacidades comerciales">
                {STANDARD_SIZES.map((size) => {
                  const active = size === recommended;
                  return (
                    <li key={size} className="flex flex-col items-center gap-2">
                      <span
                        className={`h-2 w-full rounded-full transition-colors ${
                          active ? "bg-ice" : recommended && size < recommended ? "bg-white/35" : "bg-white/10"
                        }`}
                      />
                      <span
                        className={`type-condensed text-[0.72rem] sm:text-[0.8rem] ${active ? "text-ice" : "text-white/40"}`}
                      >
                        {size / 1000}k
                      </span>
                    </li>
                  );
                })}
              </ol>

              <p className="relative mt-6 text-[0.92rem] text-white/55">
                Carga estimada: {formatBtu(raw)} BTU/h. Es una guía; en la visita medimos el
                espacio y confirmamos la capacidad antes de cotizar.
              </p>

              <a
                href={whatsappUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-ice px-6 py-4 text-center font-semibold text-ink transition-transform hover:-translate-y-0.5"
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
