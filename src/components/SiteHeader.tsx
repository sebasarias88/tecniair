"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { business, defaultWhatsappMessage, whatsappUrl } from "@/lib/business";
import { sectors, services } from "@/lib/content";

type Panel = "services" | "sectors" | null;

const quickLinks = [
  { href: "/#calculadora", label: "Calculadora" },
  { href: "/#preguntas", label: "Preguntas" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
    </svg>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event(mobileOpen ? "tecniair:lock" : "tecniair:unlock"));
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanel(null);
        setMobileOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setPanel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const closeAll = () => {
    setPanel(null);
    setMobileOpen(false);
  };

  const panelItems =
    panel === "services"
      ? services.map((s) => ({ href: `/servicios/${s.slug}`, label: s.shortName, text: s.headline }))
      : sectors.map((s) => ({ href: `/sectores/${s.slug}`, label: s.name, text: s.headline }));

  return (
    <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`pointer-events-auto relative mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled || panel ? "glass shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)]" : "border border-transparent"
        }`}
      >
        <Link href="/" onClick={closeAll}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {(["services", "sectors"] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-expanded={panel === key}
              aria-controls="header-panel"
              onClick={() => setPanel((p) => (p === key ? null : key))}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.95rem] transition-colors hover:bg-white/10 hover:text-white ${
                panel === key ? "bg-white/10 text-white" : "text-white/80"
              }`}
            >
              {key === "services" ? "Servicios" : "Sectores"}
              <svg viewBox="0 0 24 24" className={`size-4 transition-transform ${panel === key ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          ))}
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeAll}
              className="rounded-full px-4 py-2 text-[0.95rem] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ice hidden items-center gap-2 rounded-full px-5 py-2.5 font-semibold md:inline-flex"
          >
            <WhatsAppIcon className="size-5" />
            Escríbenos
          </a>
          <a
            href={`tel:${business.phoneE164}`}
            aria-label={`Llamar al ${business.phoneDisplay}`}
            className="grid size-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-white/40 md:hidden"
          >
            <PhoneIcon className="size-5" />
          </a>
          <button
            type="button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 lg:hidden"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>

        {/* Desktop mega menu */}
        {panel && (
          <div
            id="header-panel"
            className="absolute inset-x-0 top-[calc(100%+0.75rem)] hidden rounded-[2rem] border border-white/12 bg-navy/95 p-4 backdrop-blur-xl shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] lg:block"
          >
            <ul className="grid grid-cols-2 gap-1 xl:grid-cols-3">
              {panelItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    className="block rounded-2xl px-5 py-4 transition-colors hover:bg-white/10"
                  >
                    <span className="block font-semibold">{item.label}</span>
                    <span className="mt-1 block text-[0.9rem] text-white/60">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        data-lenis-prevent
        className="pointer-events-auto fixed inset-0 top-0 -z-10 overflow-y-auto bg-abyss/97 px-5 pb-32 pt-24 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Menú móvil" className="space-y-10">
          <div>
            <p className="type-condensed mb-3 text-[0.95rem] text-glacier">Servicios</p>
            <ul className="space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicios/${s.slug}`} onClick={closeAll} className="block py-2 text-[1.35rem] font-semibold [font-stretch:110%]">
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="type-condensed mb-3 text-[0.95rem] text-glacier">Sectores</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link href={`/sectores/${s.slug}`} onClick={closeAll} className="block py-2 text-[1.05rem] text-white/85">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex flex-wrap gap-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeAll} className="inline-block rounded-full border border-white/15 px-5 py-2.5">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
