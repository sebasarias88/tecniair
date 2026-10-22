"use client";

import { useRef } from "react";
import { Logo } from "@/components/Logo";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { business } from "@/lib/business";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

const plateRows = [
  { label: "Servicio", value: "Instalación, mantenimiento, reparación y venta" },
  { label: "Cobertura", value: business.coverage },
  { label: "Atención", value: "24 horas" },
  { label: "Visita", value: "A domicilio" },
  { label: "Presupuesto", value: "Antes de empezar" },
  { label: "Garantía", value: "Por escrito en cada trabajo" },
  { label: "Contacto", value: business.phoneDisplay },
];

const steps = [
  {
    title: "Nos escribes",
    text: "Por WhatsApp o llamada, a cualquier hora. Nos cuentas qué le pasa al equipo.",
  },
  {
    title: "Agendamos la visita",
    text: "Vamos a tu casa, oficina o local el día y la hora que te sirvan.",
  },
  {
    title: "Diagnóstico y presupuesto",
    text: "Te mostramos la falla y te damos el precio antes de tocar nada.",
  },
  {
    title: "Trabajo con garantía",
    text: "Dejamos el aire funcionando, el espacio limpio y la garantía por escrito.",
  },
];

function Rivet({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute size-3 rounded-full bg-gradient-to-br from-[#c9d6e2] to-[#4b5d70] shadow-[inset_0_-1px_1px_rgb(0_0_0/0.4)] ${className}`}
    />
  );
}

export function HowWeWork() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".pipe-fill", { scaleY: 1 });
        return;
      }

      // Refrigerant flowing through the copper pipe as you read the steps
      gsap.fromTo(
        ".pipe-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".steps-list", start: "top 65%", end: "bottom 60%", scrub: true },
        },
      );

      gsap.utils.toArray<HTMLElement>(".step-item").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 62%",
          onEnter: () => item.classList.add("is-active"),
          onLeaveBack: () => item.classList.remove("is-active"),
        });
      });

      gsap.from(".spec-plate", {
        rotateX: 18,
        y: 80,
        autoAlpha: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".spec-plate", start: "top 85%" },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="como-trabajamos" className="relative bg-abyss py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <RevealHeading
            lines={["Sin sorpresas,", "de principio", "a fin."]}
            className="type-display text-[clamp(2.4rem,3.9vw,3.8rem)]"
          />
          <p className="mt-6 max-w-[42ch] text-white/65">
            Cada aire trae una placa con sus datos técnicos. Esta es la nuestra.
          </p>

          <div className="mt-12 [perspective:1200px]">
            <figure
              className="spec-plate brushed-steel relative rounded-2xl p-6 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.18)] ring-1 ring-white/10 sm:p-8"
              aria-label="Ficha técnica de Tecniair"
            >
              <Rivet className="left-3 top-3" />
              <Rivet className="right-3 top-3" />
              <Rivet className="bottom-3 left-3" />
              <Rivet className="bottom-3 right-3" />

              <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
                <Logo />
                <span className="type-condensed text-right text-[0.85rem] text-white/65">
                  Ficha técnica
                </span>
              </div>
              <dl className="divide-y divide-white/10">
                {plateRows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-4 py-2.5 sm:grid-cols-[8rem_1fr]">
                    <dt className="type-condensed text-[0.92rem] text-white/65">{row.label}</dt>
                    <dd className="text-[0.98rem] font-medium">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <figcaption className="type-condensed mt-4 border-t border-white/15 pt-3 text-[0.8rem] text-white/65">
                {business.address}, {business.city}
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <h3 className="type-display text-[1.8rem]">Así funciona</h3>
          <ol className="steps-list relative mt-10">
            <span
              aria-hidden="true"
              className="absolute bottom-7 left-[1.45rem] top-7 w-1 rounded-full bg-[#3a2a1f]"
            />
            <span
              aria-hidden="true"
              className="pipe-fill absolute bottom-7 left-[1.45rem] top-7 w-1 origin-top rounded-full bg-gradient-to-b from-copper via-[#e7a066] to-glacier shadow-[0_0_14px_rgb(199_123_63/0.8)]"
            />
            {steps.map((step, index) => (
              <li key={step.title} className="step-item group relative flex gap-7 pb-14 last:pb-0">
                <span className="type-condensed relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-copper bg-abyss text-[1.2rem] font-semibold transition-colors duration-500 group-[.is-active]:bg-copper group-[.is-active]:text-abyss">
                  {index + 1}
                </span>
                <div className="pt-1.5">
                  <p className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-tight [font-stretch:115%]">
                    {step.title}
                  </p>
                  <p className="mt-2 max-w-[44ch] text-white/65">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
