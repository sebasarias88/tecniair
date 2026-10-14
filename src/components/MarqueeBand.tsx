"use client";

import { useRef } from "react";
import { SnowflakeIcon } from "@/components/icons";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

const words = ["Instalación", "Mantenimiento", "Reparación", "Venta de equipos"];

function Row({ outline = false }: { outline?: boolean }) {
  const content = [...words, ...words];
  return (
    <div className="marquee-row flex w-max">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {content.map((word, i) => (
            <span key={`${copy}-${i}`} className="flex items-center">
              <span
                className={`type-display whitespace-nowrap px-6 text-[clamp(3.5rem,9vw,8.5rem)] ${
                  outline ? "text-outline" : "text-frost"
                }`}
              >
                {word}
              </span>
              <SnowflakeIcon className="size-[clamp(2rem,4vw,3.6rem)] shrink-0 text-glacier" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Two rows of giant service names that speed up with the scroll. */
export function MarqueeBand() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const rows = gsap.utils.toArray<HTMLElement>(".marquee-row");
      const loops = rows.map((row, i) =>
        gsap.fromTo(
          row,
          { xPercent: i % 2 === 0 ? 0 : -50 },
          { xPercent: i % 2 === 0 ? -50 : 0, duration: 40, ease: "none", repeat: -1 },
        ),
      );

      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 8);
          loops.forEach((loop) => {
            gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2, ease: "power2.out" });
          });
        },
      });

      gsap.fromTo(
        ".marquee-tilt",
        { rotate: -4 },
        {
          rotate: 2,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      return () => st.kill();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="Nuestros servicios" className="relative overflow-hidden bg-abyss py-20 sm:py-28">
      <div className="marquee-tilt -mx-[5vw] space-y-2 bg-gradient-to-r from-electric/0 via-electric/15 to-electric/0 py-6">
        <Row />
        <Row outline />
      </div>
    </section>
  );
}
