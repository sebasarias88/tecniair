"use client";

import Image from "next/image";
import { useRef } from "react";
import { InstagramIcon } from "@/components/icons";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { business } from "@/lib/business";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { images } from "@/lib/images";

const spaces = [
  {
    title: "Hogares",
    text: "Habitaciones, salas y apartamentos. Equipos silenciosos para dormir fresco.",
    image: images.homeInterior,
    className: "lg:col-span-7 lg:row-span-2 aspect-[4/5] lg:aspect-auto",
  },
  {
    title: "Negocios y oficinas",
    text: "Clima estable para que tus clientes y tu equipo estén cómodos todo el día.",
    image: images.splitWall,
    className: "lg:col-span-5 aspect-[4/3]",
  },
  {
    title: "Edificios y obra nueva",
    text: "Tubería y preinstalación antes de terminar acabados.",
    image: images.buildingPipes,
    className: "lg:col-span-5 aspect-[4/3]",
  },
];

export function Coverage() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".space-card").forEach((card) => {
        const img = card.querySelector(".space-img");
        gsap.fromTo(
          card,
          { clipPath: "inset(18% 10% 18% 10% round 2rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            ease: "expo.out",
            duration: 1.6,
            scrollTrigger: { trigger: card, start: "top 85%" },
          },
        );
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -10, scale: 1.15 },
            {
              yPercent: 10,
              scale: 1.15,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="espacios" className="bg-abyss py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <RevealHeading
            lines={["Donde haga calor,", "llegamos."]}
            className="type-display text-[clamp(2.6rem,5.6vw,5.2rem)]"
          />
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-5 py-3 transition-colors hover:border-white/50"
          >
            <InstagramIcon className="size-5" />
            Ver trabajos en {business.instagramHandle}
          </a>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          {spaces.map((space) => (
            <article
              key={space.title}
              className={`space-card group relative overflow-hidden rounded-[2rem] ${space.className}`}
            >
              <div className="space-img absolute inset-0">
                <Image src={space.image} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="type-display text-[clamp(1.8rem,3.2vw,2.8rem)]">{space.title}</h3>
                <p className="mt-2 max-w-[40ch] text-white/75">{space.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
