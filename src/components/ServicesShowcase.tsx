"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { whatsappUrl } from "@/lib/business";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { services } from "@/lib/content";

const featured = services.filter((s) => s.featured);

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
      className="relative overflow-hidden bg-abyss py-24 lg:flex lg:h-svh lg:items-center lg:pb-6 lg:pt-[6.75rem]"
    >
      <div
        ref={trackRef}
        className="flex flex-col gap-6 px-4 sm:px-8 lg:flex-row lg:items-stretch lg:gap-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-[8vw]"
      >
        <div className="flex shrink-0 flex-col justify-center lg:w-[34vw] lg:pr-8">
          <RevealHeading
            lines={["Todo lo que", "tu aire", "necesita."]}
            as="h2"
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

        {featured.map((service) => (
          <article
            key={service.slug}
            className="service-panel relative flex min-h-[32rem] shrink-0 overflow-hidden rounded-[2rem] ring-1 ring-white/10 lg:h-[min(46rem,calc(100svh-8.5rem))] lg:min-h-0 lg:w-[min(62vw,940px)]"
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
                  "linear-gradient(0deg, rgb(5 14 26 / 0.98) 0%, rgb(5 14 26 / 0.85) 45%, rgb(5 14 26 / 0.15) 80%), linear-gradient(90deg, rgb(5 14 26 / 0.5), transparent 60%)",
              }}
            />
            <div className="relative mt-auto w-full p-6 sm:p-9 lg:p-10">
              <h3 className="type-display text-[clamp(1.8rem,8.4vw,2.8rem)] lg:text-[clamp(2.2rem,3.6vw,3.8rem)]">{service.shortName}</h3>
              <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] xl:gap-10">
                <div>
                  <p className="max-w-[42ch] text-white/80">{service.intro}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <a
                      href={whatsappUrl(service.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 font-semibold text-abyss transition-colors hover:bg-glacier"
                    >
                      <WhatsAppIcon className="size-5" />
                      {service.cta}
                    </a>
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="inline-flex items-center rounded-full border border-white/25 px-5 py-3.5 font-semibold transition-colors hover:border-white/60"
                    >
                      Ver detalles
                      <span className="sr-only"> de {service.name}</span>
                    </Link>
                  </div>
                </div>
                <ul className="hidden space-y-2 border-l border-white/10 pl-8 xl:block">
                  {service.includes.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-baseline gap-3 text-[0.98rem] text-white/85">
                      <span aria-hidden="true" className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-glacier" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
