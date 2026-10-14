"use client";

import { useEffect, useState } from "react";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { business, defaultWhatsappMessage, whatsappUrl } from "@/lib/business";

export function WhatsAppDock() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const onScroll = () => {
      setPastHero(window.scrollY > hero.offsetHeight - window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile: persistent bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur md:hidden">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-ice py-3 font-semibold text-ink"
          >
            <WhatsAppIcon className="size-5" />
            Escribir por WhatsApp
          </a>
          <a
            href={`tel:${business.phoneE164}`}
            aria-label={`Llamar al ${business.phoneDisplay}`}
            className="grid size-12 place-items-center rounded-full border border-white/25 text-white"
          >
            <PhoneIcon className="size-5" />
          </a>
        </div>
      </div>

      {/* Desktop: floating button once the hero is behind */}
      <a
        href={whatsappUrl(defaultWhatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-hidden={!pastHero}
        tabIndex={pastHero ? 0 : -1}
        className={`fixed bottom-7 right-7 z-50 hidden items-center gap-2.5 rounded-full bg-ink py-3 pl-3 pr-5 font-semibold text-white shadow-[0_18px_40px_-14px_rgb(12_34_56/0.7)] ring-1 ring-white/10 transition-all duration-300 hover:bg-royal md:inline-flex ${
          pastHero ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <span className="grid size-9 place-items-center rounded-full bg-ice text-ink">
          <WhatsAppIcon className="size-5" />
        </span>
        Agendar visita
      </a>
    </>
  );
}
