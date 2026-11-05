"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { images } from "@/lib/images";

const START = 31;
const END = 18;
const DURATION_MS = 1800;

const beats = [
  { kicker: "2:00 p. m.", text: "Tu casa está a 31 grados y el aire solo hace ruido." },
  { kicker: "Nos escribes", text: "Llegamos, encontramos la falla y te damos el precio antes de tocar nada." },
  { kicker: "Listo", text: "18 grados. Así se siente un aire bien instalado y con mantenimiento al día." },
];

/**
 * Light version of the 31° → 18° story: no pinning and no image filters.
 * When the section enters the screen the number counts down once and the
 * warm overlay fades into a cold one (a single CSS opacity transition).
 */
export function ThermostatStory() {
  const ref = useRef<HTMLElement>(null);
  const [temp, setTemp] = useState(START);
  const [cool, setCool] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const run = () => {
      setCool(true);
      if (reduced) {
        setTemp(END);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        const eased = 1 - Math.pow(1 - t, 3);
        setTemp(Math.round(START - (START - END) * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="story-title"
      className="relative isolate overflow-hidden bg-abyss py-24 sm:py-32"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src={images.livingRoom}
          alt="Sala de una casa en Armenia refrescada con aire acondicionado"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 transition-opacity duration-[1800ms] ease-out ${cool ? "opacity-0" : "opacity-100"}`}
        style={{
          background:
            "radial-gradient(70% 70% at 70% 30%, rgb(255 122 47 / 0.55), transparent 70%), linear-gradient(180deg, rgb(60 20 5 / 0.7), rgb(5 14 26 / 0.94))",
        }}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 transition-opacity duration-[1800ms] ease-out ${cool ? "opacity-100" : "opacity-0"}`}
        style={{
          background:
            "radial-gradient(70% 70% at 70% 30%, rgb(127 227 255 / 0.3), transparent 70%), linear-gradient(180deg, rgb(10 40 80 / 0.75), rgb(5 14 26 / 0.95))",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="story-title" className="sr-only">
            De 31 a 18 grados con Tecniair
          </h2>
          <p
            aria-hidden="true"
            className="type-numeral text-[clamp(8rem,26vw,22rem)] transition-colors duration-[1800ms] ease-out"
            style={{ color: cool ? "var(--color-glacier)" : "var(--color-heat)" }}
          >
            {temp}
            <span className="align-top text-[0.4em]">°</span>
          </p>
        </div>
        <ol className="space-y-8 lg:col-span-6">
          {beats.map((beat) => (
            <li key={beat.kicker} className="border-l-2 border-white/20 pl-6" data-reveal="fade">
              <p className="type-condensed text-[1.05rem] text-glacier">{beat.kicker}</p>
              <p className="mt-2 text-[clamp(1.35rem,2.2vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.02em] [font-stretch:112%]">
                {beat.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
