"use client";

import Image from "next/image";
import { useRef } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { whatsappUrl } from "@/lib/business";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { images } from "@/lib/images";

const services = [
  {
    id: "instalacion",
    name: "Instalación",
    summary: "Montamos tu equipo nivelado, sellado y sin fugas, listo para enfriar desde el primer día.",
    includes: [
      "Mini split, piso techo y cassette",
      "Tubería de cobre, soportes y desagüe",
      "Vacío del sistema antes de liberar el gas",
      "Prueba de funcionamiento",
    ],
    image: images.rooftopCrew,
    cta: "Cotizar instalación",
    message: "Hola Tecniair, quiero cotizar la instalación de un aire acondicionado.",
  },
  {
    id: "mantenimiento",
    name: "Mantenimiento",
    summary: "Lavado profundo para que enfríe como nuevo, huela bien y consuma menos energía.",
    includes: [
      "Lavado de filtros, serpentines y turbina",
      "Limpieza de bandeja y desagüe",
      "Revisión de presión del refrigerante",
      "Medición de consumo eléctrico",
    ],
    image: images.technicianHelmet,
    cta: "Programar mantenimiento",
    message: "Hola Tecniair, quiero programar un mantenimiento para mi aire acondicionado.",
  },
  {
    id: "reparacion",
    name: "Reparación",
    summary: "Encontramos la falla, te mostramos qué pasa y te damos el precio antes de arreglarla.",
    includes: [
      "Diagnóstico eléctrico y de refrigeración",
      "Detección y reparación de fugas",
      "Carga de refrigerante",
      "Capacitores, motores y tarjetas",
    ],
    image: images.technicianPanel,
    cta: "Pedir diagnóstico",
    message: "Hola Tecniair, mi aire acondicionado tiene una falla y necesito un diagnóstico.",
  },
  {
    id: "equipos",
    name: "Venta de equipos",
    summary: "Te ayudamos a elegir la capacidad y la tecnología correctas, y lo dejamos instalado.",
    includes: [
      "Equipos convencionales e inverter",
      "Capacidad calculada para tu espacio",
      "Suministro e instalación en un solo servicio",
    ],
    image: images.splitDisplay,
    cta: "Cotizar un equipo",
    message: "Hola Tecniair, quiero cotizar un aire acondicionado con instalación.",
  },
];

export function ServicesShowcase() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".services-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".service-image").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".service-panel").forEach((panel) => {
          gsap.from(panel, {
            y: 60,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, start: "top 88%" },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="servicios"
      className="relative overflow-hidden bg-abyss py-24 lg:flex lg:h-svh lg:items-center lg:py-0"
    >
      <div
        ref={trackRef}
        className="flex flex-col gap-6 px-4 sm:px-8 lg:flex-row lg:items-stretch lg:gap-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-[8vw]"
      >
        <div className="flex shrink-0 flex-col justify-center lg:w-[34vw] lg:pr-8">
          <RevealHeading
            lines={["Todo lo que", "tu aire", "necesita."]}
            className="type-display text-[clamp(2.8rem,4.4vw,4.6rem)]"
          />
          <p className="mt-6 max-w-[38ch] text-white/65">
            Casas, apartamentos, oficinas y locales comerciales. Un mismo equipo técnico para
            instalar, mantener y reparar.
          </p>
          <div className="mt-10 hidden h-px w-full max-w-xs bg-white/10 lg:block" aria-hidden="true">
            <div className="services-progress h-full origin-left scale-x-0 bg-glacier" />
          </div>
        </div>

        {services.map((service) => (
          <article
            key={service.id}
            className="service-panel relative flex min-h-[34rem] shrink-0 overflow-hidden rounded-[2rem] ring-1 ring-white/10 lg:h-[78svh] lg:min-h-0 lg:w-[min(64vw,980px)]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="service-image absolute inset-y-0 -left-[10%] w-[120%]">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgb(5 14 26 / 0.97) 0%, rgb(5 14 26 / 0.75) 40%, rgb(5 14 26 / 0.1) 75%), linear-gradient(90deg, rgb(5 14 26 / 0.55), transparent 60%)",
              }}
            />
            <div className="relative mt-auto grid w-full gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:items-end">
              <div>
                <h3 className="type-display text-[clamp(2.4rem,4.6vw,4.4rem)]">{service.name}</h3>
                <p className="mt-4 max-w-[40ch] text-white/75">{service.summary}</p>
              </div>
              <div>
                <ul className="space-y-2.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-baseline gap-3 text-white/85">
                      <span aria-hidden="true" className="h-px w-5 shrink-0 translate-y-[-0.3em] bg-glacier" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl(service.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 font-semibold text-abyss transition-colors hover:bg-glacier"
                >
                  <WhatsAppIcon className="size-5" />
                  {service.cta}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
