"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ColdAirCanvas } from "@/components/ColdAirCanvas";
import { FanIcon, MinusIcon, PlusIcon, PowerIcon, SnowflakeIcon, WhatsAppIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { whatsappUrl } from "@/lib/business";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { images } from "@/lib/images";

const MIN_TEMP = 16;
const MAX_TEMP = 30;

const trustItems = [
  "Atención 24 horas",
  "Servicio a domicilio",
  "Presupuesto antes de empezar",
  "Garantía por escrito",
  "Armenia y el Quindío",
];

const heroMessage =
  "Hola Tecniair, vi su página web y quiero agendar una visita para mi aire acondicionado.";

function fanLabel(temp: number) {
  if (temp <= 19) return "Alto";
  if (temp <= 24) return "Medio";
  return "Bajo";
}

function RemoteWidget({ intensityRef }: { intensityRef: React.RefObject<number> }) {
  const [temp, setTemp] = useState(18);

  const change = (delta: number) => {
    setTemp((current) => {
      const next = Math.min(MAX_TEMP, Math.max(MIN_TEMP, current + delta));
      intensityRef.current = (MAX_TEMP - next) / (MAX_TEMP - MIN_TEMP);
      return next;
    });
  };

  const intensity = (MAX_TEMP - temp) / (MAX_TEMP - MIN_TEMP);
  const fanSeconds = (1.6 - intensity * 1.3).toFixed(2);

  return (
    <div className="hero-widget glass relative w-full max-w-sm overflow-hidden rounded-[2rem] p-6 sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-glacier/25 blur-3xl transition-opacity duration-700"
        style={{ opacity: 0.3 + intensity * 0.7 }}
      />
      <div className="relative flex items-center justify-between">
        <p className="text-[0.95rem] text-white/70">Control de tu espacio</p>
        <span className="grid size-9 place-items-center rounded-full bg-glacier text-abyss shadow-[0_0_24px_rgb(127_227_255/0.8)]">
          <PowerIcon className="size-4" />
        </span>
      </div>

      <p className="relative mt-5 flex items-start" aria-live="polite">
        <span className="type-numeral text-[6.5rem] text-glacier">{temp}</span>
        <span className="type-condensed mt-2 text-[1.6rem] text-white/70">°C</span>
        <span className="sr-only">grados</span>
      </p>

      <div className="relative mt-5 grid grid-cols-2 gap-3 text-[0.92rem]">
        <div className="rounded-2xl bg-white/5 px-4 py-3">
          <p className="text-white/55">Modo</p>
          <p className="mt-1 flex items-center gap-2 font-semibold">
            <SnowflakeIcon className="size-4 text-glacier" /> Frío
          </p>
        </div>
        <div className="rounded-2xl bg-white/5 px-4 py-3">
          <p className="text-white/55">Ventilador</p>
          <p className="mt-1 flex items-center gap-2 font-semibold">
            <FanIcon
              className="size-4 text-glacier"
              style={{ animation: `spin ${fanSeconds}s linear infinite` }}
            />
            {fanLabel(temp)}
          </p>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-4">
        <p className="max-w-[16ch] text-[0.9rem] leading-snug text-white/60">
          Bájale y mira cómo cambia el aire.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => change(-1)}
            disabled={temp <= MIN_TEMP}
            aria-label="Bajar temperatura"
            className="grid size-12 place-items-center rounded-full bg-white/10 transition-colors hover:bg-glacier hover:text-abyss disabled:opacity-40"
          >
            <MinusIcon className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => change(1)}
            disabled={temp >= MAX_TEMP}
            aria-label="Subir temperatura"
            className="grid size-12 place-items-center rounded-full bg-white/10 transition-colors hover:bg-heat hover:text-abyss disabled:opacity-40"
          >
            <PlusIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const intensityRef = useRef<number>((MAX_TEMP - 18) / (MAX_TEMP - MIN_TEMP));

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion() || !contextSafe) return;

      const root = ref.current;
      if (!root) return;
      const media = root.querySelectorAll(".hero-media");
      const lines = root.querySelectorAll(".hero-line > span");
      const fades = root.querySelectorAll(".hero-fade");
      const widget = root.querySelectorAll(".hero-widget");

      gsap.set([fades, widget], { autoAlpha: 0, y: 30 });
      gsap.set(lines, { yPercent: 110 });
      gsap.set(media, { scale: 1.25 });

      const play = contextSafe(() => {
        const tl = gsap.timeline();
        tl.to(media, { scale: 1.08, duration: 2.2, ease: "expo.out" })
          .to(lines, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.1 }, 0.1)
          .to(fades, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.45)
          .to(widget, { autoAlpha: 1, y: 0, duration: 1.2, ease: "expo.out" }, 0.6);
      });

      const w = window as Window & { __tecniairIntroDone?: boolean };
      if (w.__tecniairIntroDone) play();
      else window.addEventListener("tecniair:intro-done", play, { once: true });

      // Parallax as the hero leaves
      gsap.to(".hero-media", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        yPercent: -12,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "center center", end: "bottom top", scrub: true },
      });

      return () => window.removeEventListener("tecniair:intro-done", play);
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="inicio"
      aria-label="Tecniair, aires acondicionados en Armenia"
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <div className="hero-media absolute inset-0 -z-20">
        <Image
          src={images.heroFans}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgb(5 14 26 / 0.96) 0%, rgb(5 14 26 / 0.78) 45%, rgb(5 14 26 / 0.35) 100%), linear-gradient(0deg, #050e1a 0%, transparent 35%), radial-gradient(60% 50% at 85% 20%, rgb(30 107 255 / 0.35), transparent 70%)",
        }}
      />
      <ColdAirCanvas intensityRef={intensityRef} className="absolute inset-0 -z-10 h-full w-full" />

      <div className="hero-content mx-auto grid w-full max-w-7xl flex-1 items-end gap-10 px-4 pb-10 pt-32 sm:px-8 lg:grid-cols-12 lg:pb-16">
        <div className="lg:col-span-8">
          <p className="hero-fade mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.92rem] text-white/80 backdrop-blur">
            <span className="size-2 rounded-full bg-glacier [animation:pulse-dot_2s_ease-in-out_infinite]" />
            Técnicos disponibles hoy en Armenia
          </p>
          <h1
            className="type-display text-[clamp(4rem,12vw,11rem)]"
            aria-label="Frío de verdad."
          >
            <span className="hero-line line-mask" aria-hidden="true">
              <span>Frío de</span>
            </span>
            <span className="hero-line line-mask" aria-hidden="true">
              <span className="!inline-block bg-gradient-to-r from-frost via-glacier to-electric bg-clip-text pb-[0.08em] pr-[0.12em] text-transparent">
                verdad.
              </span>
            </span>
          </h1>
          <p className="hero-fade mt-7 max-w-[50ch] text-[1.08rem] text-white/75 sm:text-[1.2rem]">
            Instalamos, reparamos y hacemos mantenimiento a aires acondicionados en Armenia,
            Quindío. Vamos a tu casa o negocio y te damos el precio antes de empezar.
          </p>
          <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
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
              href="#calculadora"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-4 font-semibold backdrop-blur transition-colors hover:border-white/50"
            >
              Calcular qué aire necesito
            </a>
          </div>
        </div>
        <div className="flex lg:col-span-4 lg:justify-end">
          <RemoteWidget intensityRef={intensityRef} />
        </div>
      </div>

      <div className="hero-fade relative border-y border-white/10 bg-abyss/60 py-4 backdrop-blur">
        <div className="flex w-max animate-[ticker_38s_linear_infinite] gap-10 pr-10">
          {[...trustItems, ...trustItems, ...trustItems, ...trustItems].map((item, i) => (
            <span
              key={i}
              className="type-condensed flex items-center gap-10 whitespace-nowrap text-[1.05rem] text-white/70"
              aria-hidden={i >= trustItems.length}
            >
              {item}
              <SnowflakeIcon className="size-4 text-glacier" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
