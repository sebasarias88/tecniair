"use client";

import { useEffect, useState } from "react";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { business, defaultWhatsappMessage, whatsappUrl } from "@/lib/business";

export function WhatsAppDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const services = document.getElementById("servicios");
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.7;
      // Hide while the pinned services gallery fills the screen, so it never covers its buttons.
      const rect = services?.getBoundingClientRect();
      const insideServices = rect ? rect.top <= 1 && rect.bottom >= window.innerHeight - 1 : false;
      setVisible(pastHero && !insideServices);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile: bottom bar once the hero buttons are behind */}
      <div className={`glass fixed inset-x-0 bottom-0 z-50 rounded-t-3xl px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-500 md:hidden ${
          visible ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ice flex items-center justify-center gap-2 rounded-full py-3.5 font-semibold"
          >
            <WhatsAppIcon className="size-5" />
            Agendar visita
          </a>
          <a
            href={`tel:${business.phoneE164}`}
            aria-label={`Llamar al ${business.phoneDisplay}`}
            className="grid size-[3.25rem] place-items-center rounded-full border border-white/20 bg-white/5"
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
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        className={`glass fixed bottom-7 right-7 z-50 hidden items-center gap-3 rounded-full py-2.5 pl-2.5 pr-6 font-semibold transition-all duration-500 hover:border-glacier/60 md:inline-flex ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <span className="btn-ice grid size-11 place-items-center rounded-full">
          <WhatsAppIcon className="size-5" />
        </span>
        Agendar visita
      </a>
    </>
  );
}
