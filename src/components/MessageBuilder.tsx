"use client";

import { useId, useMemo, useState } from "react";
import { ChoiceChips } from "@/components/ChoiceChips";
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

function buildMessage(need: Need, selected: SymptomId[], place: Place, area: string, name: string): string {
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

const inputClass =
  "h-[3.25rem] w-full rounded-2xl border border-line-2 bg-white px-4 outline-none transition-colors placeholder:text-ink-2/70 focus:border-brand";

/** The visitor marks what is happening and gets a ready WhatsApp message, previewed live. */
export function MessageBuilder() {
  const [need, setNeed] = useState<Need>("repair");
  const [selected, setSelected] = useState<SymptomId[]>(["notCooling"]);
  const [place, setPlace] = useState<Place>("home");
  const [area, setArea] = useState("");
  const [name, setName] = useState("");
  const areaId = useId();
  const nameId = useId();

  const message = useMemo(() => buildMessage(need, selected, place, area, name), [need, selected, place, area, name]);

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
      <div className="card space-y-8 rounded-[1.75rem] p-6 sm:p-8 lg:col-span-7">
        <ChoiceChips label="¿Qué necesitas?" options={needs} value={need} onChange={setNeed} />
        {need === "repair" && (
          <ChoiceChips
            label="¿Qué está pasando?"
            hint="Puedes marcar varias."
            options={symptoms.map((s) => ({ id: s.id, label: s.label }))}
            value={selected}
            onChange={setSelected}
            multiple
          />
        )}
        <ChoiceChips label="¿Dónde está el aire?" options={places} value={place} onChange={setPlace} />
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
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={nameId} className="mb-2 block font-semibold">
              Tu nombre <span className="font-normal text-ink-2">(opcional)</span>
            </label>
            <input
              id={nameId}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Laura"
              autoComplete="given-name"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* WhatsApp-style preview of the message */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[1.75rem] border border-line bg-[#efeae2]">
            <div className="flex items-center gap-3 bg-[#075e54] px-5 py-3.5 text-white">
              <span className="font-display grid size-10 place-items-center rounded-full bg-white text-[1.1rem] text-[#075e54]">T</span>
              <span className="leading-tight">
                <span className="block font-semibold">Tecniair</span>
                <span className="text-[0.82rem] text-white/80">Responde en minutos</span>
              </span>
            </div>
            <div className="min-h-[15rem] px-4 py-6">
              <p className="mx-auto mb-5 w-max rounded-lg bg-white/80 px-3 py-1 text-[0.8rem] text-ink-2">Así va a quedar tu mensaje</p>
              <div
                aria-live="polite"
                className="ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-[#d9fdd3] px-4 py-3 text-[0.98rem] leading-relaxed text-ink shadow-sm"
              >
                {message}
                <span className="mt-1 block text-right text-[0.72rem] text-ink-2">ahora ✓✓</span>
              </div>
            </div>
          </div>
          <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg mt-4 w-full">
            <WhatsAppIcon className="size-5" />
            Enviar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
