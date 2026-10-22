"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { sectors } from "@/lib/content";

/**
 * Desktop: a list of sector names; hovering or focusing one swaps the photo beside it.
 * Mobile: a horizontal row of photo cards.
 */
export function SectorsExplorer() {
  const [active, setActive] = useState(0);
  const current = sectors[active];

  return (
    <section id="sectores" aria-labelledby="sectors-title" className="relative bg-abyss py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div id="sectors-title" className="lg:col-span-7">
            <RevealHeading
              lines={["Donde haga calor,", "llegamos."]}
              className="type-display text-[clamp(2.6rem,5.6vw,5.2rem)]"
            />
          </div>
          <p className="max-w-[44ch] text-white/65 lg:col-span-5 lg:self-end">
            Casas, oficinas, restaurantes, hoteles, casinos, clínicas y obras. Cada espacio tiene
            necesidades distintas y las conocemos.
          </p>
        </div>

        {/* Desktop */}
        <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-12">
          <ul className="lg:col-span-6">
            {sectors.map((sector, i) => (
              <li key={sector.slug} className="border-b border-white/10 first:border-t">
                <Link
                  href={`/sectores/${sector.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group flex items-center justify-between gap-6 py-5 transition-colors ${
                    active === i ? "text-white" : "text-white/55 hover:text-white/85"
                  }`}
                >
                  <span className="text-[clamp(1.8rem,2.8vw,2.6rem)] font-bold leading-none tracking-[-0.03em] [font-stretch:120%]">
                    {sector.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid size-11 shrink-0 place-items-center rounded-full border transition-all ${
                      active === i ? "border-glacier bg-glacier text-abyss" : "border-white/15"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-6">
            <div className="sticky top-28 overflow-hidden rounded-[2rem] ring-1 ring-white/10">
              <div className="relative aspect-[4/5]">
                {sectors.map((sector, i) => (
                  <Image
                    key={sector.slug}
                    src={sector.image}
                    alt=""
                    fill
                    sizes="45vw"
                    loading="lazy"
                    className={`object-cover transition-all duration-700 ease-[var(--ease-out-expo)] ${
                      active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
                    }`}
                  />
                ))}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8" aria-live="polite">
                  <p className="type-display text-[2rem]">{current.headline}</p>
                  <p className="mt-3 max-w-[44ch] text-white/75">{current.intro}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 lg:hidden">
          {sectors.map((sector) => (
            <li key={sector.slug} className="w-[78%] shrink-0 snap-start sm:w-[46%]">
              <Link
                href={`/sectores/${sector.slug}`}
                className="relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-white/10"
              >
                <Image src={sector.image} alt="" fill sizes="80vw" className="object-cover" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block text-[1.7rem] font-bold leading-none tracking-[-0.03em] [font-stretch:118%]">
                    {sector.name}
                  </span>
                  <span className="mt-2 block text-[0.95rem] text-white/75">{sector.headline}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
