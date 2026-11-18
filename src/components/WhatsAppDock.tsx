"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/business";

/** Round WhatsApp button in the corner, shown once the visitor starts scrolling. */
export function WhatsAppDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl(defaultWhatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir a Tecniair por WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`btn-wa group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 grid size-[3.75rem] place-items-center rounded-full shadow-[0_16px_32px_-10px_rgb(18_140_74/0.7)] transition-all duration-500 sm:bottom-6 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <WhatsAppIcon className="size-8" />
      <span className="pointer-events-none absolute right-[calc(100%+0.75rem)] hidden whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[0.92rem] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        ¿Te ayudamos?
      </span>
    </a>
  );
}
