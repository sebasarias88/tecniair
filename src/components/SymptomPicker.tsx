"use client";

import { useId, useMemo, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappUrl } from "@/lib/business";

type Need = "repair" | "install" | "maintenance";
type Place = "home" | "office" | "shop";

const needs: { id: Need; label: string }[] = [
  { id: "repair", label: "Reparar mi aire" },
  { id: "install", label: "Instalar un aire nuevo" },
  { id: "maintenance", label: "Mantenimiento" },
];

const symptoms = [
  { id: "notCooling", label: "No enfría", phrase: "no está enfriando" },
  { id: "leaking", label: "Gotea agua", phrase: "está goteando agua" },
  { id: "noise", label: "Hace ruido", phrase: "hace ruido" },
  { id: "smell", label: "Huele mal", phrase: "tiene mal olor" },
  { id: "noPower", label: "No prende", phrase: "no prende" },
  { id: "shutsOff", label: "Se apaga solo", phrase: "se apaga solo" },
] as const;

type SymptomId = (typeof symptoms)[number]["id"];

const places: { id: Place; label: string; phrase: string }[] = [
  { id: "home", label: "Casa o apartamento", phrase: "una casa o apartamento" },
  { id: "office", label: "Oficina", phrase: "una oficina" },
  { id: "shop", label: "Local comercial", phrase: "un local comercial" },
];

function joinSpanish(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

function buildMessage(
  need: Need,
  selected: SymptomId[],
  place: Place,
  area: string,
  name: string,
): string {
  const greeting = name.trim() ? `Hola Tecniair, soy ${name.trim()}.` : "Hola Tecniair.";
  const placePhrase = places.find((p) => p.id === place)?.phrase ?? "";
  const where = area.trim() ? `${placePhrase} en ${area.trim()}` : placePhrase;

  let body: string;
  if (need === "repair") {
    const phrases = symptoms.filter((s) => selected.includes(s.id)).map((s) => s.phrase);
    body = phrases.length
      ? `Mi aire acondicionado ${joinSpanish(phrases)}. Está en ${where}.`
      : `Mi aire acondicionado tiene una falla y necesito un diagnóstico. Está en ${where}.`;
  } else if (need === "install") {
    body = `Quiero instalar un aire acondicionado en ${where}.`;
  } else {
    body = `Quiero programar un mantenimiento para mi aire acondicionado en ${where}.`;
  }

  return `${greeting} ${body} ¿Me pueden agendar una visita técnica?`;
}

function Chip({
  active,
  onClick,
  children,
  role = "radio",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  role?: "radio" | "checkbox";
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2.5 text-[0.98rem] transition-colors ${
        active
          ? "border-ink bg-ink text-white"
          : "border-ink/15 bg-white text-ink hover:border-ink/40"
      }`}
    >
      {children}
    </button>
  );
}

export function SymptomPicker() {
  const [need, setNeed] = useState<Need>("repair");
  const [selected, setSelected] = useState<SymptomId[]>(["notCooling"]);
  const [place, setPlace] = useState<Place>("home");
  const [area, setArea] = useState("");
  const [name, setName] = useState("");
  const areaId = useId();
  const nameId = useId();

  const message = useMemo(
    () => buildMessage(need, selected, place, area, name),
    [need, selected, place, area, name],
  );

  const toggleSymptom = (id: SymptomId) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  return (
    <section id="diagnostico" className="scroll-mt-6 bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="type-display max-w-[18ch] text-[clamp(2rem,4.5vw,3.4rem)]">
            Cuéntanos qué le pasa a tu aire.
          </h2>
          <p className="mt-4 max-w-[52ch] text-slate">
            Marca lo que ves y te armamos el mensaje. Lo envías por WhatsApp y el técnico llega
            sabiendo qué revisar.
          </p>

          <div className="mt-10 space-y-8">
            <fieldset>
              <legend className="mb-3 font-semibold">¿Qué necesitas?</legend>
              <div role="radiogroup" className="flex flex-wrap gap-2">
                {needs.map((n) => (
                  <Chip key={n.id} active={need === n.id} onClick={() => setNeed(n.id)}>
                    {n.label}
                  </Chip>
                ))}
              </div>
            </fieldset>

            {need === "repair" && (
              <fieldset>
                <legend className="mb-3 font-semibold">
                  ¿Qué está pasando?{" "}
                  <span className="font-normal text-slate">Puedes marcar varias.</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((s) => (
                    <Chip
                      key={s.id}
                      role="checkbox"
                      active={selected.includes(s.id)}
                      onClick={() => toggleSymptom(s.id)}
                    >
                      {s.label}
                    </Chip>
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset>
              <legend className="mb-3 font-semibold">¿Dónde está el aire?</legend>
              <div role="radiogroup" className="flex flex-wrap gap-2">
                {places.map((p) => (
                  <Chip key={p.id} active={place === p.id} onClick={() => setPlace(p.id)}>
                    {p.label}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={areaId} className="mb-2 block font-semibold">
                  Barrio o municipio
                </label>
                <input
                  id={areaId}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Ej. La Castellana, Armenia"
                  autoComplete="address-level3"
                  className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none transition-colors placeholder:text-slate/60 focus:border-ink"
                />
              </div>
              <div>
                <label htmlFor={nameId} className="mb-2 block font-semibold">
                  Tu nombre <span className="font-normal text-slate">(opcional)</span>
                </label>
                <input
                  id={nameId}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Laura"
                  autoComplete="given-name"
                  className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none transition-colors placeholder:text-slate/60 focus:border-ink"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-10">
            <div className="overflow-hidden rounded-[1.75rem] bg-[#ECE5DD] shadow-[0_30px_60px_-30px_rgb(12_34_56/0.45)] ring-1 ring-ink/10">
              <div className="flex items-center gap-3 bg-ink px-5 py-4 text-white">
                <span className="grid size-10 place-items-center rounded-full bg-ice text-ink [font-stretch:115%] font-bold">
                  T
                </span>
                <div className="leading-tight">
                  <p className="font-semibold">Tecniair</p>
                  <p className="text-[0.82rem] text-white/60">Responde por WhatsApp</p>
                </div>
              </div>
              <div className="min-h-[15rem] px-4 py-6">
                <p className="type-condensed mb-4 text-center text-[0.8rem] text-ink/50">
                  Así va a quedar tu mensaje
                </p>
                <div
                  aria-live="polite"
                  className="ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-[#D9FDD3] px-4 py-3 text-[0.98rem] leading-relaxed text-ink shadow-sm"
                >
                  {message}
                </div>
              </div>
            </div>
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-4 font-semibold text-white transition-colors hover:bg-royal"
            >
              <WhatsAppIcon className="size-5 text-ice" />
              Enviar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
