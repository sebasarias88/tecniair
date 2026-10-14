"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { business, whatsappUrl } from "@/lib/business";

const START_TEMP = 31;
const END_TEMP = 18;
const SCALE_MIN = 16;
const SCALE_MAX = 32;

type Stage = "hot" | "cooling" | "cool";

const stageCopy: Record<Stage, string> = {
  hot: "Armenia, 2:00 p. m. El aire no enfría.",
  cooling: "Técnico en camino. Bajando la temperatura.",
  cool: "Listo. Fresco siempre.",
};

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#preguntas", label: "Preguntas" },
];

const heroMessage =
  "Hola Tecniair, vi su página web y quiero agendar una visita para mi aire acondicionado.";

export function CoolingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [stage, setStage] = useState<Stage>("hot");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(scrollable, 1)));
      // Ease-out so the drop feels like a compressor kicking in.
      const eased = 1 - Math.pow(1 - progress, 2);
      const temp = START_TEMP - (START_TEMP - END_TEMP) * eased;

      section.style.setProperty("--cool", eased.toFixed(3));
      section.style.setProperty("--heat", (1 - eased).toFixed(3));
      section.style.setProperty(
        "--marker",
        `${(((temp - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100).toFixed(2)}%`,
      );

      if (numberRef.current) {
        numberRef.current.textContent = String(Math.round(temp));
      }

      setStage(eased < 0.12 ? "hot" : eased > 0.92 ? "cool" : "cooling");
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Tecniair, aires acondicionados en Armenia"
      className="relative h-[230svh] bg-ink text-white [--cool:0] [--heat:1] [--marker:93.75%]"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        {/* Heat haze */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[var(--heat)]"
          style={{
            background:
              "radial-gradient(70% 60% at 85% 10%, rgb(242 165 65 / 0.55), transparent 65%), radial-gradient(60% 50% at 10% 100%, rgb(184 115 51 / 0.35), transparent 70%)",
          }}
        />
        {/* Cold air */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[var(--cool)]"
          style={{
            background:
              "radial-gradient(75% 60% at 80% 0%, rgb(52 195 232 / 0.45), transparent 65%), radial-gradient(60% 55% at 0% 100%, rgb(10 92 176 / 0.6), transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="frost-edge pointer-events-none absolute inset-0 opacity-[calc(var(--cool)*0.55)]"
        />

        <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 pt-5 sm:px-8 sm:pt-7">
          <a href="#inicio" aria-label="Tecniair, ir al inicio">
            <Logo tone="light" />
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.95rem] text-white/75 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${business.phoneE164}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-[0.95rem] transition-colors hover:border-white/60"
            >
              <PhoneIcon className="size-4" />
              {business.phoneDisplay}
            </a>
          </nav>
        </header>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 content-center gap-8 px-4 pb-24 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pb-16">
          <div className="lg:col-span-5 lg:self-center">
            <p
              aria-live="polite"
              className="type-condensed mb-5 flex items-center gap-2 text-[0.95rem] text-white/70"
            >
              <span
                aria-hidden="true"
                className="inline-block size-2 rounded-full transition-colors duration-500"
                style={{
                  background:
                    stage === "hot"
                      ? "var(--color-heat)"
                      : stage === "cool"
                        ? "var(--color-ice)"
                        : "white",
                }}
              />
              {stageCopy[stage]}
            </p>
            <h1 className="type-display max-w-[14ch] text-[clamp(2.4rem,6.2vw,4.6rem)]">
              Que el calor se quede afuera.
            </h1>
            <p className="mt-5 max-w-[46ch] text-[1.05rem] text-white/75 sm:text-[1.15rem]">
              Instalamos, reparamos y hacemos mantenimiento a aires acondicionados en Armenia.
              Nos escribes, vamos a tu casa o negocio y te damos el presupuesto antes de empezar.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl(heroMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-ice px-6 py-3.5 font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="size-5" />
                Agendar visita por WhatsApp
              </a>
              <a
                href="#diagnostico"
                className="inline-flex items-center px-2 py-3.5 text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                ¿Qué le pasa a tu aire?
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:self-center lg:pl-10">
            <div className="relative" aria-hidden="true">
              <div
                className="type-numeral flex items-start text-[clamp(8.5rem,30vw,21rem)]"
                style={{
                  color:
                    "color-mix(in oklab, var(--color-heat) calc(var(--heat) * 100%), var(--color-ice-soft))",
                }}
              >
                <span ref={numberRef}>{START_TEMP}</span>
                <span className="mt-[0.06em] text-[0.42em] font-light">°C</span>
              </div>

              <div className="relative mt-6 max-w-xl">
                <div className="flex h-6 items-end justify-between">
                  {Array.from({ length: SCALE_MAX - SCALE_MIN + 1 }, (_, i) => {
                    const value = SCALE_MIN + i;
                    const major = value % 4 === 0;
                    return (
                      <span
                        key={value}
                        className={`w-px bg-white ${major ? "h-6 opacity-60" : "h-3 opacity-25"}`}
                      />
                    );
                  })}
                </div>
                <div className="type-condensed mt-2 flex justify-between text-[0.8rem] text-white/50">
                  <span>16°</span>
                  <span>20°</span>
                  <span>24°</span>
                  <span>28°</span>
                  <span>32°</span>
                </div>
                <span
                  className="absolute -top-2 h-10 w-[3px] -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgb(255_255_255/0.7)]"
                  style={{ left: "var(--marker)" }}
                />
              </div>
            </div>
            <p className="sr-only">
              Una animación muestra la temperatura bajando de 31 a 18 grados mientras te desplazas.
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="type-condensed absolute inset-x-0 bottom-[calc(var(--dock-h)+1.25rem)] z-10 mx-auto flex w-max items-center gap-3 text-[0.9rem] text-white/60 opacity-[var(--heat)]"
        >
          <span className="relative block h-8 w-px overflow-hidden bg-white/20">
            <span className="absolute inset-x-0 top-0 h-3 animate-[drip_1.8s_ease-in-out_infinite] bg-white" />
          </span>
          Baja para enfriar
        </div>
      </div>
    </section>
  );
}
