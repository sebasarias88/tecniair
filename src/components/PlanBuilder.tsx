"use client";

import { useId, useMemo, useState } from "react";
import { MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { ChoiceChips } from "@/components/ChoiceChips";
import { whatsappUrl } from "@/lib/business";

const businessTypes = ["Hotel", "Casino", "Oficina", "Clínica o consultorio", "Restaurante", "Local comercial", "Otro"];

const frequencies = [
  { id: "monthly", label: "Mensual", visits: 12 },
  { id: "bimonthly", label: "Bimestral", visits: 6 },
  { id: "quarterly", label: "Trimestral", visits: 4 },
  { id: "advice", label: "No sé, necesito asesoría", visits: 0 },
] as const;

type FrequencyId = (typeof frequencies)[number]["id"];

const months = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const MAX_UNIT_GLYPHS = 30;

function UnitGlyph() {
  return (
    <svg viewBox="0 0 20 12" className="h-3 w-5 text-brand" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="1" y="1" width="18" height="7" rx="1.6" />
      <path d="M5 11h10" strokeLinecap="round" />
    </svg>
  );
}

/** B2B quote builder: the visitor describes the company and sends a ready-made request. */
export function PlanBuilder() {
  const [type, setType] = useState(businessTypes[0]);
  const [units, setUnits] = useState(10);
  const [frequency, setFrequency] = useState<FrequencyId>("bimonthly");
  const [company, setCompany] = useState("");
  const companyId = useId();

  const freq = frequencies.find((f) => f.id === frequency)!;
  const step = 12 / Math.max(freq.visits, 1);

  const message = useMemo(() => {
    const name = company.trim() ? ` de ${company.trim()}` : "";
    const freqText =
      freq.visits === 0
        ? "Necesito asesoría sobre cada cuánto hacer el mantenimiento."
        : `Me interesa una frecuencia ${freq.label.toLowerCase()} (${freq.visits} visitas al año).`;
    return `Hola Tecniair, quiero cotizar un plan de mantenimiento empresarial${name}. Tipo de negocio: ${type.toLowerCase()}. Tenemos aproximadamente ${units} ${units === 1 ? "equipo" : "equipos"}. ${freqText}`;
  }, [company, freq, type, units]);

  const changeUnits = (delta: number) =>
    setUnits((u) => Math.min(500, Math.max(1, u + delta * (u >= 20 ? 5 : 1))));

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
      <div className="card space-y-8 rounded-[1.75rem] p-6 sm:p-8 lg:col-span-7">
        <ChoiceChips label="Tipo de negocio" options={businessTypes.map((t) => ({ id: t, label: t }))} value={type} onChange={setType} />

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-3 font-semibold" id="units-label">
              Número de equipos
            </p>
            <div className="inline-flex items-center gap-1 rounded-full border border-line-2 bg-white p-1" role="group" aria-labelledby="units-label">
              <button type="button" onClick={() => changeUnits(-1)} aria-label="Menos equipos" className="grid size-11 place-items-center rounded-full transition-colors hover:bg-ice">
                <MinusIcon className="size-5" />
              </button>
              <span className="w-12 text-center text-[1.35rem] font-bold tabular-nums" aria-live="polite">
                {units}
              </span>
              <button type="button" onClick={() => changeUnits(1)} aria-label="Más equipos" className="grid size-11 place-items-center rounded-full transition-colors hover:bg-ice">
                <PlusIcon className="size-5" />
              </button>
            </div>
          </div>
          <div>
            <label htmlFor={companyId} className="mb-3 block font-semibold">
              Empresa <span className="font-normal text-ink-2">(opcional)</span>
            </label>
            <input
              id={companyId}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Nombre del negocio"
              autoComplete="organization"
              className="h-[3.25rem] w-full rounded-2xl border border-line-2 bg-white px-4 outline-none transition-colors placeholder:text-ink-2/70 focus:border-brand"
            />
          </div>
        </div>

        <ChoiceChips
          label="¿Cada cuánto quieres el mantenimiento?"
          options={frequencies.map((f) => ({ id: f.id, label: f.label }))}
          value={frequency}
          onChange={setFrequency}
        />
      </div>

      {/* Live summary: the request the client will send, drawn as a service order */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-night p-6 text-white sm:p-8">
            <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-sky">Tu plan</p>
            <p className="font-display mt-2 text-[1.9rem]">
              {type}
              {company.trim() && <span className="block text-[1.1rem] font-semibold text-night-text">{company.trim()}</span>}
            </p>

            <div className="mt-6 border-t border-dashed border-night-line pt-5">
              <p className="flex items-baseline justify-between text-night-text">
                Equipos
                <span className="font-display text-[1.6rem] text-white tabular-nums">{units}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5" aria-hidden="true">
                {Array.from({ length: Math.min(units, MAX_UNIT_GLYPHS) }, (_, i) => (
                  <span key={i} className="grid h-5 w-7 place-items-center rounded bg-white/95 [animation:enter-up_0.3s_var(--ease-out-expo)_both]">
                    <UnitGlyph />
                  </span>
                ))}
                {units > MAX_UNIT_GLYPHS && (
                  <span className="grid h-5 place-items-center rounded bg-night-2 px-1.5 text-[0.75rem] font-semibold">
                    +{units - MAX_UNIT_GLYPHS}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 border-t border-dashed border-night-line pt-5">
              <p className="flex items-baseline justify-between text-night-text">
                Visitas al año
                <span className="font-display text-[1.6rem] text-white tabular-nums">
                  {freq.visits || "A definir"}
                </span>
              </p>
              <ol className="mt-3 grid grid-cols-12 gap-1" aria-label="Meses con visita">
                {months.map((m, i) => {
                  const on = freq.visits > 0 && i % step === 0;
                  return (
                    <li
                      key={i}
                      className={`grid h-9 place-items-center rounded-md text-[0.78rem] font-semibold transition-colors duration-300 ${
                        on ? "bg-sky text-ink" : "border border-night-line text-night-text"
                      }`}
                    >
                      <span aria-hidden="true">{m}</span>
                      <span className="sr-only">{on ? "con visita" : "sin visita"}</span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <ul className="mt-6 space-y-1.5 border-t border-dashed border-night-line pt-5 text-[0.95rem] text-night-text">
              <li>Hoja de vida e informe de cada equipo</li>
              <li>Prioridad en emergencias, 24 horas</li>
              <li>Horarios que no interrumpen tu negocio</li>
            </ul>

            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa btn-lg mt-7 w-full"
            >
              <WhatsAppIcon className="size-5" />
              Enviar cotización por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
