"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { business, defaultWhatsappMessage, whatsappUrl } from "@/lib/business";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#diagnostico", label: "Diagnóstico" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#preguntas", label: "Preguntas" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled ? "glass shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)]" : "border border-transparent"
        }`}
      >
        <a href="#inicio" aria-label="Tecniair, ir al inicio">
          <Logo />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[0.95rem] text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${business.phoneE164}`}
            aria-label={`Llamar al ${business.phoneDisplay}`}
            className="grid size-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-white/40 md:hidden"
          >
            <PhoneIcon className="size-5" />
          </a>
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ice hidden items-center gap-2 rounded-full px-5 py-2.5 font-semibold md:inline-flex"
          >
            <WhatsAppIcon className="size-5" />
            Escríbenos
          </a>
        </div>
      </div>
    </header>
  );
}
