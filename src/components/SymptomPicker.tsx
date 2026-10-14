"use client";

import { useId, useMemo, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { RevealHeading } from "@/components/motion/RevealHeading";
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
          ? "glow-ring border-glacier bg-glacier text-abyss"
          : "border-white/15 bg-white/[0.04] text-white/85 hover:border-white/40"
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
    <section id="diagnostico" className="relative isolate overflow-hidden bg-abyss py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 45% at 85% 30%, rgb(30 107 255 / 0.22), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgb(127 227 255 / 0.1), transparent 70%)",
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <RevealHeading
            lines={["¿Qué le pasa", "a tu aire?"]}
            className="type-display text-[clamp(2.8rem,6vw,5.6rem)]"
          />
          <p className="mt-6 max-w-[52ch] text-white/65">
            Marca lo que ves y te armamos el mensaje. Lo envías por WhatsApp y el técnico llega
            sabiendo qué revisar.
          </p>

          <div className="mt-12 space-y-9">
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
                  <span className="font-normal text-white/50">Puedes marcar varias.</span>
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
                  className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3.5 outline-none transition-colors placeholder:text-white/35 focus:border-glacier"
                />
              </div>
              <div>
                <label htmlFor={nameId} className="mb-2 block font-semibold">
                  Tu nombre <span className="font-normal text-white/50">(opcional)</span>
                </label>
                <input
                  id={nameId}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Laura"
                  autoComplete="given-name"
                  className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3.5 outline-none transition-colors placeholder:text-white/35 focus:border-glacier"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            {/* Phone mockup with the live WhatsApp message */}
            <div className="relative mx-auto max-w-[24rem] rounded-[2.75rem] bg-gradient-to-b from-white/25 to-white/5 p-[2px] shadow-[0_40px_90px_-30px_rgb(30_107_255/0.6)]">
              <div className="overflow-hidden rounded-[2.65rem] bg-[#0b141a]">
                <div className="mx-auto mt-3 h-6 w-28 rounded-full bg-black" aria-hidden="true" />
                <div className="flex items-center gap-3 bg-[#1f2c34] px-5 py-3.5 mt-3">
                  <span className="grid size-10 place-items-center rounded-full bg-glacier font-bold text-abyss [font-stretch:115%]">
                    T
                  </span>
                  <div className="leading-tight">
                    <p className="font-semibold">Tecniair</p>
                    <p className="text-[0.8rem] text-white/55">en línea</p>
                  </div>
                </div>
                <div
                  className="min-h-[19rem] px-4 py-6"
                  style={{
                    backgroundColor: "#0b141a",
                    backgroundImage:
                      "radial-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                >
                  <p className="type-condensed mx-auto mb-5 w-max rounded-lg bg-[#1f2c34] px-3 py-1 text-[0.78rem] text-white/60">
                    Así va a quedar tu mensaje
                  </p>
                  <div
                    aria-live="polite"
                    className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-[#005c4b] px-4 py-3 text-[0.98rem] leading-relaxed text-white shadow-lg"
                  >
                    {message}
                    <span className="mt-1 block text-right text-[0.72rem] text-white/55">ahora ✓✓</span>
                  </div>
                </div>
              </div>
            </div>
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ice mx-auto mt-7 flex w-full max-w-[24rem] items-center justify-center gap-2.5 rounded-full px-6 py-4 text-[1.05rem] font-semibold"
            >
              <WhatsAppIcon className="size-5" />
              Enviar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
