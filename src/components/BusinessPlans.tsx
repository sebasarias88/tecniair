"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { whatsappUrl } from "@/lib/business";
import { images } from "@/lib/images";

const businessTypes = ["Hotel", "Casino", "Oficina", "Clínica o consultorio", "Restaurante", "Local comercial", "Otro"];
const frequencies = ["Mensual", "Bimestral", "Trimestral", "No sé, necesito asesoría"];

const perks = [
  "Visitas programadas según el uso de tus equipos",
  "Hoja de vida e informe de cada equipo",
  "Prioridad en emergencias, 24 horas",
  "Visitas en horarios que no interrumpen tu negocio",
];

/** B2B quote builder: the visitor describes the company and sends a ready-made request. */
export function BusinessPlans() {
  const [type, setType] = useState(businessTypes[0]);
  const [units, setUnits] = useState(10);
  const [frequency, setFrequency] = useState(frequencies[1]);
  const [company, setCompany] = useState("");
  const companyId = useId();

  const message = useMemo(() => {
    const name = company.trim() ? ` de ${company.trim()}` : "";
    const freq =
      frequency === frequencies[3]
        ? "Necesito asesoría sobre cada cuánto hacer el mantenimiento."
        : `Me interesa una frecuencia ${frequency.toLowerCase()}.`;
    return `Hola Tecniair, quiero cotizar un plan de mantenimiento empresarial${name}. Tipo de negocio: ${type.toLowerCase()}. Tenemos aproximadamente ${units} ${units === 1 ? "equipo" : "equipos"}. ${freq}`;
  }, [company, frequency, type, units]);

  return (
    <section id="empresas" aria-labelledby="plans-title" className="relative isolate overflow-hidden bg-abyss py-24 sm:py-32">
      <div className="absolute inset-0 -z-20 opacity-35">
        <Image src={images.hotelLobby} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #050e1a 0%, rgb(5 14 26 / 0.82) 25%, rgb(5 14 26 / 0.82) 75%, #050e1a 100%), radial-gradient(50% 50% at 20% 50%, rgb(30 107 255 / 0.25), transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div id="plans-title">
            <RevealHeading
              lines={["Planes para", "empresas."]}
              className="type-display text-[clamp(2.8rem,6vw,5.6rem)]"
            />
          </div>
          <p className="mt-6 max-w-[46ch] text-[1.1rem] text-white/75">
            Hoteles, casinos, oficinas y clínicas no pueden quedarse sin aire. Con un plan de
            mantenimiento tus equipos están al día y tú pagas un valor fijo.
          </p>
          <ul className="mt-9 space-y-4">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-4">
                <span aria-hidden="true" className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-glacier text-abyss">
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                </span>
                <span className="text-[1.05rem] text-white/85">{perk}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/servicios/planes-mantenimiento-empresas"
            className="mt-9 inline-flex rounded-full border border-white/25 px-6 py-3.5 font-semibold transition-colors hover:border-white/60"
          >
            Ver cómo funcionan los planes
          </Link>
        </div>

        <div className="lg:col-span-6">
          <div className="glass rounded-[2.25rem] p-6 sm:p-9">
            <p className="text-[1.35rem] font-bold [font-stretch:115%]">Arma tu cotización</p>

            <fieldset className="mt-7">
              <legend className="mb-3 font-semibold">Tipo de negocio</legend>
              <div role="radiogroup" className="flex flex-wrap gap-2">
                {businessTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={type === t}
                    onClick={() => setType(t)}
                    className={`rounded-full border px-4 py-2.5 text-[0.95rem] transition-all ${
                      type === t
                        ? "glow-ring border-glacier bg-glacier text-abyss"
                        : "border-white/15 bg-white/[0.04] text-white/85 hover:border-white/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-7 grid gap-7 sm:grid-cols-2">
              <div>
                <p className="mb-3 font-semibold" id="units-label">
                  Número de equipos
                </p>
                <div
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1"
                  role="group"
                  aria-labelledby="units-label"
                >
                  <button
                    type="button"
                    onClick={() => setUnits((u) => Math.max(1, u - (u > 20 ? 5 : 1)))}
                    aria-label="Menos equipos"
                    className="grid size-11 place-items-center rounded-full transition-colors hover:bg-white/10"
                  >
                    <MinusIcon className="size-5" />
                  </button>
                  <span className="type-condensed w-12 text-center text-[1.4rem]" aria-live="polite">
                    {units}
                  </span>
                  <button
                    type="button"
                    onClick={() => setUnits((u) => Math.min(500, u + (u >= 20 ? 5 : 1)))}
                    aria-label="Más equipos"
                    className="grid size-11 place-items-center rounded-full transition-colors hover:bg-white/10"
                  >
                    <PlusIcon className="size-5" />
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor={companyId} className="mb-3 block font-semibold">
                  Empresa <span className="font-normal text-white/60">(opcional)</span>
                </label>
                <input
                  id={companyId}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Nombre del negocio"
                  autoComplete="organization"
                  className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 outline-none transition-colors placeholder:text-white/40 focus:border-glacier"
                />
              </div>
            </div>

            <fieldset className="mt-7">
              <legend className="mb-3 font-semibold">Frecuencia</legend>
              <div role="radiogroup" className="flex flex-wrap gap-2">
                {frequencies.map((f) => (
                  <button
                    key={f}
                    type="button"
                    role="radio"
                    aria-checked={frequency === f}
                    onClick={() => setFrequency(f)}
                    className={`rounded-full border px-4 py-2.5 text-[0.95rem] transition-all ${
                      frequency === f
                        ? "glow-ring border-glacier bg-glacier text-abyss"
                        : "border-white/15 bg-white/[0.04] text-white/85 hover:border-white/40"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </fieldset>

            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ice mt-9 flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 text-[1.05rem] font-semibold"
            >
              <WhatsAppIcon className="size-5" />
              Cotizar plan por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
