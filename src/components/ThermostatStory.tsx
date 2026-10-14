"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { images } from "@/lib/images";

const START = 31;
const END = 18;

const beats = [
  {
    kicker: "2:00 p. m.",
    text: "Tu casa está a 31 grados y el aire solo hace ruido.",
  },
  {
    kicker: "Nos escribes",
    text: "Llegamos, encontramos la falla y te damos el precio antes de tocar nada.",
  },
  {
    kicker: "Listo",
    text: "18 grados. Así se siente un aire bien instalado y con mantenimiento al día.",
  },
];

/**
 * Pinned scroll story. The room heats the screen (orange haze + heat shimmer),
 * then cools down to 18° as the visitor scrolls.
 */
export function ThermostatStory() {
  const ref = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        if (numberRef.current) numberRef.current.textContent = String(END);
        gsap.set(".story-heat", { autoAlpha: 0 });
        gsap.set(".story-beat", { autoAlpha: 1, y: 0 });
        return;
      }

      const state = { temp: START };
      gsap.set(".story-beat", { autoAlpha: 0, y: 40 });
      gsap.set(".story-beat-0", { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.8,
        },
      });

      tl.to(
        state,
        {
          temp: END,
          duration: 3,
          ease: "power1.inOut",
          onUpdate: () => {
            if (numberRef.current) numberRef.current.textContent = String(Math.round(state.temp));
            const heat = (state.temp - END) / (START - END);
            displacementRef.current?.setAttribute("scale", (heat * 22).toFixed(1));
          },
        },
        0,
      )
        .to(".story-number", { color: "#7fe3ff", duration: 3, ease: "power1.inOut" }, 0)
        .to(".story-heat", { autoAlpha: 0, duration: 2.4 }, 0.4)
        .to(".story-cold", { autoAlpha: 1, duration: 2.4 }, 0.6)
        .to(".story-gauge-fill", { scaleY: 0, duration: 3, ease: "power1.inOut" }, 0)
        .to(".story-media", { scale: 1.12, duration: 3 }, 0)
        .to(".story-beat-0", { autoAlpha: 0, y: -40, duration: 0.4 }, 0.8)
        .to(".story-beat-1", { autoAlpha: 1, y: 0, duration: 0.4 }, 1.0)
        .to(".story-beat-1", { autoAlpha: 0, y: -40, duration: 0.4 }, 1.9)
        .to(".story-beat-2", { autoAlpha: 1, y: 0, duration: 0.4 }, 2.1);
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-label="De 31 a 18 grados"
      className="relative isolate h-svh overflow-hidden bg-abyss"
    >
      <svg aria-hidden="true" className="absolute size-0">
        <filter id="heat-shimmer">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.03" numOctaves="2" seed="3">
            <animate
              attributeName="baseFrequency"
              dur="9s"
              values="0.008 0.03;0.012 0.05;0.008 0.03"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap ref={displacementRef} in="SourceGraphic" scale="22" />
        </filter>
      </svg>

      <div className="story-media absolute inset-0 -z-20 [filter:url(#heat-shimmer)] max-md:[filter:none]">
        <Image src={images.livingRoom} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div
        aria-hidden="true"
        className="story-heat absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 70% at 70% 30%, rgb(255 122 47 / 0.55), transparent 70%), linear-gradient(180deg, rgb(60 20 5 / 0.65), rgb(5 14 26 / 0.92))",
        }}
      />
      <div
        aria-hidden="true"
        className="story-cold invisible absolute inset-0 -z-10 opacity-0"
        style={{
          background:
            "radial-gradient(70% 70% at 70% 30%, rgb(127 227 255 / 0.35), transparent 70%), linear-gradient(180deg, rgb(10 40 80 / 0.7), rgb(5 14 26 / 0.94))",
        }}
      />

      <div className="mx-auto flex h-full max-w-7xl items-center gap-6 px-4 sm:px-8">
        {/* Thermometer gauge */}
        <div className="hidden h-[55vh] w-3 shrink-0 overflow-hidden rounded-full bg-white/10 md:block" aria-hidden="true">
          <div className="story-gauge-fill h-full w-full origin-bottom rounded-full bg-gradient-to-t from-glacier via-electric to-heat" />
        </div>

        <div className="grid w-full items-center gap-6 md:pl-8 lg:grid-cols-12">
          <p
            className="story-number type-numeral text-[clamp(9rem,34vw,26rem)] text-heat lg:col-span-7"
            aria-hidden="true"
          >
            <span ref={numberRef}>{START}</span>
            <span className="text-[0.4em] align-top">°</span>
          </p>
          <div className="relative min-h-[11rem] lg:col-span-5">
            {beats.map((beat, i) => (
              <div key={beat.kicker} className={`story-beat story-beat-${i} absolute inset-x-0 top-0`}>
                <p className="type-condensed text-[1.1rem] text-glacier">{beat.kicker}</p>
                <p className="mt-3 text-[clamp(1.6rem,2.7vw,2.4rem)] font-bold leading-[1.08] tracking-[-0.02em] [font-stretch:112%]">
                  {beat.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
