"use client";

import Image from "next/image";
import { useRef } from "react";
import { ColdAirCanvas } from "@/components/ColdAirCanvas";
import { WhatsAppIcon } from "@/components/icons";
import { business, whatsappUrl } from "@/lib/business";
import { images } from "@/lib/images";

const trustItems = [
  { title: "24 horas", text: "Atención todos los días" },
  { title: "A domicilio", text: "En Armenia y el Quindío" },
  { title: `${business.googleRating} ★ en Google`, text: `${business.googleReviewCount} opiniones` },
  { title: "Garantía", text: "Por escrito" },
];

const heroMessage =
  "Hola Tecniair, vi su página web y quiero agendar una visita para mi aire acondicionado.";

/**
 * The first screen always fits the viewport: sizes scale with both width and
 * height (svh), so short laptops and small phones see the whole hero.
 */
export function Hero() {
  const intensityRef = useRef<number>(0.55);

  return (
    <section
      id="inicio"
      aria-label="Tecniair, aires acondicionados en Armenia"
      className="relative isolate flex h-svh min-h-[36rem] flex-col overflow-hidden"
    >
      <div className="absolute inset-0 -z-20 animate-[enter-scale_1.8s_var(--ease-out-expo)_both] motion-reduce:animate-none">
        <Image
          src={images.heroFans}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgb(5 14 26 / 0.95) 0%, rgb(5 14 26 / 0.75) 45%, rgb(5 14 26 / 0.25) 100%), linear-gradient(0deg, #050e1a 0%, rgb(5 14 26 / 0.4) 30%, transparent 55%), radial-gradient(55% 50% at 85% 15%, rgb(30 107 255 / 0.35), transparent 70%)",
        }}
      />
      <ColdAirCanvas intensityRef={intensityRef} className="absolute inset-0 -z-10 h-full w-full" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-[clamp(1.25rem,4svh,3rem)] pt-24 sm:px-8">
        <h1 className="type-display text-[clamp(3rem,min(14.5vw,17svh),11.5rem)]">
          <span className="mb-[clamp(0.75rem,2.5svh,1.75rem)] flex items-center gap-2.5 text-[clamp(0.95rem,1.4vw,1.15rem)] font-semibold tracking-normal text-white/85 [font-stretch:100%]">
            <span className="size-2 shrink-0 rounded-full bg-glacier [animation:pulse-dot_2s_ease-in-out_infinite]" />
            Aire acondicionado en Armenia y el Quindío
          </span>
          <span className="block">Frío de</span>
          <span className="inline-block bg-gradient-to-r from-frost via-glacier to-electric bg-clip-text pb-[0.08em] pr-[0.12em] text-transparent">
            verdad.
          </span>
        </h1>
        <p className="mt-[clamp(0.75rem,2.5svh,1.75rem)] max-w-[46ch] text-[clamp(1rem,1.3vw,1.2rem)] text-white/80">
          Servicio técnico de aire acondicionado para hogares y empresas: instalación,
          mantenimiento y reparación. Vamos a donde estés y te damos el precio antes de empezar.
        </p>
        <div className="mt-[clamp(1rem,3.5svh,2.25rem)] flex flex-wrap items-center gap-3 animate-[enter-up_0.9s_var(--ease-out-expo)_0.1s_both] motion-reduce:animate-none">
            <a
              href={whatsappUrl(heroMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ice inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[1.05rem] font-semibold"
            >
              <WhatsAppIcon className="size-5" />
              Agendar visita por WhatsApp
            </a>
          <a
            href="#servicios"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-4 font-semibold transition-colors hover:border-white/50"
          >
            Ver servicios
          </a>
        </div>

        <ul className="animate-[enter-up_0.9s_var(--ease-out-expo)_0.2s_both] motion-reduce:animate-none mt-[clamp(1.25rem,5svh,3.5rem)] grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/12 pt-[clamp(1rem,2.5svh,1.5rem)] sm:grid-cols-4">
          {trustItems.map((item) => (
            <li key={item.title} className="leading-tight">
              <span className="block text-[clamp(0.95rem,1.3vw,1.15rem)] font-bold [font-stretch:115%]">
                {item.title}
              </span>
              <span className="mt-0.5 block text-[0.85rem] text-white/65">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
