"use client";

import Image from "next/image";
import { useRef } from "react";
import { ColdAirCanvas } from "@/components/ColdAirCanvas";
import { WhatsAppIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { whatsappUrl } from "@/lib/business";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { images } from "@/lib/images";

const trustItems = [
  { title: "24 horas", text: "Atención todos los días" },
  { title: "A domicilio", text: "En Armenia y el Quindío" },
  { title: "Precio primero", text: "Antes de empezar" },
  { title: "Garantía", text: "Por escrito" },
];

const heroMessage =
  "Hola Tecniair, vi su página web y quiero agendar una visita para mi aire acondicionado.";

/**
 * The first screen always fits the viewport: sizes scale with both width and
 * height (svh), so short laptops and small phones see the whole hero.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const intensityRef = useRef<number>(0.55);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = ref.current;
      if (!root) return;

      // The headline is never hidden, so the largest paint happens right away.
      gsap.from(root.querySelectorAll(".hero-media"), { scale: 1.15, duration: 1.8, ease: "expo.out" });
      gsap.from(root.querySelectorAll(".hero-fade"), {
        autoAlpha: 0,
        y: 20,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.1,
      });

      // Parallax as the hero leaves
      gsap.to(root.querySelectorAll(".hero-media"), {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(root.querySelectorAll(".hero-content"), {
        yPercent: -10,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root, start: "center center", end: "bottom top", scrub: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="inicio"
      aria-label="Tecniair, aires acondicionados en Armenia"
      className="relative isolate flex h-svh min-h-[36rem] flex-col overflow-hidden"
    >
      <div className="hero-media absolute inset-0 -z-20">
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

      <div className="hero-content mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-[clamp(1.25rem,4svh,3rem)] pt-24 sm:px-8">
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
          Instalación, mantenimiento y reparación para hogares y empresas. Vamos a donde estés y
          te damos el precio antes de empezar.
        </p>
        <div className="hero-fade mt-[clamp(1rem,3.5svh,2.25rem)] flex flex-wrap items-center gap-3">
          <Magnetic>
            <a
              href={whatsappUrl(heroMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ice inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[1.05rem] font-semibold"
            >
              <WhatsAppIcon className="size-5" />
              Agendar visita por WhatsApp
            </a>
          </Magnetic>
          <a
            href="#servicios"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-4 font-semibold backdrop-blur transition-colors hover:border-white/50"
          >
            Ver servicios
          </a>
        </div>

        <ul className="hero-fade mt-[clamp(1.25rem,5svh,3.5rem)] grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/12 pt-[clamp(1rem,2.5svh,1.5rem)] sm:grid-cols-4">
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
